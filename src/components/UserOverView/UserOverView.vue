<template>
  <main class="container py-2 px-12 min-h-[500px]">
    <h2 class="text-2xl font-semibold mt-3 mb-1">Thống kê</h2>
    <div class="flex flex-wrap justify-between">
      <div class="flex flex-column">
        <h3 class="text-xl mb-1">Đã đánh giá</h3>
        <h2 class="text-4xl font-bold">4</h2>
      </div>

      <div class="flex flex-column">
        <h3 class="text-xl mb-1">Số blog</h3>
        <h2 class="text-4xl font-bold">7</h2>
      </div>
      <div class="flex flex-column">
        <h3 class="text-xl mb-1">Tổng quan đánh giá</h3>
        <Bar :data="dataBar" />
      </div>

      <div class="flex flex-column">
        <h3 class="text-xl mb-1">Thể loại ưa thích</h3>
        <Doughnut :data="dataDoughnut" style="height: 150px; width: 150px" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
Chart.defaults.color = "#fff";

import { Bar, Doughnut } from "vue-chartjs";

const dataBar = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  datasets: [
    {
      label: "Số lần",
      data: [65, 59, 80, 81, 56, 55, 40, 20, 70, 100],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",

      borderWidth: 1,
    },
  ],
};

const dataDoughnut = {
  labels: ["Hài Hước", "Kinh Dị", "Tình Cảm"],
  datasets: [
    {
      label: "Số phim đã xem",
      data: [3, 4, 5],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
</script>

<style lang="scss" scoped></style>
