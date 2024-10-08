<script setup>
import FilmItem from "@/components/FilmItem/FilmItem.vue";

import { watchEffect } from "vue";
import { usePlayListFilmStore } from "@/stores/playListFilm";
import { useRoute } from "vue-router";
import { useLoadingStore } from "@/stores/loading";
const loading = useLoadingStore();

const route = useRoute();

const playlist = usePlayListFilmStore();

watchEffect(async () => {
  loading.setLoading(true);

  await playlist.getFilmOfAPlaylist(route.params.id);
  loading.setLoading(false);

  console.log("playlist", playlist.playlistFilm);
});
</script>
<template>
  <main>
    <div>
      <div className="pt-3 pb-5">
        <h3 className="mb-3 text-3xl">
          Các phim trong playlist
          <span style="color: rgb(255, 150, 88)"> {{ playlist.name }}</span>
        </h3>
        <div className="row">
          <div
            v-for="film in playlist?.playlistFilm"
            :key="film?.movie_id"
            class="col-6 col-sm-4 col-md-3 col-lg-2 mb-8"
            style="height: 260px"
          >
            <FilmItem :film="film" />
          </div>
        </div>
      </div>
      <!-- <div class="w-100 d-flex justify-content-center">
        <Pagination :totalPage="film.totalPages" category="search" />
      </div> -->
    </div>
  </main>
</template>

<style scoped></style>
