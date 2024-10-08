<script setup>
import { ref, watch } from "vue";
const props = defineProps(["searchResult", "isFocus", "searchInput"]);

import FilmSearchItem from "../FilmSearchItem/FilmSearchItem.vue";
import { useFilmStore } from "@/stores/film";
const filmStore = useFilmStore();
const films = ref(props.searchResult);

watch(
  () => props.searchResult,
  (newResult) => {
    films.value = newResult;
  },
  { immediate: true }
);
</script>
<template>
  <div v-if="searchInput && props.isFocus">
    <div
      v-if="filmStore.listFilmSearchHeader.length > 0"
      class="mt-4 custom-scrollbar"
      style="height: 70vh; overflow-y: scroll; background-color: black"
    >
      <div
        v-for="(film, index) in filmStore.listFilmSearchHeader"
        :key="index"
        class="mb-3"
      >
        <FilmSearchItem :film="film" />
      </div>
    </div>
    <div
      v-else
      style="
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        background-color: black;
        z-index: 10;
      "
    >
      <div class="w-100 p-2">Không tìm thấy kết quả</div>
    </div>
  </div>
</template>
