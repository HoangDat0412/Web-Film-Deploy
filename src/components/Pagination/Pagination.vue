<script setup>
import { useFilmStore } from "@/stores/film";
import { computed, ref } from "vue";

const currentPage = ref(1);
const filmStore = useFilmStore();

const handlepage = (page) => {
  filmStore.goToPageFilter(page);
};

const handleBack = () => {
  if (filmStore.currentPage > 1) {
    filmStore.goToPageFilter(filmStore.currentPage - 1);
  }
};
const handleNext = () => {
  if (filmStore.currentPage < filmStore.totalPages) {
    filmStore.goToPageFilter(filmStore.currentPage + 1);
  }
};
</script>

<template>
  <div class="example-six">
    <vue-awesome-paginate
      :total-items="filmStore?.totalPages"
      v-model="currentPage"
      :items-per-page="1"
      :max-pages-shown="3"
      @click="handlepage"
    >
      <template #prev-button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            @click="handleBack"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>

      <template #next-button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            @click="handleNext"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<style>
@import url("./Pagination.scss");
</style>
