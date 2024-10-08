// stores/country.js
import { defineStore } from "pinia";
import { service } from "@/service/baseService";
import debounce from "lodash/debounce"; // Import debounce if needed
import { useNotificationStore } from "./notification";

export const useCountryStore = defineStore("country", {
  state: () => ({
    countries: [],
    searchQuery: "",
    loading: false,
    error: null,
    selectedCountries: [],
    notification: useNotificationStore(),
  }),

  actions: {
    async fetchCountries() {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.get("/countries");
        this.countries = response.data;
      } catch (err) {
        this.error =
          err.message || "An error occurred while fetching countries.";
      } finally {
        this.loading = false;
      }
    },

    // Debounced search query update
    setSearchQuery: debounce(function (query) {
      this.searchQuery = query;
    }, 300),

    addSelectedCountry(country) {
      if (
        !this.selectedCountries.some((c) => c.country_id === country.country_id)
      ) {
        this.selectedCountries.push(country);
      }
    },

    removeSelectedCountry(country) {
      this.selectedCountries = this.selectedCountries.filter(
        (c) => c.country_id !== country.country_id
      );
    },

    resetSelectedCountries() {
      this.selectedCountries = [];
    },
  },

  getters: {
    filteredCountries: (state) => state.countries,

    selectedCountriesCount: (state) => state.selectedCountries.length,

    isCountrySelected: (state) => (country) => {
      return state.selectedCountries.some(
        (c) => c.country_id === country.country_id
      );
    },
  },
});
