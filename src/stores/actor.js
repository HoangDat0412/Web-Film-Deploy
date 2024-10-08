// stores/actor.js
import { defineStore } from "pinia";
import { service } from "@/service/baseService";
import debounce from "lodash/debounce"; // Import debounce if needed

import { useNotificationStore } from "@/stores/notification";

export const useActorStore = defineStore("actor", {
  state: () => ({
    actors: [],
    currentPage: 1,
    itemsPerPage: 15,
    totalActors: 0,
    searchQuery: "",
    loading: false,
    error: null,
    selectedActors: [],
    totalPages: 0,
    notification: useNotificationStore(),
  }),

  actions: {
    async fetchActors(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.get("/actor/search", {
          page,
          item_per_page: this.itemsPerPage,
          name: this.searchQuery,
        });
        console.log("result", response.data);

        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;

        this.actors = response.data.items;
        this.totalActors = response.data.total_items;
      } catch (err) {
        this.error = err.message || "An error occurred while fetching actors.";
      } finally {
        this.loading = false;
      }
    },
    async deleteActor(id) {
      try {
        const result = await service.delete(`/actor/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Actor success !",
            "Sucess"
          );
          this.fetchActors();
        } else {
          this.notification.show("", "error", "Delete Actor fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Delete Actor fail !", "Error");
      }
    },

    async addNewActor(data) {
      try {
        const result = await service.post(`/actor`, data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          // await this.getListUser();
          this.fetchActors();
        } else {
          this.notification.show("", "error", "Add new Actor Fail !", "Fail");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Add new Actor Fail !", "Fail");
      }
    },

    async searchActors(query) {
      this.setSearchQuery(query);
      await this.fetchActors(1);
    },

    // Debounced search query update
    setSearchQuery: debounce(function (query) {
      this.searchQuery = query;
      this.currentPage = 1; // reset to the first page when searching
      this.fetchActors();
    }, 300),

    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        await this.fetchActors(page);
      }
    },

    setItemsPerPage(items) {
      this.itemsPerPage = items;
      this.currentPage = 1; // reset to the first page when items per page changes
      this.fetchActors();
    },

    addSelectedActor(actor) {
      if (!this.selectedActors.some((a) => a.actor_id === actor.actor_id)) {
        this.selectedActors.push(actor);
      }
    },

    removeSelectedActor(actor) {
      this.selectedActors = this.selectedActors.filter(
        (a) => a.actor_id !== actor.actor_id
      );
    },

    resetSelectedActors() {
      this.selectedActors = [];
    },
  },

  getters: {
    filteredActors: (state) => state.actors,

    selectedActorsCount: (state) => state.selectedActors.length,

    isActorSelected: (state) => (actor) => {
      return state.selectedActors.some((a) => a.actor_id === actor.actor_id);
    },
  },
});
