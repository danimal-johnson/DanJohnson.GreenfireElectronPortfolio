<template>
  <Home msg="Greenfire Developer Portfolio" />
  <!-- Card type="person" :details="author" / -->
  <!-- div class="crypto">
    <Card v-if="currencies[0].loaded" type="currency" :details="currencies[0]" />
    <Card v-if="currencies[1].loaded" type="currency" :details="currencies[1]" />
    <Card v-if="currencies[2].loaded" type="currency" :details="currencies[2]" />
  </!  -->
  <!-- TwitterFeed :user="twitterFeeds[0]" / -->
  <!-- TwitterFeed :user="twitterFeeds[1]" / -->
</template>

<script>
import Home from './components/Home.vue';
// import Card from './components/Card.vue';
// import TwitterFeed from './components/TwitterFeed.vue';

export default {
  name: 'App',
  components: {
    Home,
//     TwitterFeed,
    // Card,
  },
  data() {
    return {
      twitterFeeds: ['BBCAfrica', 'ethereum'],
      currencies: [
        {
          currency: 'tezos',
          name: 'Tezos',
          price: 0,
          symbol: 'XTZ',
          icon: 'tezos-logo-med.png',
          loaded: false,
        },
        {
          currency: 'algorand',
          name: 'Algorand',
          price: 0,
          symbol: 'ALGO',
          icon: 'algorand-logo-med.png',
          loaded: false,
        },
        {
          currency: 'signum',
          name: 'Signum',
          price: 0,
          symbol: 'SIGNA',
          icon: 'signum-logo.png',
          loaded: false,
        },
      ],
      author: {
        name: 'Dan Johnson',
        email: null,
        website: 'https://johnsondan.com/',
        linkedIn: 'https://linkedin.com/in/danimal.johnson',
        github: 'https://github.com/danimal.johnson',
        icon: 'dj-qr-code.png',
      },
    };
  },
  methods: {
    async fetchCurrency(currency) {
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency.currency}&vs_currencies=usd`);
      const data = await res.json();
      currency.price = data[currency.currency].usd;
      currency.loaded = true;
    },
  },
  async created() {
    await this.fetchCurrency(this.currencies[0]);
    await this.fetchCurrency(this.currencies[1]);
    await this.fetchCurrency(this.currencies[2]);
    console.log(this.currencies);
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.crypto {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

</style>
