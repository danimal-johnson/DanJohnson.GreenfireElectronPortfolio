<template>
  <div class="footer">
    <div class="link"><a :href="user.github" :title="user.github">GitHub</a></div>
    <div class="link"><a :href="user.linkedIn">LinkedIn</a></div>
    <div v-if="user.email" class="link" :title="user.email">
      <a :href="user.email">Email</a>
    </div>
    <div v-else class="link" :title="user.website">
      <a :href="user.website">Website</a>
    </div>
    <div class="link"><a :href="user.resume">Resume</a></div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    user: {
      name: String,
      email: String,
      website: String,
      linkedIn: String,
      github: String,
      resume: String,
      icon: String
    },
  },
}
</script>

<style scoped>
.footer {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
a, a:visited {
  color: teal;
  text-decoration: none;
  transition: scale 0.5s ease;
}
a:hover {
  text-decoration: underline;
  transform: scale(1.1);
}

</style>
