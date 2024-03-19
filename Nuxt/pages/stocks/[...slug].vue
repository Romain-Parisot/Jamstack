<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const slug = route.params.slug;

const { find } = useStrapi();
const {
  data: stock,
  pending,
  error,
  refresh,
} = await useAsyncData("markets", () =>
  find("markets", { populate: "*", filters: { slug: { $eq: slug } } })
);
</script>

<template>
  <h1>Stock folder</h1>
  <section>
    <div>
      <h2>Stock</h2>
      <p>{{ stock.ticker }}</p>
      <p>{{ stock.price }}</p>
      <p>{{ stock.volume }}</p>
    </div>
  </section>
</template>
