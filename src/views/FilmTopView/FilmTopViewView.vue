<script setup>
import { useFilmStore } from "@/stores/film";
import { onMounted, ref, watchEffect } from "vue";
import FilmItem from "@/components/FilmItem/FilmItem.vue";
import Pagination from "@/components/Pagination/Pagination.vue";

const film = useFilmStore();

watchEffect(() => {
  film.setListFilmCountry();
  film.setListFilmType();
  film.setListFilmYear();
});

const coutryFilterId = ref(film.searchCountryQuery);
const typeFilterId = ref(film.searchGenreQuery);
const yearFilterId = ref(film.searchYearQuery);
const searchQuery = ref("");

onMounted(async () => {
  await film.fetchMoviesRanking(1);
});

const handleSearchFilter = async () => {
  const data = {
    search_query: searchQuery.value,
    movie_country: coutryFilterId.value,
    year: yearFilterId.value,
    movie_genre: typeFilterId.value,
  };

  await film.searchMoviesRanking(data, 1);
};
</script>

<template>
  <div class="container mb-4 mt-2 min-h-80">
    <div class="grid grid-cols-5 gap-3 mb-4">
      <div class="max-w-sm mx-auto w-5/6">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium dark:text-white"
          >Chọn quốc gia</label
        >
        <select
          v-model="coutryFilterId"
          id="countries"
          class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option selected value="">Chọn quốc gia</option>
          <option
            v-for="(item, index) in film.listCountry"
            :key="index"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="max-w-sm mx-auto w-5/6">
        <label for="types" class="block mb-2 text-sm font-medium text-white"
          >Chọn thể loại</label
        >
        <select
          v-model="typeFilterId"
          id="types"
          class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option selected disabled value="">Chọn thể loại</option>
          <option
            v-for="(item, index) in film.listFilmType"
            :key="index"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="max-w-sm mx-auto w-5/6">
        <label for="years" class="block mb-2 text-sm font-medium text-white"
          >Chọn năm</label
        >
        <select
          v-model="yearFilterId"
          id="years"
          class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option selected value="">Chọn năm</option>
          <option
            v-for="(item, index) in film.listYear"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div class="col-span-2 flex">
        <div class="w-2/3">
          <label for="key" class="block mb-2 text-sm font-medium text-white"
            >Từ khóa</label
          >
          <div class="InputContainer w-5/6">
            <input
              placeholder="Search.."
              id="input"
              class="input"
              name="text"
              type="text"
              v-model="searchQuery"
            />
          </div>
        </div>
        <div class="flex items-end justify-center">
          <button class="button" @click="handleSearchFilter">
            <svg
              class="svgIcon"
              viewBox="0 0 512 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
              ></path>
            </svg>
            Tìm
          </button>
        </div>
      </div>
    </div>
    <h1 class="text-2xl mb-4">Phim có lượt xem nhiều nhất:</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
      <div
        v-for="film in film?.listFilmSearch"
        :key="film?.id"
        style="height: 260px"
      >
        <FilmItem :film="film" />
      </div>
    </div>
    <div class="w-full flex justify-center mt-4">
      <Pagination />
    </div>
  </div>
</template>
<style scoped>
@import url("./FilmTopViewView.scss");
</style>
