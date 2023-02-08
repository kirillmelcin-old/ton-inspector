<template>
  <div class="...">
    <h1 class="...">Buy me a beer 🍺</h1>
    <div class="...">
      <!-- Group of buttons that change the amount of donation on click -->
      <button @click="changeAmount(1)">
        1 TON
      </button>
      <button @click="changeAmount(3)">
        3 TON
      </button>
      <button @click="changeAmount(5)">
        5 TON
      </button>
    </div>
    <!-- Payment link -->
    <a :href="link">
      <button>
        Donate
      </button>
    </a>

  </div>
</template>

<script>
// Don't forget to import ton-inspector to your project using the command:
// npm i ton-inspector
const inspector = require('ton-inspector')  // Importing the ton-inspector 

export default {
  data() {
    return {
      wallet: 'EQD3I34Ce9RpdNEpgoUB5dgWvywD4dSTVea4g2Da7eW-ETAK',  // Address of your wallet
      link: '#'  // In this variable we will store our payment link
    }
  },
  methods: {
    changeAmount(amount) {
      const nanocoins = inspector.convertTonToNano(amount)  // Converting TON to nanocoins
      this.link = inspector.paymentLink(this.wallet, nanocoins, 'Donation')  // Generating a payment link
    }
  }
}
</script>