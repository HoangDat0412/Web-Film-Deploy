<template>
  <table class="min-w-full bg-white border">
    <thead>
      <tr class="bg-gray-50 text-gray-600 text-left">
        <th class="py-2 px-4">ID</th>
        <th class="py-2 px-4">Thumbnail</th>
        <th class="py-2 px-4">Name</th>
        <th class="py-2 px-4">Year</th>
        <th class="py-2 px-4">Views</th>
        <th class="py-2 px-4">Updated</th>
      </tr>
    </thead>
    <tbody class="text-gray-600">
      <tr
        v-for="film in movieStore.listFilmAdmin"
        :key="film.movie_id"
        class="border-t"
      >
        <td class="py-2 px-4">{{ film.movie_id }}</td>
        <td class="py-2 px-4">
          <RouterLink :to="`/filmdetail/${film.movie_id}`">
            <img
              :src="film.thumb_url"
              alt="thumbnail"
              class="w-16 h-16 object-cover rounded-md"
          /></RouterLink>
        </td>
        <td class="py-2 px-4">
          <RouterLink :to="`/filmdetail/${film.movie_id}`">{{
            film.name
          }}</RouterLink>
        </td>
        <td class="py-2 px-4">{{ film.year }}</td>
        <td class="py-2 px-4">{{ film.view.toLocaleString() }}</td>
        <td class="py-2 px-4">
          {{ film.updated_at.split("T")[0] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useFilmStore } from "@/stores/film";
import { onMounted } from "vue";

const movieStore = useFilmStore();

onMounted(() => {
  movieStore.fetchMovies();
});
</script>

<style lang="scss" scoped></style>
