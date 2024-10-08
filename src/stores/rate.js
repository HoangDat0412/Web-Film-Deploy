import { service } from "@/service/baseService";
import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";
// import { TOKEN } from "@/utils/config";
export const useRateStore = defineStore("rate", {
  state: () => ({
    totalPoint: 0,
    yourPoint: 0,
    numberRate: 0,
    didIRate: null,
    rates: [],
    movieId: null,
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async getRates(id) {
      try {
        const result = await service.get(`/movies/${id}/rating`);
        if (result.status === 200) {
          this.totalPoint = result.data.averageScore;
          this.rates = result.data.ratings;
          this.movieId = id;
          return this.totalPoint;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setRate(data) {
      try {
        console.log("data", data);
        const result = await service.post(`/movies/${data.filmId}/rate`, data);
        console.log(result);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          await this.getRates(data.filmId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async likeOrUnlike(ratingId) {
      try {
        const result = await service.post(`rating/like/${ratingId}`);
        if (result.status === 201) {
          // this.notification.show(
          //   "",
          //   "success",
          //   "Add new Actor success !",
          //   "Sucess"
          // );
          console.log("like or unlike successfully");
          this.getRates(this.movieId);
        } else {
          console.log("like or unlike unsuccessfully");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async dislikeOrUndislike(ratingId) {
      try {
        const result = await service.post(`rating/dislike/${ratingId}`);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          console.log("dislike or undislike successfully");
          this.getRates(this.movieId);
        } else {
          console.log("dislike or undislike unsuccessfully");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getYourRating(movieId) {
      try {
        const result = await service.get(`/movies/${movieId}/user-rate`);
        console.log("user rate", result);
        if (result.status === 200) {
          if (result.data === "") {
            this.didIRate = false;
          } else {
            this.didIRate = true;
            this.yourPoint = result.data.score;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
