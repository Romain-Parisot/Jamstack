<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { findOne } = useStrapi();

const { data: stock, pending } = await useAsyncData("market", () =>
  findOne(`stocks/${route.params.slug}`)
);
const log = () => {
  console.log(stock.value);
};
</script>

<template>
  <h1>Stock folder</h1>

  <template v-if="pending"> loading... </template>
  <template v-else>
    <section>
      <div>
        <h2>Stock</h2>
        <p>{{ data.stock.ticker }}</p>
        <p>{{ data.stock.price }}</p>
        <p>{{ data.stock.volume }}</p>
        <button @click="log()">log</button>
      </div>
    </section>
  </template>
</template>
