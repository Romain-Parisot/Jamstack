<script setup lang="ts">
import { ref } from "vue";
const { create } = useStrapi();

const stock = ref({
  ticker: "",
  price: 0,
  volume: 0,
});

const MarketAddStock = async () => {
  const data = {
    ...stock.value,
    slug: stock.value.ticker.toLowerCase(),
  };
  await create("markets", data);
  stock.value = {
    ticker: "",
    price: 0,
    volume: 0,
  };
};
</script>

<template>
  <main role="main" class="main">
    <h1>Create a new stock into strapi</h1>
    <div class="formcontainer">
      <form @submit.prevent="MarketAddStock">
        <div class="formTop">
          <label>
            Ticker:
            <input type="text" v-model="stock.ticker" required />
          </label>
          <label>
            Price:
            <input type="number" v-model="stock.price" required />
          </label>
          <label>
            Volume:
            <input type="number" v-model="stock.volume" required />
          </label>
        </div>
        <div class="formBot">
          <button type="submit">Add Stock</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style>
h1 {
  text-align: center;
  padding: 20px;
  font-size: 2rem;
  margin-bottom: 50px;
}
.formcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}
.formTop {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.formBot {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
button {
  padding: 10px 20px;
  background-color: #ff0000 !important;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #ff0000;
  color: white;
}
input {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #000000;
  margin: 10px;
}
input:focus {
  outline: none;
  border: 1px solid #008407;
}
.main {
  height: 50vh;
}
html {
  overflow-x: hidden;
}
</style>
