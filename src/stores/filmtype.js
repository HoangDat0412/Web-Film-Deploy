import axios from "axios";
import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";
// import { TOKEN } from "@/utils/config";
export const useFilmTypeStore = defineStore("filmtype", {
  state: () => ({
    filmtype: [],
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async setListFilm() {
      const result = await axios({
        method: "GET",
        url: "http://localhost:4000/api/v1/films/film",
      });
      this.listFilm = result.data;
    },
  },
});
