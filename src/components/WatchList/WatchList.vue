<script setup>
import { useWatchListStore } from "@/stores/watchList";
import { onBeforeMount, onMounted, watchEffect } from "vue";
import FilmItem from "../FilmItem/FilmItem.vue";

const watchlistStore = useWatchListStore();

watchEffect(async () => {
  await watchlistStore.getFilm();
  console.log(watchlistStore.movies);
});
</script>

<template>
  <main>
    <div class="py-2 px-12">
      <div className="pt-3 pb-5">
        <h3 className="mb-3 text-3xl">
          WatchList
          <span style="color: rgb(255, 150, 88)"> {{}}</span>
        </h3>
        <div className="row">
          <div
            v-for="film in watchlistStore?.movies"
            :key="film?.watchlist_id"
            class="col-6 col-sm-4 col-md-3 col-lg-2 mb-8"
            style="height: 260px"
          >
            <FilmItem :film="film.movie" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
