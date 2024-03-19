<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const page = ref(1);
const pageSize = ref(100);

const { find } = useStrapi();
const {
  data: market,
  pending,
  error,
  refresh,
} = await useAsyncData("markets", () =>
  find("markets", {
    populate: "*",
    pagination: { page: page.value, pageSize: pageSize.value },
  })
);

const goToStock = (slug) => {
  router.push(`/stocks/${slug}`);
};

watch(page, async (newPage) => {
  await refresh();
});

console.log(market._rawValue.data);
</script>

<template>
  <div class="marketContainer">
    <h1>Stocks Market</h1>
    <table>
      <thead>
        <tr class="trhead">
          <th>Ticker</th>
          <th>Price</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="stock in market?.data"
          :key="stock.id"
          @click="goToStock(stock.slug)"
          role="button"
        >
          <td>{{ stock.ticker }}</td>
          <td>{{ stock.price }}</td>
          <td>{{ stock.volume }}</td>
        </tr>
      </tbody>
    </table>
    <UPagination
      class="UPagination"
      v-model="page"
      :page-count="pageSize"
      :total="market?.meta.pagination.total"
    />
  </div>
</template>

<style scoped>
table {
  width: calc(100vw - 80px);
  border-collapse: collapse;
  margin-left: 40px;
  margin-right: 40px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
  text-align: center;
  width: calc(100% / 3);
}
tr {
  cursor: pointer;
}
.trhead {
  cursor: default;
}
td:hover {
  background-color: #d2ffd3;
}
.UPagination {
  padding-bottom: 100px;
  padding-top: 10px;
  gap: 2px;
}
.marketContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
