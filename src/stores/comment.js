import { service } from "@/service/baseService";
import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";
// import { TOKEN } from "@/utils/config";
export const useCommentStore = defineStore("comment", {
  state: () => ({
    listComment: [],
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async createComment(data) {
      try {
        const result = await service.post("/comment", data);

        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          await this.getAllComment(data.filmId);
        } else {
          alert("Lỗi comment");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAllComment(id) {
      try {
        const result = await service.get(`/comment/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Actor success !",
            "Sucess"
          );
          this.listComment = result?.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
