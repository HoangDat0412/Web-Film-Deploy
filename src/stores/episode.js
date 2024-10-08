// stores/episode.js
import { service } from "@/service/baseService";
import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";

export const useEpisodeStore = defineStore("episode", {
  state: () => ({
    episodes: [],
    notification: useNotificationStore(),
  }),
  actions: {
    async getAllEpisodes(id) {
      const result = await service.get(`/movies/episode/${id}`);
      if (result.status === 200) {
        this.episodes = result.data;
        return this.episodes;
      }
    },
    async createEpisode(id, episode) {
      const result = await service.post(`/movies/episode/${id}`, episode);
      if (result.status === 201) {
        this.notification.show(
          "",
          "success",
          "Add new Actor success !",
          "Sucess"
        );
        this.episodes.push(result.data);
      }
    },
    async deleteEpisode(id) {
      const result = await service.delete(`/movies/episode/${id}`);
      if (result.status === 200) {
        this.notification.show("", "success", "Delete  success !", "Sucess");
        this.episodes = this.episodes.filter((ep) => ep.episode_id !== id);
      }
    },
  },
});
