<script setup lang="ts">
export interface Stock {
  T: string;
  c: number;
  v: number;
}

const MarketFixtures = async () => {
  // This api key is a free plan, it has a limit of 5 requests per minute, you can use this api but if it reach the limit you can create your own api key for free on https://polygon.io/
  // The api key should be add in the .env file to secure it, here it is a student project and an free plan api so i put it here to let user test the app without any configuration
  const POLYGON_API_KEY = "B8mglg0lAk13qw7i9gu6n8BEnpb1PHw1";
  const response = await fetch(
    `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2024-03-15?adjusted=true&apiKey=${POLYGON_API_KEY}`
  );
  const responseJson = await response.json();

  const stockList = responseJson.results.map((stock: Stock) => ({
    ticker: stock.T.toUpperCase(),
    price: stock.c,
    volume: stock.v,
    slug: stock.T.toUpperCase(),
    published_at: new Date(),
  }));

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const chunkSize = 100;
  // if some request have failed due to server error, we can add all of them here to restart them, the numbers to add are the i*chunckSize
  // then you need to add a condition to check if the chunk is in the failedChunks array, like if(failedChunks.includes(i)) ...
  const failedChunks: number[] = [];

  for (let i = 0; i < stockList.length; i += chunkSize) {
    const chunk = stockList.slice(i, i + chunkSize);
    await fetch("http://localhost:1337/api/market/createMany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: chunk }),
    });
    await sleep(1000);
  }
};
</script>

<template>
  <h1>Populate the database 10 000 stock from the polygon Api</h1>
  <h2>
    Do it only if you know what you are doing, the database could already have
    these data, and you would just create copy by doing this
  </h2>
  <div class="buttonContainer">
    <button class="createmanyButton" @click="MarketFixtures">
      Populate Data
    </button>
  </div>
</template>

<style>
h1 {
  text-align: center;
  padding: 20px;
  font-size: 2rem;
  margin-bottom: 50px;
}
h2 {
  text-align: center;
  padding: 20px;
  font-size: 1.5rem;
  margin-bottom: 50px;
}
.createmanyButton {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #ff0000;
  border: none;
  cursor: pointer;
}
.createmanyButton:hover {
  color: white;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
</style>
