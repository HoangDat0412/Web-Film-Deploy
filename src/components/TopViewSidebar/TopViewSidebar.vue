<script setup>
const props = defineProps(["film"]);
const film = props.film;
import TrendingItem from "../TrendingItem/TrendingItem.vue";
</script>
<template>
  <div class="mt-4 custom-scrollbar" style="height: 125vh; overflow-y: scroll">
    <!-- <div v-for="(film, index) in film?.topViewMonth" :key="index" class="mb-3"> -->
    <div v-for="(film, index) in film?.topViewMonth" :key="index" class="mb-3">
      <TrendingItem :film="film" />
    </div>
  </div>
</template>
