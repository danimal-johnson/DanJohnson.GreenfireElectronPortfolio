<template>
  <Home msg="Your Greenfire Developer Portfolio" />
  <!-- Card type="person" :details="author" / -->
  <div class="crypto">
    <Card type="currency" :details="currencies[0]" />
    <Card type="currency" :details="currencies[1]" />
  </div>
  <!-- TwitterFeed :user="twitterFeeds[0]" / -->
  <!-- TwitterFeed :user="twitterFeeds[1]" / -->
</template>

<script>
import Home from './components/Home.vue';
// import TwitterFeed from './components/TwitterFeed.vue';
import Card from './components/Card.vue';

export default {
  name: 'App',
  components: {
    Home,
//     TwitterFeed,
    Card,
  },
  data() {
    return {
      twitterFeeds: ['BBCAfrica','ethereum'],
      currencies: [
        {
          currency: 'tezos',
          name: 'Tezos',
          price: 0,
          symbol: 'TZS',
          icon: null,
        },
        {
          currency: 'algorand',
          name: 'Algorand',
          price: 0,
          symbol: 'ALGO',
          icon: null,
        },
        {
          currency: 'signa', // TODO: Not traded on an exchange
          name: 'Signa',
          price: 0,
          symbol: 'SIGNA',
          icon: null,
        },
      ],
      author: {
        name: 'Dan Johnson',
        email: null,
        website: 'https://johnsondan.com/',
        linkedIn: 'https://linkedin.com/in/danimal.johnson',
        github: 'https://github.com/danimal.johnson',
        icon: null,
      },
    };
  },
  methods: {
    async fetchCurrency(currency) {
      console.log('fetching currency', currency.currency);
      console.log('Original Price:', currency.price);
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency.currency}&vs_currencies=usd`);
      const data = await res.json();
      console.log('Received Info:', data);
      currency.price = data[currency.currency].usd;
      console.log('New Price:', currency.price);
    },
  },
  async created() {
    await this.fetchCurrency(this.currencies[0]);
    await this.fetchCurrency(this.currencies[1]);
    console.log(this.currencies);
  }, // created
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
  justify-content: space-between;
}

</style>
