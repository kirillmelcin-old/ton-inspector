const axios = require('axios')

let api_key

function setApiKey(key = null) {
  api_key = key
}

async function findTransaction(destination = '', value = 0, msg = '', retries = 5) {
  // checking incoming data
  if (api_key == null) throw new Error('API key is undefined.')
  if (destination == '') throw new Error('Please set destination wallet address.')
  if (destination.length != 48) throw new Error('Wrong wallet address.')
  if (retries > 20) throw new Error('Maximum number of retries is 20.')
  if (retries < 1) throw new Error('Minimum number of retries is 1.')

  let source = ''  // source wallet must be returned later
  const url_request = `https://toncenter.com/api/v2/getTransactions?address=${destination}&limit=10&to_lt=0&archival=true&api_key=${api_key}`

  let count_i = 0
  const time_i = 2 * 1000     // interval between checks in miliseconds (default: 2 * 1000)

  function fetchTransaction() {
    axios.get(url_request)
      .then(response => {
        const transactions_number = response.data.result.length
        for(let i = 0; i < transactions_number; i++){
          const transaction_data = response.data.result[i]
          // checking if there any incoming message
          if (transaction_data.in_msg.source != "") {
            // then check if we found the right transaction (if no - promise will reject)
            if (msg == transaction_data.in_msg.message && value == transaction_data.in_msg.value) {
              source = transaction_data.in_msg.source
              break
            }
          }
        }
      })
      .catch(function (error) {
        const err_code = error.response.data.code
        if (err_code == 416) {
          throw new Error('Wrong wallet adress.')
        } else if (err_code == 401) {
          throw new Error('Wrong API Key.')
        } else {
          throw new Error('An unknown error happened. Please, try later.')
        }
      })
  }

  return await new Promise((resolve, reject) => {
    let timer = setInterval(function () {
      if (count_i === retries) {
        clearInterval(timer)
        if (source == '') {
          reject('Cannot find the transaction.')
        }
        resolve(source)
      } else if (source != '') {
        clearInterval(timer)
        resolve(source)
      } else {
        fetchTransaction()
      }
      count_i++
    }, time_i)
  })

}

function randomMsg(msg_length = 5) {
  // check
  if (msg_length > 10) throw new Error('Maximum message length is 10.')
  if (msg_length < 3) throw new Error('Minimum message length is 3.')

  let result = '';
  const characters = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (var i = 0; i < msg_length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function paymentLink(destination, value, msg) {
  const link = "ton://transfer/" + destination + "?amount=" + value + "&text=" + msg
  return link
}

function convertTonToNano(value) {
  if (!value) throw new Error('Please set the amount of TON.')
  return value * 1000000000
}

module.exports = {
  setApiKey,
  findTransaction,
  randomMsg,
  paymentLink,
  convertTonToNano
}
