import { defineStore } from "pinia";

import { service } from "@/service/baseService";
import debounce from "lodash/debounce"; // Import debounce if needed
import { useNotificationStore } from "./notification";

export const useRequestFeatureStore = defineStore("request-feature", {
  state: () => ({
    currentPage: 1,
    itemsPerPage: 30,
    searchQuery: "",
    loading: false,
    error: null,
    totalPages: 0,
    totalRequestFeatures: 0,
    requestFeatures: [],
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async fetchRequestFeature(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.get("/request-feature", {
          page: this.currentPage,
          limit: this.itemsPerPage,
          searchQuery: this.searchQuery,
        });
        this.requestFeatures = response.data.data;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;

        this.totalRequestFeatures = response.data.total;
      } catch (err) {
        this.error =
          err.message || "An error occurred while fetching directors.";
      } finally {
        this.loading = false;
      }
    },

    async deleteRequestFeature(id) {
      try {
        const result = await service.delete(`/request-feature/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Request Feature success !",
            "Sucess"
          );
          await this.fetchRequestFeature();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },

    async searchRequestFeature(query) {
      this.setSearchQuery(query);
      await this.fetchRequestFeature(1);
    },

    setSearchQuery: debounce(function (query) {
      this.searchQuery = query;
      this.currentPage = 1; // reset to the first page when searching
      this.fetchRequestFeature();
    }, 300),

    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        await this.fetchRequestFeature(page);
      }
    },

    setItemsPerPage(items) {
      this.itemsPerPage = items;
      this.currentPage = 1; // reset to the first page when items per page changes
      this.fetchRequestFeature();
    },

    async sendRequestFeature(data) {
      try {
        const result = await service.upload("/request-feature", data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Gửi yêu cầu tính năng thành công!",
            "Sucess"
          );
        } else {
          this.notification.show(
            "",
            "error",
            "Thất bại !",
            "Gửi yêu cầu tính năng thất bại"
          );
        }
      } catch (e) {
        console.log(e);
        this.notification.show(
          "",
          "error",
          "Thất bại !",
          "Gửi yêu cầu tính năng thất bại"
        );
      }
    },
  },
});
