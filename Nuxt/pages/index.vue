<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const page = ref(1);
const pageSize = ref(100);
const selectedFilter = ref(null);
const equalTo = ref<number>();
const greaterThan = ref<number>();
const lessThan = ref<number>();

const { find } = useStrapi();
const {
  data: market,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "markets",
  () =>
    find("markets", {
      populate: "*",
      pagination: { page: page.value, pageSize: pageSize.value },
      // filters: {
      //   ...(selectedFilter.value && {
      //     [selectedFilter.value]: {
      //       ...(equalTo.value && { $eq: equalTo.value }),
      //       ...(greaterThan.value && { $gt: greaterThan.value }),
      //       ...(lessThan.value && { $lt: lessThan.value }),
      //     },
      //   }),
      // },
      filters: {
        ...(selectedFilter.value === "volume" && {
          $and: [
            { volume: { $eq: equalTo.value } },
            { volume: { $gt: greaterThan.value } },
            { volume: { $lt: lessThan.value } },
          ],
        }),
        ...(selectedFilter.value === "price" && {
          $and: [
            { price: { $eq: equalTo.value } },
            { price: { $gt: greaterThan.value } },
            { price: { $lt: lessThan.value } },
          ],
        }),
      },
    }),
  {
    watch: [page, pageSize],
  }
);

const goToStock = (slug) => {
  router.push(`/stocks/${slug}`);
};

const resetFilters = () => {
  selectedFilter.value = null;
  equalTo.value = undefined;
  greaterThan.value = undefined;
  lessThan.value = undefined;
  refresh();
};
</script>

<template>
  <h1>Stocks Market</h1>
  <section class="marketDashboard">
    <div class="filtersContainer">
      <h3>Filters</h3>
      <USelect
        v-model="selectedFilter"
        :options="['price', 'volume']"
        placeholder="Select a filter"
      />
      <label for="equal">Equal to:</label>
      <input type="text" id="equal" />
      <label for="greater">Greater than:</label>
      <input v-model="greaterThan" type="text" id="greater" />
      <label for="less">Less than:</label>
      <input v-model="lessThan" type="text" id="less" />
      <button class="resetfilterbt" @click="resetFilters">Reset Filters</button>
      <button class="applyfilterbt" @click="refresh">Apply</button>
    </div>
    <div class="marketContainer">
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
      <div class="paginationcontainer">
        <UPagination
          class="UPagination"
          v-model="page"
          :page-count="pageSize"
          :total="market?.meta.pagination.total"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
table {
  width: calc(80vw - 40px);
  border-collapse: collapse;
  margin-left: 20px;
  margin-right: 20px;
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
  gap: 2px;
}
.marketContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
}

.paginationcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  padding-top: 10px;
  gap: 20px;
}
.filtersContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
  width: 20vw;
  border: 1px solid #000000;
  margin-left: 20px;
}

.marketDashboard {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.applyfilterbt {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #00b000;
  border: none;
  cursor: pointer;
}

.resetfilterbt {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #ff0000;
  border: none;
  cursor: pointer;
}
</style>
