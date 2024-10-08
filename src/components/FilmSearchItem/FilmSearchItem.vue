<script setup>
import { ref, watch } from "vue";

const props = defineProps(["film"]);
const film = ref(props.film);

watch(
  () => props.film,
  (newFilm) => {
    film.value = newFilm;
  },
  { immediate: true }
);
</script>

<template>
  <main
    style="
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      background-color: black;
      z-index: 10;
    "
  >
    <div className="trendingItem container-fluid mt-2" style="">
      <RouterLink :to="`/filmdetail/${film?.movie_id}`" class="row">
        <div className="col-3">
          <img
            width="100%"
            height="80%"
            :src="film?.thumb_url"
            :alt="film?.name"
          />
        </div>
        <div class="col-9 d-flex" style="align-items: center">
          <div>
            <h6>{{ film?.name }}</h6>
            <h6>Lượt xem: {{ film?.view }}</h6>
          </div>
        </div>
      </RouterLink>
    </div>
  </main>
</template>
