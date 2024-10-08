import { defineStore } from "pinia";
import { service } from "@/service/baseService";
import { useNotificationStore } from "./notification";

export const usePlayListFilmStore = defineStore("playlist", {
  state: () => ({
    playlistFilm: [],
    name: "",
    notification: useNotificationStore(),
  }),

  getters: {},
  actions: {
    async getFilmOfAPlaylist(playListId) {
      const result = await service.get(`/playlists/${playListId}`);
      if (result.status == 200) {
        console.log("filoF a playlist:", result.data);
        this.playlistFilm = result.data.movies;
        this.name = result.data.playlist_name;
      }
    },

    async addNewFilmToPlaylist(category_id, movieId) {
      try {
        const result = await service.post(`/movies/${movieId}/playlist`, {
          category_id,
        });
        if (result.status == 201) {
          this.notification.show(
            "",
            "success",
            "Thêm phim vào playlist thành công!!",
            "Success"
          );
          this.playlistFilm = result.data.movies;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
