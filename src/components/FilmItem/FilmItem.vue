<script setup>
import "./filmitem.scss";
import { ref, watch } from "vue";

const props = defineProps(["film", "isPoster"]);
const film = ref(props.film);

const isPoster = ref(props.isPoster);
const backGroundUrl = ref(isPoster.value);
// Watch for changes in the film prop and update the local ref
watch(
  () => props.film,
  (newFilm) => {
    film.value = newFilm;
    backGroundUrl.value = isPoster.value
      ? film.value?.poster_url
      : film.value?.thumb_url;
  },
  { immediate: true }
);
</script>

<template>
  <main style="height: 100%">
    <div class="film_item" :title="film?.name">
      <!-- <RouterLink :to="`/filmdetail/${film?.id}`" class="myui-vodlist__thumb" :style="{background:'url(' + film?.thumb_url + ')'}"> -->
      <RouterLink
        :to="`/filmdetail/${film?.movie_id}`"
        class="myui-vodlist__thumb"
        :style="{ background: 'url(' + backGroundUrl + ')' }"
      >
        <span class="play hidden-xs"></span>
        <span v-if="film?.episode_current" class="pic-tag pic-tag-top">
          {{ film?.episode_current }} {{ film?.quality }}
        </span>
        <div class="myui-vodlist__detail">
          <h3 class="title text-overflow pb-2">{{ film?.name }}</h3>
        </div>
      </RouterLink>
    </div>
  </main>
</template>
