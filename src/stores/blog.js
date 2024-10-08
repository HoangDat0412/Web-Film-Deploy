import { defineStore } from "pinia";
import { service } from "@/service/baseService";
import debounce from "lodash/debounce"; // Import debounce if needed
import { useNotificationStore } from "./notification";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    created_at: null,
    timeToRead: null,
    thumb_url: "",
    author_id: "",
    author_name: "",
    author_avatar: "",
    image_url: "",
    content: "",
    title: "",
    blogs: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: "",
    loading: false,
    error: null,
    totalPages: 0,
    totalBlogs: 0,
    is_verify: null,
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async fetchBlog(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.get("/blog", {
          // page: this.currentPage,
          // limit: this.itemsPerPage,
          searchTerm: this.searchQuery,
        });
        console.log("ressult blog", response.data);
        this.blogs = response.data.data;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.page;
        this.itemsPerPage = response.data.limit;
      } catch (err) {
        this.error =
          err.message || "An error occurred while fetching directors.";
      } finally {
        this.loading = false;
      }
    },
    async fetchBlogAdmin(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.get("/blog/admin/getall", {
          //page: this.currentPage,
          // limit: this.itemsPerPage,
          searchTerm: this.searchQuery,
        });
        console.log("ressult blog", response.data);
        this.blogs = response.data.data;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.page;
        this.itemsPerPage = response.data.limit;
        this.totalBlogs = response.data.totalCount;
      } catch (err) {
        this.error =
          err.message || "An error occurred while fetching directors.";
      } finally {
        this.loading = false;
      }
    },

    async getBlogDetail(id) {
      try {
        const result = await service.get(`/blog/${id}`);
        if (result.status === 200) {
          this.created_at = result.data.created_at;
          this.author_avatar = result.data.user.avatar_url;
          this.author_name = result.data.user.username;
          this.title = result.data.title;
          this.content = result.data.content;
          this.image_url = result.data.image_url;
          console.log(result);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async deleteBlog(id) {
      try {
        const result = await service.delete(`/blog/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete  blog success !",
            "Success"
          );

          await this.fetchBlogAdmin();
        } else {
          this.notification.show("", "error", "Delete blog fail !", "Fail");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Delete blog fail !", "Fail");
      }
    },
    async searchBlog(query) {
      this.setSearchQuery(query);
      await this.fetchBlogAdmin(1);
    },

    setSearchQuery: debounce(function (query) {
      this.searchQuery = query;
      this.currentPage = 1; // reset to the first page when searching
      this.fetchBlogAdmin();
    }, 300),

    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        await this.fetchBlogAdmin(page);
      }
    },
    setItemsPerPage(items) {
      this.itemsPerPage = items;
      this.currentPage = 1; // reset to the first page when items per page changes
      this.fetchBlogAdmin();
    },

    async createNewBlog(data) {
      try {
        const result = await service.upload("/blog", data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Gửi blog thành công!!. Vui lòng chờ blog được xét duyệt",
            "Success"
          );
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (e) {
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async verifyBlog(id) {
      try {
        const result = await service.patch(`/blog/${id}/verify`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Duyệt blog thành công!!",
            "Success"
          );
          this.fetchBlogAdmin();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async editBlog(id) {
      try {
        const result = await service.patch(`/blog/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Chỉnh sửa blog thành công!!",
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
