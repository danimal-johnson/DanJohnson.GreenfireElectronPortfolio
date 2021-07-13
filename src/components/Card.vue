<template>
  <div :class="'card' + ' ' + type">
    <div class="card-header">
      <h3>{{ details.name }} ({{ details.symbol }})</h3>
    </div>
    <div class="card-body">
      <div ref="qrcode"></div>
    </div>
    <h3>US${{ details.price || `Download App` }}</h3>
    <img :src="getImgUrl(details.icon)" alt="WTF">
    <p>Here!</p>
  </div>
</template>

<script>
import * as QRCode from 'easyqrcodejs';

export default {
  name: 'Card',
  props: {
    type: String,
    details: {
      name: String,
      icon: String,
      currency: String,
      symbol: String,
      price: Number,
    },
    loading: Boolean,
  },
  components: {
  },
  methods: {
    getImgUrl(src) {
      return require('../assets/' + src);
    },
  },
  mounted() {
    const qrOptions = {
      // ====== Basic
      // text: "https://github.com/ushelp/EasyQRCodeJS",
      text: `${this.details.name} (${this.details.symbol}): US$${this.details.price}`,
      width: 150,
      height: 150,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H, // L, M, Q, H
      // logo: '../assets/logo.png', // this.details.icon, "getImgUrl('logo.png')"
    }
    new QRCode(this.$refs.qrcode, qrOptions);
  },
};
</script>

<style>
.card {
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  margin-bottom: 1rem;
  padding: 1rem;
}
.card-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e3e3e3;
}
.card-body {
  padding: 1rem;
}
</style>
