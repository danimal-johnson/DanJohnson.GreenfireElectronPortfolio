<template>
  <a
    class="twitter-timeline"
    data-width="300"
    data-height="600"
    data-theme="light"
    data-tweet-limit="2"
    :href="'https://twitter.com/' + user + '&ref_src=twsrc%5Etfw'"
  >
    Tweets by {{ user }}
  </a>
  <p>Twitter feed of  <strong>{{user}}</strong></p>
</template>

<script>
export default {
  name: 'TwitterFeed',
  props: {
    user: String,
  },
}
</script>

<style>

</style>