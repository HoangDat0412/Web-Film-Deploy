import { defineStore } from "pinia";
import { service } from "@/service/baseService";
import debounce from "lodash/debounce"; // Import debounce if needed
import { useNotificationStore } from "./notification";

export const useBugStore = defineStore("bug", {
  state: () => ({
    currentPage: 1,
    itemsPerPage: 30,
    searchQuery: "",
    loading: false,
    error: null,
    totalPages: 0,
    totalBugs: 0,
    bugs: [],
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async fetchBugs(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.get("/report-bug", {
          page: this.currentPage,
          // limit: this.itemsPerPage,
          searchQuery: this.searchQuery,
        });
        console.log("ressult bug", response.data);
        this.bugs = response.data.data;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;

        this.totalBugs = response.data.total;
      } catch (err) {
        this.error =
          err.message || "An error occurred while fetching directors.";
      } finally {
        this.loading = false;
      }
    },

    async deleteBug(id) {
      try {
        const result = await service.delete(`/report-bug/${id}`);
        if (result.status === 200) {
          // await this.getListUser();
          this.notification.show("", "success", "Delete success!!", "Success");
          await this.fetchBugs();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },

    async searchBugs(query) {
      this.setSearchQuery(query);
      await this.fetchBugs(1);
    },

    setSearchQuery: debounce(function (query) {
      this.searchQuery = query;
      this.currentPage = 1; // reset to the first page when searching
      this.fetchBugs();
    }, 300),

    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        await this.fetchBugs(page);
      }
    },
    setItemsPerPage(items) {
      this.itemsPerPage = items;
      this.currentPage = 1; // reset to the first page when items per page changes
      this.fetchBugs();
    },

    async sendReportBug(data) {
      try {
        const result = await service.upload("/report-bug", data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Báo lỗi thành công!!",
            "Success"
          );
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
