<template>
  <Header :user="author" msg="Greenfire Developer Portfolio" />
  <div class="crypto">
    <Card v-if="currencies[0].loaded" type="currency" :details="currencies[0]" />
    <Card v-if="currencies[1].loaded" type="currency" :details="currencies[1]" />
    <Card v-if="currencies[2].loaded" type="currency" :details="currencies[2]" />
  </div>
  <div class="tweets">
    <TwitterFeed :user="twitterFeeds[0]" />
    <TwitterFeed :user="twitterFeeds[1]" />
  </div>
  <Footer :user="author" />
</template>

<script>
import Header from './components/Header.vue';
import Card from './components/Card.vue';
import TwitterFeed from './components/TwitterFeed.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Card,
    TwitterFeed,
    Footer,
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
        linkedIn: 'https://linkedin.com/in/danimal-johnson',
        github: 'https://github.com/danimal-johnson',
        resume: 'https://resume.creddle.io/resume/e0a77jyccqm',
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
  margin-top: 10px;
}
.crypto {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
}
.tweets {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

</style>
