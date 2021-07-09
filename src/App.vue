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
      currencies: ['tezos, algorand', 'signa'],
    };
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
</style>
