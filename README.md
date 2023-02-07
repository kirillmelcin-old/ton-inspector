# TON Inspector
Easily find and confirm TON Blockchain transactions.

- [Features](#-features)
- [Install](#-install)
- [Basic usage](#-basic-usage)
- [Available functions](#-available-functions)
- [Examples](#-examples)

## 🌻 Features
- Find transactions with (or without) specific message
- Generate random messages to indentify transactions
- Generate payment links

## 🔮 Install

```sh
npm i ton-inspector
```

## 💡 Basic usage
```javascript
const inspector = require('ton-inspector') 

inspector.setApiKey('<Place your api key here>')
const amount = inspector.convertTonToNano(1) // Converting to nanocoins is required
inspector.findTransaction('<TON wallet address>', amount, '<Message>')
  .then(wallet => console.log(wallet))  // returns the source wallet
  .catch(err => console.log(err))
```

## 🚀 Available functions

**setApiKey(_api_key_)**

Authorize requests to TON API with your own API key. This function must be used together with findTransaction()
| Parameter | Type | Required | Description |
| ------ | ------ | ------  | ------ |
| api_key | _String_ | yes | Sets the TON api key. Use the function before findTransaction() |

You can get your own TON API key using Telegram: [@tonapibot](https://t.me/tonapibot)

Example:
```javascript
inspector.setApiKey('<Place your api key here>')
// then you can use findTransaction()
```

**findTransaction(_destination, amount, message, retries_)**

This function is to find the last transaction sent to the _destination_ wallet with following _amount_ of TON Coins and _Message_. The function sends requests to blockchain every 2 second trying to find the transaction. Maximum number of _retries_ is limited.

| Parameter | Type | Required | Description |
| ------ | ------ | ------  | ------ |
| destination | _String_ | yes | TON wallet address |
| amount | _Integer_ | yes | Amount of TON Coins. _Notice:_ you must convert your amount to nanocoins before using the function. Use convertToNano(_amount_) for that |
| message | _String_ | no | Defines the message the transaction should be accompanied with |
| retries | _String_ | no | Number of retries (Default: 5, max: 20).  |

Example:
```javascript
const amount = inspector.convertTonToNano(10) // convert 10 TON to 10000000000 nanocoins
inspector.findTransaction('EQD3I34Ce9RpdNEpgoUB5dgWvywD4dSTVea4g2Da7eW-ETAK', amount, 'Z6W4J')
    .then(wallet => console.log(wallet)) // returns the wallet from where the transaction was sent
    .catch(err => console.log(err)) // returns an error if the transaction was not found
```

**convertTonToNano(_amount_)**

This function converts amount of TON coins into nanocoins.
For instance: 1.15 TON => 1150000000 nanocoins

| Parameter | Type | Required | Description |
| ------ | ------ | ------  | ------ |
| amount | _Integer_ or _float_ | yes | Amount of TON Coins |

Example:
```javascript
const amount = inspector.convertTonToNano(10)
console.log(amount) // 10000000000
```

**randomMsg(_length_)**

This function generates random message. You can use the message as an unique transaction identificator.
See examples for more info.

| Parameter | Type | Required | Description |
| ------ | ------ | ------  | ------ |
| length | _Integer_ | no | Length of the message (default: 5, min: 3, max: 10) |

Example:
```javascript
console.log(inspector.randomMsg()) // 7XL8Q
console.log(inspector.randomMsg(7)) // LF541AR
```

**generateLink(_destination, amount, message_)**

This function generates payment link. For example, you can use the link in QR code or in a payment button. Link opens up TON Coin wallet app (e.g. Tonkeeper, Tonhub) with pre-generated transaction.
See examples for more info.

| Parameter | Type | Required | Description |
| ------ | ------ | ------  | ------ |
| destination | _String_ | yes | TON wallet address |
| amount | _Integer_ | yes | Amount of TON Coins. _Notice:_ you must convert your amount to nanocoins before using the function. Use convertToNano(_amount_) for that |
| message | _String_ | no | Defines the message the transaction should be accompanied with |

Example:
```javascript
const wallet = 'EQD3I34Ce9RpdNEpgoUB5dgWvywD4dSTVea4g2Da7eW-ETAK' // destination wallet address
const amount = inspector.convertTonToNano(10) // convert 10 TON to 10000000000 nanocoins
const msg = inspector.randomMsg() // generates random message with default length: LZCZ9

const link = inspector.paymentLink(wallet, amount, msg)
console.log(link) // ton://transfer/EQD3I34Ce9RpdNEpgoUB5dgWvywD4dSTVea4g2Da7eW-ETAK?amount=10000000000&text=LZCZ9
```

## 📚 Examples

Coming soon

## License

MIT

## Contact

Feel free to give feedback, share ideas and report bugs.

Telegram: [@kirillmelcin](https://t.me/kirillmelcin)

Email: hi@kirillmelcin.ru

Wallet: EQD3I34Ce9RpdNEpgoUB5dgWvywD4dSTVea4g2Da7eW-ETAK
