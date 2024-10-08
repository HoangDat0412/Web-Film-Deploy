import { defineStore } from "pinia";

import { service } from "@/service/baseService";
import { useNotificationStore } from "./notification";

export const useGenreStore = defineStore("genre", {
  state: () => ({
    genres: [],
    currentPage: 1,
    itemsPerPage: 30,
    totalGenres: 0,
    searchQuery: "",
    loading: false,
    error: null,
    selectedGenres: [],
    totalPages: 0,
    notification: useNotificationStore(),
  }),

  actions: {
    async fetchGenres() {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.get("/genre/search/genre", {
          page: this.currentPage,
          item_per_page: this.itemsPerPage,
          search: this.searchQuery,
        });
        this.genres = response.data.items;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;
        this.totalGenres = response.data.total_items;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteGenre(id) {
      try {
        const result = await service.delete(`/genre/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Genre success !",
            "Sucess"
          );
          // await this.getListUser();
          this.fetchGenres();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },

    async addNewGenre(data) {
      try {
        const result = await service.post(`/genre`, data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          // await this.getListUser();
          this.fetchGenres();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },

    async searchGenres(query) {
      this.setSearchQuery(query);
      await this.fetchGenres(1);
    },

    setSearchQuery(query) {
      this.searchQuery = query;
      this.currentPage = 1; // reset to the first page when searching
      this.fetchGenres();
    },
    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        await this.fetchGenres(page);
      }
    },
    setItemsPerPage(items) {
      this.itemsPerPage = items;
      this.fetchGenres();
    },
    addSelectedGenre(genre) {
      // Check if the genre is already selected
      if (this.selectedGenres.length === 0) {
        this.selectedGenres.push(genre);
      } else {
        if (!this.selectedGenres.some((g) => g.genre_id === genre.genre_id)) {
          this.selectedGenres.push(genre);
        }
      }
    },
    removeSelectedGenre(genre) {
      this.selectedGenres = this.selectedGenres.filter(
        (g) => g.genre_id !== genre.genre_id
      );
    },
    resetSelectedGenres() {
      this.selectedGenres = [];
    },
  },

  getters: {
    filteredGenres: (state) => {
      return state.genres;
    },
  },
});
