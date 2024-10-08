<template>
  <div class="relative w-full" ref="multiSelectRef" style="z-index: 10">
    <!-- Selected Genres -->
    <label
      for="movie_countries"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      Genres
    </label>
    <div class="flex flex-wrap items-center space-x-2 p-2 border rounded-lg">
      <span
        v-for="(genre, index) in genreStore.selectedGenres"
        :key="index"
        class="flex items-center bg-gray-100 rounded-full p-1 mb-2"
      >
        <span class="text-gray-600 ms-2">{{ genre.name }}</span>
        <button @click="removeGenre(genre)" class="btn ml-1 text-gray-500">
          ✕
        </button>
      </span>
      <input
        v-model="searchQuery"
        @focus="isDropdownOpen = true"
        class="border-none outline-none w-full p-1 text-gray-900"
        placeholder="Select genres..."
        aria-expanded="isDropdownOpen"
        aria-controls="dropdown-menu"
        aria-autocomplete="list"
      />
    </div>

    <!-- Dropdown -->
    <div
      v-if="isDropdownOpen"
      id="dropdown-menu"
      class="absolute w-full mt-1 bg-white border rounded-lg shadow-lg"
      style="max-height: 150px; overflow-y: scroll"
    >
      <ul>
        <li
          v-for="genre in filteredGenres"
          :key="genre.genre_id"
          class="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
          @click="selectGenre(genre)"
          role="option"
          :aria-selected="isSelected(genre)"
        >
          <span class="text-gray-500">{{ genre.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useGenreStore } from "@/stores/genre";
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import debounce from "lodash/debounce";

// State
const searchQuery = ref("");
const isDropdownOpen = ref(false);
const multiSelectRef = ref(null);

// Pinia store
const genreStore = useGenreStore();

// Fetch genres on mount
onMounted(() => {
  genreStore.fetchGenres();
});

// Debounced search query update
const debouncedSearch = debounce((query) => {
  genreStore.setSearchQuery(query);
  genreStore.fetchGenres();
}, 300);

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});

// Computed to filter genres
const filteredGenres = computed(() => {
  return genreStore.genres;
});

// Select a genre and add it to the store
const selectGenre = (genre) => {
  if (genreStore.selectedGenres.length < 5) {
    genreStore.addSelectedGenre(genre);
    searchQuery.value = "";
    isDropdownOpen.value = false;
  }
};

// Remove a genre from the store
const removeGenre = (genre) => {
  genreStore.removeSelectedGenre(genre);
};

// Function to detect clicks outside of the component
const handleClickOutside = (event) => {
  if (multiSelectRef.value && !multiSelectRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

// Register event listener when the component is mounted
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Remove the event listener when the component is unmounted
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  genreStore.genres = [];
  genreStore.selectedGenres = [];
});

// Helper function to check if a genre is selected
const isSelected = (genre) => {
  return genreStore.selectedGenres.includes(genre);
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
