import { service } from "@/service/baseService";
import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";
// import { TOKEN } from "@/utils/config";
export const useFavouriteFilmStore = defineStore("favouritefilm", {
  state: () => ({
    listFavouriteFilm: [],
    checkFilmIsFavourite: false,
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async getFavouriteFilm() {
      try {
        const result = await service.get("/favouriteFilm");
        if (result.status === 200) {
          this.listFavouriteFilm = result?.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createAndDeleteFavouriteFilm(data) {
      try {
        const result = await service.post(`/favouriteFilm`, data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          console.log("set check films is favourite true");
          this.checkFilmIsFavourite = true;
        }
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Actor success !",
            "Sucess"
          );
          console.log("set check films is favourite false");
          this.checkFilmIsFavourite = false;
          await this.getFavouriteFilm();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checkFilmFavourite(id) {
      let flag = false;
      this.listFavouriteFilm?.map((item) => {
        if (item?.id == id) {
          flag = true;
        }
      });
      this.checkFilmIsFavourite = flag;
    },
  },
});
