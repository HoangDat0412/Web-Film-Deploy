import { defineStore } from "pinia";

import { service } from "@/service/baseService";
import { useNotificationStore } from "./notification";

export const useAdminDashboardStore = defineStore("dashboard", {
  state: () => ({
    totalFilms: 0,
    filmsThisWeek: 0,
    totalActivatedUsers: 0,
    usersThisWeek: 0,
    totalRates: 0,
    ratesThisWeek: 0,
    totalReportBugs: 0,
    bugsThisWeek: 0,
    totalBlogs: 0,
    blogsThisWeek: 0,
    totalActors: 0,
    actorsThisWeek: 0,
    totalFilmTypes: 0,
    filmTypesThisWeek: 0,
    totalCountries: 0,
    countriesThisWeek: 0,
    filmsThisDay: 0,
    notification: useNotificationStore(),
  }),
  getters: {},
  actions: {
    async getStaticDashboard() {
      try {
        const result = await service.get("/users/dashboard/static");
        if (result.status === 200) {
          this.filmsThisDay = result.data.filmsThisDay;
          this.totalFilms = result.data.totalFilms;
          this.filmsThisWeek = result.data.filmsThisWeek;
          this.totalActivatedUsers = result.data.totalActivatedUsers;
          this.usersThisWeek = result.data.usersThisWeek;
          this.totalRates = result.data.totalRates;
          this.ratesThisWeek = result.data.ratesThisWeek;
          this.totalReportBugs = result.data.totalReportBugs;
          this.bugsThisWeek = result.data.bugsThisWeek;
          this.totalBlogs = result.data.totalBlogs;
          this.blogsThisWeek = result.data.blogsThisWeek;
          this.totalActors = result.data.totalActors;
          this.actorsThisWeek = result.data.actorsThisWeek;
          this.totalFilmTypes = result.data.totalFilmTypes;
          this.filmTypesThisWeek = result.data.filmTypesThisWeek;
          this.totalCountries = result.data.totalCountries;
          this.countriesThisWeek = result.data.countriesThisWeek;
        } else {
          this.notification.show(
            "",
            "error",
            "get static Dashboard Fail !",
            "Fail"
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
