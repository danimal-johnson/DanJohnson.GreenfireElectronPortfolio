<template>
  <div :class="'card' + ' ' + type">
    <div class="card-header"></div>
    <h3>{{ name }}</h3>
    <div class="card-body">
      {{ details.name }}
      {{ details.price }}
    </div>
  </div>
</template>

<script>
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
