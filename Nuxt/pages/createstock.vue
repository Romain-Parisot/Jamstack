<script setup lang="ts">
const MarketFixtures = async () => {
  try {
    const POLYGON_API_KEY = "B8mglg0lAk13qw7i9gu6n8BEnpb1PHw1";
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2024-03-15?adjusted=true&apiKey=${POLYGON_API_KEY}`
    );

    const responseJson = await response.json();

    const stockList = responseJson.results.map((stock: any) => ({
      name: stock.T,
      price: stock.c,
      volume: stock.v,
      slug: stock.T,
    }));

    console.log(stockList);

    for (const stock of stockList) {
      console.log(stock);

      const response = await fetch("http://localhost:1337/api/markets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stock),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  } catch (error) {
    console.error(
      `Error in MarketFixtures function: ${(error as Error).message}`
    );
  }
};
</script>

<template>
  <div>
    <h1>Create a new stock into strapi</h1>
    <button @click="MarketFixtures">Populate Data</button>
  </div>
</template>

<style></style>
