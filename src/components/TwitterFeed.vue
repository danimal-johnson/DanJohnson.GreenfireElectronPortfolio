<template>
  <div class="twitter-feed">
    <a
      class="twitter-timeline"
      data-width="300"
      data-height="600"
      data-theme="light"
      data-tweet-limit="1"
      :href="'https://twitter.com/' + user + '&ref_src=twsrc%5Etfw'"
    >
      Tweets by {{ user }}
    </a>
  </div>
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
/* .twitter-feed {
  outline: 1px solid #ccc;
} */
</style>
