<template>
  <div class="relative w-full" ref="multiSelectRef">
    <!-- Selected Directors -->
    <label
      for="director_select"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      Directors
    </label>
    <div class="flex flex-wrap items-center space-x-2 p-2 border rounded-lg">
      <span
        v-for="(director, index) in directorStore.selectedDirectors"
        :key="index"
        class="flex items-center bg-gray-100 rounded-full p-1 mb-2"
      >
        <span class="text-gray-600 ms-2">{{ director.name }}</span>
        <button
          @click="removeDirector(director)"
          class="btn ml-1 text-gray-500"
        >
          ✕
        </button>
      </span>
      <input
        v-model="searchQuery"
        @focus="isDropdownOpen = true"
        class="border-none outline-none w-full p-1 text-gray-900"
        placeholder="Select directors..."
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
          v-for="director in filteredDirectors"
          :key="director.director_id"
          class="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
          @click="selectDirector(director)"
          role="option"
          :aria-selected="isDirectorSelected(director)"
        >
          <span class="text-gray-500">{{ director.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useDirectorStore } from "@/stores/director";
import debounce from "lodash/debounce";

// State
const searchQuery = ref("");
const isDropdownOpen = ref(false);
const multiSelectRef = ref(null);

// Pinia store
const directorStore = useDirectorStore();

// Fetch directors on mount
onMounted(() => {
  directorStore.fetchDirectors();
});

// Debounced search query update
const debouncedSearch = debounce((query) => {
  directorStore.setSearchQuery(query);
}, 300);

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});

// Computed to filter directors
const filteredDirectors = computed(() => {
  return directorStore.directors;
});

// Select a director and add it to the store
const selectDirector = (director) => {
  if (directorStore.selectedDirectors.length < 5) {
    directorStore.addSelectedDirector(director);
    searchQuery.value = "";
    isDropdownOpen.value = false;
  }
};

// Remove a director from the store
const removeDirector = (director) => {
  directorStore.removeSelectedDirector(director);
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
  // Reset data when the component is unmounted
  directorStore.directors = []; // Custom action to reset selected actors
  directorStore.selectedDirectors = []; // Custom action to reset actors list
  searchQuery.value = ""; // Reset search query
});

// Helper function to check if a director is selected
const isDirectorSelected = (director) => {
  return directorStore.isDirectorSelected(director);
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
