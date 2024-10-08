<template>
  <div class="relative w-full" ref="multiSelectRef" style="z-index: 7">
    <!-- Selected Actors -->
    <label
      for="actor_select"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      Actors
    </label>
    <div class="flex flex-wrap items-center space-x-2 p-2 border rounded-lg">
      <span
        v-for="(actor, index) in actorStore.selectedActors"
        :key="index"
        class="flex items-center bg-gray-100 rounded-full p-1 mb-2"
      >
        <span class="text-gray-600 ms-2">{{ actor.name }}</span>
        <button @click="removeActor(actor)" class="btn ml-1 text-gray-500">
          ✕
        </button>
      </span>
      <input
        v-model="searchQuery"
        @focus="isDropdownOpen = true"
        class="border-none outline-none w-full p-1 text-gray-900"
        placeholder="Select actors..."
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
          v-for="actor in filteredActors"
          :key="actor.actor_id"
          class="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
          @click="selectActor(actor)"
          role="option"
          :aria-selected="isActorSelected(actor)"
        >
          <span class="text-gray-500">{{ actor.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useActorStore } from "@/stores/actor";
import debounce from "lodash/debounce";

// State
const searchQuery = ref("");
const isDropdownOpen = ref(false);
const multiSelectRef = ref(null);

// Pinia store
const actorStore = useActorStore();

// Fetch actors on mount
onMounted(() => {
  actorStore.fetchActors();
});

// Debounced search query update
const debouncedSearch = debounce((query) => {
  actorStore.setSearchQuery(query);
}, 300);

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});

// Computed to filter actors
const filteredActors = computed(() => {
  return actorStore.filteredActors;
});

// Select an actor and add it to the store
const selectActor = (actor) => {
  actorStore.addSelectedActor(actor);
  searchQuery.value = "";
  isDropdownOpen.value = false;
};

// Remove an actor from the store
const removeActor = (actor) => {
  actorStore.removeSelectedActor(actor);
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
  actorStore.resetSelectedActors(); // Custom action to reset selected actors
  actorStore.actors = []; // Custom action to reset actors list
  searchQuery.value = ""; // Reset search query
});

// Helper function to check if an actor is selected
const isActorSelected = (actor) => {
  return actorStore.isActorSelected(actor);
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
