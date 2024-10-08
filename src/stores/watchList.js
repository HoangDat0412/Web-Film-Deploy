import { defineStore } from "pinia";
import { service } from "@/service/baseService";
import { useNotificationStore } from "./notification";

export const useWatchListStore = defineStore("watchlist", {
  state: () => ({
    movies: "",
    isInWatchlist: null,
    notification: useNotificationStore(),
  }),

  getters: {},
  actions: {
    async getFilm() {
      const result = await service.get(`/watchlist`);
      if (result.status === 200) {
        this.movies = result.data;
      }
    },
    async getIsInWatchlist(id) {
      try {
        const result = await service.get(`/watchlist/check/${id}`);
        if (result.status === 200) {
          this.isInWatchlist = result.data.isInWatchlist;
        } else {
          console.log();
        }
      } catch (e) {
        console.log(e);
      }
    },

    async addNewFilmToWatchlist(movieId) {
      try {
        const result = await service.get(`/watchlist/${movieId}`);
        if (result.status === 200) {
          this.getIsInWatchlist(movieId);
          const message = this.isInWatchlist
            ? "Xóa phim khỏi watchlist thành công!!!"
            : "Thêm phim vào watchlist thành công!!!";
          this.notification.show("", "success", message, "Thành công");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
