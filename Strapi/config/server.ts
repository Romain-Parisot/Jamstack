import fetch from "node-fetch";
require("dotenv").config();

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  bootstrap: async () => {
    try {
      const existingRecords = await strapi.services.market.count();

      console.log(`Existing records: ${existingRecords}`);

      if (existingRecords === 1) {
        const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
        const response = await fetch(
          `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2024-03-15?adjusted=true&apiKey=${POLYGON_API_KEY}`
        );
        const responseJson = await response.json();

        console.log(`API response: ${JSON.stringify(responseJson)}`);

        const stockList = responseJson.results.map((stock) => ({
          name: stock.T,
          price: stock.c,
          volume: stock.v,
        }));

        console.log(`Stock list: ${JSON.stringify(stockList)}`);

        for (const stock of stockList) {
          const createdStock = await strapi.services.market.create(stock);
          console.log(`Created stock: ${JSON.stringify(createdStock)}`);
        }
      }
    } catch (error) {
      console.error(`Error in bootstrap function: ${error.message}`);
    }
  },
});
