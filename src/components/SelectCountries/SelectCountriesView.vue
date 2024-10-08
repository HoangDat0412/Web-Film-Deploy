<template>
  <div class="relative w-full" ref="multiSelectRef" style="z-index: 9">
    <!-- Selected Countries -->
    <label
      for="country_select"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      Countries
    </label>
    <div class="flex flex-wrap items-center space-x-2 p-2 border rounded-lg">
      <span
        v-for="(country, index) in countryStore.selectedCountries"
        :key="index"
        class="flex items-center bg-gray-100 rounded-full p-1 mb-2"
      >
        <span class="text-gray-600 ms-2">{{ country.name }}</span>
        <button @click="removeCountry(country)" class="btn ml-1 text-gray-500">
          ✕
        </button>
      </span>
      <input
        v-model="searchQuery"
        @focus="isDropdownOpen = true"
        class="border-none outline-none w-full p-1 text-gray-900"
        placeholder="Select countries..."
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
          v-for="country in filteredCountries"
          :key="country.country_id"
          class="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
          @click="selectCountry(country)"
          role="option"
          :aria-selected="isCountrySelected(country)"
        >
          <span class="text-gray-500">{{ country.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useCountryStore } from "@/stores/country";
import debounce from "lodash/debounce";

// State
const searchQuery = ref("");
const isDropdownOpen = ref(false);
const multiSelectRef = ref(null);

// Pinia store
const countryStore = useCountryStore();

// Fetch countries on mount
onMounted(() => {
  countryStore.fetchCountries();
});

// Debounced search query update
const debouncedSearch = debounce((query) => {
  countryStore.setSearchQuery(query);
}, 300);

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});

// Computed to filter countries
const filteredCountries = computed(() => {
  return countryStore.filteredCountries;
});

// Select a country and add it to the store
const selectCountry = (country) => {
  if (countryStore.selectedCountries.length < 5) {
    countryStore.addSelectedCountry(country);
    searchQuery.value = "";
    isDropdownOpen.value = false;
  }
};

// Remove a country from the store
const removeCountry = (country) => {
  countryStore.removeSelectedCountry(country);
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
  countryStore.selectedCountries = []; // Custom action to reset selected actors
  countryStore.countries = []; // Custom action to reset actors list
  searchQuery.value = ""; // Reset search query
});

// Helper function to check if a country is selected
const isCountrySelected = (country) => {
  return countryStore.isCountrySelected(country);
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
