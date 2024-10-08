<template>
  <Carousel :items-to-show="1.5" :breakpoints="breakpoints" :wrap-around="true">
    <Slide v-for="(film, index) in listFilm" :key="index">
      <div class="carousel__item" style="width: 90%; height: 220px">
        <FilmItem :film="film" />
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";

import { Carousel, Navigation, Slide } from "vue3-carousel";
import { useFilmStore } from "@/stores/film";
import { onMounted } from "vue";
import FilmItem from "../FilmItem/FilmItem.vue";

const breakpoints = {
  0: {
    itemsToShow: 2.5,
    snapAlign: "center",
  },
  700: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  1000: {
    itemsToShow: 4.5,
    snapAlign: "center",
  },
};

const props = defineProps(["listFilm"]);
const listFilm = props.listFilm;
</script>

<style lang="scss" scoped></style>
