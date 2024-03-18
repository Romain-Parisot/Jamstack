<script setup lang="ts">
const { find } = useStrapi();

const { data, pending, error } = await useAsyncData("player", async () => {
  return await find("players");
});
</script>

<template>
  <div>
    <h1>testm</h1>
  </div>
</template>

<style></style>
