// stores/director.js
import { defineStore } from "pinia";
import { service } from "@/service/baseService";
import debounce from "lodash/debounce"; // Import debounce if needed
import { useNotificationStore } from "./notification";

export const useDirectorStore = defineStore("director", {
  state: () => ({
    directors: [],
    currentPage: 1,
    itemsPerPage: 15,
    searchQuery: "",
    loading: false,
    error: null,
    selectedDirectors: [],
    totalPages: 0,
    totalDirectors: 0,
    notification: useNotificationStore(),
  }),

  actions: {
    async fetchDirectors(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.get("directors/search/director", {
          // page,
          // item_per_page: this.itemsPerPage,
          name: this.searchQuery,
        });
        this.directors = response.data.items;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;

        this.totalDirectors = response.data.total_items;
      } catch (err) {
        this.error =
          err.message || "An error occurred while fetching directors.";
      } finally {
        this.loading = false;
      }
    },

    async deleteDirector(id) {
      try {
        const result = await service.delete(`/directors/${id}`);
        if (result.status === 200) {
          // await this.getListUser();
          this.notification.show("", "success", "Delete success !!", "Success");
          this.fetchDirectors();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async addNewDirector(data) {
      try {
        const result = await service.post(`/directors`, data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          // await this.getListUser();
          this.fetchDirectors();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },

    async searchDirectors(query) {
      this.setSearchQuery(query);
    },

    // Debounced search query update
    setSearchQuery: debounce(function (query) {
      this.searchQuery = query;
      this.currentPage = 1; // reset to the first page when searching
      this.fetchDirectors();
    }, 300),

    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        await this.fetchDirectors(page);
      }
    },
    setItemsPerPage(items) {
      this.itemsPerPage = items;
      this.currentPage = 1; // reset to the first page when items per page changes
      this.fetchDirectors();
    },

    addSelectedDirector(director) {
      if (
        !this.selectedDirectors.some(
          (d) => d.director_id === director.director_id
        )
      ) {
        this.selectedDirectors.push(director);
      }
    },

    removeSelectedDirector(director) {
      this.selectedDirectors = this.selectedDirectors.filter(
        (d) => d.director_id !== director.director_id
      );
    },

    resetSelectedDirectors() {
      this.selectedDirectors = [];
    },
  },

  getters: {
    filteredDirectors: (state) => {
      if (!state.searchQuery) {
        return state.directors;
      }
      return state.directors.filter((director) =>
        director.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },

    isDirectorSelected: (state) => (director) => {
      return state.selectedDirectors.some(
        (d) => d.director_id === director.director_id
      );
    },
  },
});
