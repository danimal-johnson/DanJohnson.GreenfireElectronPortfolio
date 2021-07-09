<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <TwitterFeed :user="twitterFeeds[0]" />
  <TwitterFeed :user="twitterFeeds[1]" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import TwitterFeed from './components/TwitterFeed.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    TwitterFeed,
  },
  data() {
    return {
      twitterFeeds: ['BBCAfrica','ethereum'],
      currencies: [],
      author: {
        name: 'Dan Johnson',
        email: null,
        website: 'https://johnsondan.com/',
        linkedIn: 'https://linkedin.com/in/danimal.johnson',
        github: 'https://github.com/danimal.johnson',
        icon: null,
      }
    };
  },
  created() {
    this.currencies = [
      {
        currency: 'tezos',
        name: 'Tezos',
        price: '$1,000,000,000',
        symbol: 'TZS',
        icon: null,
      },
      {
        currency: 'algorand',
        name: 'Algorand',
        price: '$1,000,000,000',
        symbol: 'ALGO',
        icon: null,
      },
      {
        currency: 'signa',
        name: 'Signa',
        price: '$1,000,000,000',
        symbol: 'SIGNA',
        icon: null,
      },
    ]; // this.currencies
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
</style>
