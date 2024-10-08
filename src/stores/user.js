import router from "@/router";
import { service } from "@/service/baseService";
import { REFRESHTOKEN, TOKEN } from "@/utils/config";
import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { useNotificationStore } from "./notification";
import { debounce } from "lodash";

// import { TOKEN } from "@/utils/config";
export const useUserStore = defineStore("user", {
  state: () => ({
    userLogin: "",
    userInformation: {
      role: "NO",
    },

    userList: [],
    newuserlist: [],
    responseRegister: null,

    chechOutResult: null,

    updateSuccess: true,

    userCheckoutList: null,

    userUpdate: {},
    userUpdateResult: true,
    searchQuery: "",
    playlist: [],
    currentPage: null,
    itemsPerPage: null,
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async register(data) {
      try {
        // const result = await service.post(`/user`,data)
        const result = await service.post(`/auth/register`, data);

        if (result?.status === 201) {
          router.push({ path: "/login" });
        }
        // if (result?.status === 409) {
        //   alert("email đã tồn tại");
        // }
        if (result?.status === 400) {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          this.notification.show("", "error", "Fail !", "Error");
        } else {
          this.notification.show("", "error", "Fail !", "Error");
          console.log(error);
        }
      }
    },

    async login(data) {
      try {
        const result = await service.post(`/auth/login`, data);
        if (result?.status === 201) {
          this.userLogin = true;
          Cookies.set(TOKEN, result.data.access_token);
          Cookies.set(REFRESHTOKEN, result.data.refresh_token);
          router.push({ path: "/", name: "home" });
        } else {
          console.log("data", result.data);
        }
      } catch (error) {
        console.log("erre", error.response.data.message.message[0]);

        this.userLogin = false;
        this.notification.show(
          "",
          "error",
          "Lỗi !",
          "Mật khẩu cần dài hơn 6 ký tự"
        );
      }
    },

    async forgetPassword(data) {
      try {
        const result = await service.post(`/auth/request-password-reset`, data);
        if (result?.status === 201) {
          console.log(result.data);
          this.notification.show(
            "",
            "success",
            "Thành công !",
            "Hãy kiểm tra email của bạn để lấy lại mật khẩu"
          );
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },

    async getUserInformation() {
      try {
        const result = await service.get(`/users/get/me`);
        if (result?.status === 200) {
          this.userInformation = { ...result.data };
        }
      } catch (error) {
        console.log(error);
        this.userInformation = false;
      }
    },
    async getUserPLaylist() {
      try {
        const result = await service.get(`/users/playlists`);
        if (result?.status === 200) {
          this.playlist = { ...result.data };
          console.log("playlists");
        }
      } catch (error) {
        console.log(error);
        this.playlist = false;
      }
    },
    async deleteUserPLaylist(id) {
      try {
        const result = await service.delete(`/playlists/${id}`);
        if (result?.status === 200) {
          this.notification.show(
            "",
            "success",
            "Xóa playlist thành công !",
            "Success"
          );
          this.getUserPLaylist();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
        this.playlist = false;
      }
    },

    async logout() {
      Cookies.remove(TOKEN);
      Cookies.remove(REFRESHTOKEN);
      this.userInformation = null;
      this.responseRegister = null;
      this.userLogin = "";
      service.defaults.headers["Authorization"] = "";

      await this.getUserInformation();
    },

    async updateUser(id, data) {
      try {
        const result = await service.put(`/users/admin/users/${id}`, data);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Update User success !",
            "Sucess"
          );
          this.updateSuccess = result.data;
        } else {
          this.updateSuccess = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async enableDisableUser(id, data) {
      try {
        const result = await service.put(`/users/admin/users/${id}`, data);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Update User success !",
            "Sucess"
          );
          this.updateSuccess = result.data;
        } else {
          this.updateSuccess = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getListUser() {
      try {
        const result = await service.get("/users/get-all");
        if (result.status === 200) {
          this.userList = result?.data;

          this.newuserlist = result?.data.reverse().slice(0, 10);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(id) {
      try {
        const result = await service.delete(`/users/admin/users/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete user success !",
            "Sucess"
          );
          // await this.getListUser();
          this.fetchUser();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async getUserById(id) {
      try {
        const result = await service.get(`/users/${id}`);
        if (result.status === 200) {
          this.userUpdate = result.data;
          console.log(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async uploadAvatar(data) {
      try {
        const result = await service.upload(`/users/avatar`, data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          return this.getUserInformation();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async userUpdateUserName(data) {
      try {
        const result = await service.patch("/users/username", data);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Update User success !",
            "Sucess"
          );
          return this.getUserInformation();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async userUpdateEmail(data) {
      try {
        const result = await service.patch("/users/email", data);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Update user success !",
            "Sucess"
          );
          return this.getUserInformation();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async userUpdateBio(data) {
      try {
        const result = await service.patch("/users/bio", data);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Update User success !",
            "Sucess"
          );
          return this.getUserInformation();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async userUpdatePassword(data) {
      try {
        const result = await service.patch("/users/password", data);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Update user success !",
            "Sucess"
          );
          return this.getUserInformation();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createNewPlaylist(data) {
      try {
        const result = await service.post("/users/playlists", data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Tạo playlist mới thành công !",
            "Thành công"
          );
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (e) {
        console.log(e);
      }
    },

    async fetchUser(page = 1) {
      this.loading = true;
      try {
        const response = await service.get("/users/admin/users/search", {
          page,
          item_per_page: this.itemsPerPage,
          search: this.searchQuery,
        });
        this.userList = response.data.user;
        this.currentPage = 1;
        this.itemsPerPage = 12;
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        this.loading = false;
      }
    },

    setSearchQuery: debounce(function (query) {
      this.searchQuery = query;
      this.currentPage = 1; // reset to the first page when searching
      this.fetchUser();
    }, 300),

    async searchUsers(query) {
      this.setSearchQuery(query);
    },
  },
});
