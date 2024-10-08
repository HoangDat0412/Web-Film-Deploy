<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-700">Update Movie</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="border p-4 rounded-md bg-white shadow-sm">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">
          Basic Information
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Name -->
          <div class="mb-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <input
              v-model="movie.name"
              id="name"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900 text-gray-900"
              required
            />
            <p v-if="nameError" class="text-red-500 text-sm mt-1">
              Name is required
            </p>
          </div>
          <!-- Origin Name -->
          <div class="mb-1">
            <label
              for="origin_name"
              class="block text-sm font-medium text-gray-700"
              >Origin Name</label
            >
            <input
              v-model="movie.origin_name"
              id="origin_name"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900 text-gray-900"
            />
          </div>
          <!-- Content -->
          <div class="mb-1 col-span-2">
            <label for="content" class="block text-sm font-medium text-gray-700"
              >Content</label
            >
            <textarea
              v-model="movie.content"
              id="content"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900 text-gray-900"
              rows="4"
            ></textarea>
          </div>
          <!-- Type -->
          <div class="mb-1">
            <label for="type" class="block text-sm font-medium text-gray-700"
              >Type</label
            >
            <input
              v-model="movie.type"
              id="type"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Status -->
          <div class="mb-1">
            <label for="status" class="block text-sm font-medium text-gray-700"
              >Status</label
            >
            <input
              v-model="movie.status"
              id="status"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Thumbnail URL -->
          <div class="mb-1">
            <label
              for="thumb_url"
              class="block text-sm font-medium text-gray-700"
              >Thumbnail URL</label
            >
            <input
              v-model="movie.thumb_url"
              id="thumb_url"
              type="url"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Trailer URL -->
          <div class="mb-1">
            <label
              for="trailer_url"
              class="block text-sm font-medium text-gray-700"
              >Trailer URL</label
            >
            <input
              v-model="movie.trailer_url"
              id="trailer_url"
              type="url"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Duration -->
          <div class="mb-1">
            <label
              for="duration"
              class="block text-sm font-medium text-gray-700"
              >Duration</label
            >
            <input
              v-model="movie.duration"
              id="duration"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Episode Current -->
          <div class="mb-1">
            <label
              for="episode_current"
              class="block text-sm font-medium text-gray-700"
              >Episode Current</label
            >
            <input
              v-model="movie.episode_current"
              id="episode_current"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Episode Total -->
          <div class="mb-1">
            <label
              for="episode_total"
              class="block text-sm font-medium text-gray-700"
              >Episode Total</label
            >
            <input
              v-model="movie.episode_total"
              id="episode_total"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Quality -->
          <div class="mb-1">
            <label for="quality" class="block text-sm font-medium text-gray-700"
              >Quality</label
            >
            <input
              v-model="movie.quality"
              id="quality"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Language -->
          <div class="mb-1">
            <label for="lang" class="block text-sm font-medium text-gray-700"
              >Language</label
            >
            <input
              v-model="movie.lang"
              id="lang"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Notify -->
          <div class="mb-1">
            <label for="notify" class="block text-sm font-medium text-gray-700"
              >Notify</label
            >
            <input
              v-model="movie.notify"
              id="notify"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Showtimes -->
          <div class="mb-1">
            <label
              for="showtimes"
              class="block text-sm font-medium text-gray-700"
              >Showtimes</label
            >
            <input
              v-model="movie.showtimes"
              id="showtimes"
              type="text"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Year -->
          <div class="mb-1">
            <label for="year" class="block text-sm font-medium text-gray-700"
              >Year</label
            >
            <input
              v-model="movie.year"
              id="year"
              type="number"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
          <!-- Poster URL -->
          <div class="mb-1">
            <label
              for="poster_url"
              class="block text-sm font-medium text-gray-700"
              >Poster URL</label
            >
            <input
              v-model="movie.poster_url"
              id="poster_url"
              type="url"
              class="mt-1 block w-full border-1 border-gray-300 rounded-md ps-2 text-gray-900"
            />
          </div>
        </div>
      </div>

      <!-- Genres, Countries, Actors, Directors -->
      <div class="border p-4 rounded-md bg-white shadow-sm">
        <!-- <h2 class="text-lg font-semibold mb-4 text-gray-700">
          Genres, Countries, Actors, Directors
        </h2> -->
        <div class="gap-4">
          <SelectGenresView class="mb-4" />

          <SelectCountriesView class="mb-4" />

          <SelectActorsView class="mb-4" />

          <SelectDirectorsView class="mb-5" />
        </div>
      </div>

      <a
        type="button"
        @click="handleSubmit()"
        class="px-6 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >Update Movie</a
      >
    </form>

    <ManageEpisodeView />
  </div>
</template>

<script setup>
import ManageEpisodeView from "@/components/ManageEpisode/ManageEpisodeView.vue";
import SelectActorsView from "@/components/SelectActors/SelectActorsView.vue";
import SelectCountriesView from "@/components/SelectCountries/SelectCountriesView.vue";
import SelectDirectorsView from "@/components/SelectDirectors/SelectDirectorsView.vue";
import SelectGenresView from "@/components/SelectGenres/SelectGenresView.vue";
import router from "@/router";
import { useActorStore } from "@/stores/actor";
import { useCountryStore } from "@/stores/country";
import { useDirectorStore } from "@/stores/director";
// import { useEpisodeStore } from "@/stores/episode";
import { useFilmStore } from "@/stores/film";
import { useGenreStore } from "@/stores/genre";
import { onMounted, ref } from "vue";
const filmStore = useFilmStore();

const movie = ref({
  name: "",
  origin_name: "",
  content: "",
  type: "",
  status: "",
  thumb_url: "",
  trailer_url: "",
  duration: "",
  episode_current: "",
  episode_total: "",
  quality: "",
  lang: "",
  notify: "",
  showtimes: "",
  year: null,
  is_copyright: false,
  chieurap: false,
  poster_url: "",
  sub_docquyen: false,
  movie_genres: [],
  movie_countries: [],
  movie_actors: [],
  movie_directors: [],
});
// const film = useFilmStore()
const genres = useGenreStore();
const actors = useActorStore();
const countries = useCountryStore();
const directors = useDirectorStore();
// const episodes = useEpisodeStore()
onMounted(async () => {
  const movieId = router.currentRoute.value.params.id; // Lấy ID từ URL
  await filmStore.setFilmDetail(movieId); // Gọi phương thức để lấy chi tiết phim

  movie.value = { ...filmStore.filmDetail }; // Đổ dữ liệu vào form

  console.log("detail movir", movie.value);

  genres.selectedGenres = filmStore.filmDetail.movie_genres.map(
    (item) => item.genre
  );
  actors.selectedActors = filmStore.filmDetail.movie_actors.map(
    (item) => item.actor
  );
  countries.selectedCountries = filmStore.filmDetail.movie_countries.map(
    (item) => item.country
  );
  directors.selectedDirectors = filmStore.filmDetail.movie_directors.map(
    (item) => item.director
  );
  // episodes.episodes = filmStore.filmDetail.episodes
});

const nameError = ref(false);
const handleSubmit = async () => {
  // Reset the error state
  nameError.value = false;
  // Check if the name field is empty
  if (!movie.value.name.trim()) {
    nameError.value = true;
    return;
  }
  // Prepare the movie object
  movie.value.movie_genres = genres.selectedGenres.map(
    (item) => item?.genre_id
  );
  movie.value.movie_actors = actors.selectedActors.map(
    (item) => item?.actor_id
  );
  movie.value.movie_countries = countries.selectedCountries.map(
    (item) => item?.country_id
  );
  movie.value.movie_directors = directors.selectedDirectors.map(
    (item) => item?.director_id
  );

  delete movie.value.episodes;
  delete movie.value.ratings;
  delete movie.value.category_movies;

  filmStore.updateFilm(movie.value.movie_id, movie.value);
};
</script>

<style scoped>
input {
  border-color: #374151;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>
