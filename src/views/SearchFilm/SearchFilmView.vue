<script setup>
import FilmItem from "@/components/FilmItem/FilmItem.vue";
import { useFilmStore } from "@/stores/film";
import { useLoadingStore } from "@/stores/loading";
import { watch, watchEffect } from "vue";
import Pagination from "@/components/Pagination/Pagination.vue";
const film = useFilmStore();
import { useRoute } from "vue-router";
const route = useRoute();
const loading = useLoadingStore();

watchEffect(async () => {
  loading.setLoading(true);

  await film.searchFilm({
    search: route.params.name,
    page: route.params.page,
    item_per_page: 18,
  });
  loading.setLoading(false);
});
</script>

<template>
  <main>
    <div>
      <div className="pt-3 pb-5">
        <h3 className="mb-3 text-3xl">
          Kết Quả Tìm Kiếm Cho :
          <span style="color: rgb(255, 150, 88)"> {{ route.params.name }}</span>
        </h3>
        <div className="row">
          <div
            v-for="film in film?.listFilmSearch"
            :key="film?.id"
            class="col-6 col-sm-4 col-md-3 col-lg-2 mb-8"
            style="height: 260px"
          >
            <FilmItem :film="film" />
          </div>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-center">
        <Pagination :totalPage="film.totalPages" category="search" />
      </div>
    </div>
  </main>
</template>
