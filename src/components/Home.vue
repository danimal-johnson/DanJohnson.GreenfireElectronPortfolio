<template>
  <div class="hello">
    <div class="left">
      <div class="qrcode">
        <img :src="getImgUrl(user.icon)" :alt="user.name">
      </div>
      <div class="qr-contents">
        <h3>{{ user.name }}</h3>
      </div>
    </div>
    <div class="right">
      <h1>{{ msg }}</h1>
      <button id="print-pdf">Save to PDF</button>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
  name: 'Home',
  props: {
    msg: String,
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
    methods: {
    getImgUrl(src) {
      return require('../assets/' + src);
    },
  },
  mounted() {
    const printButton = document.getElementById('print-pdf');

    printButton.addEventListener('click', () => {
    ipcRenderer.send('print-to-pdf');
    console.log('Print to pdf!');
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  justify-content: space-between;
}
.left {
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #ccc;
  padding-right: 10px;
}
.right {
  width: 100%;
  padding-left: 10px;
  outline: 1px solid teal;
}

.qrcode {
  width: 150px;
  height: 150px;
}

img {
  max-width: 100%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
