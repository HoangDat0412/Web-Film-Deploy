import { service } from "@/service/baseService";
import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";
import { debounce } from "lodash";
export const useFilmStore = defineStore("film", {
  state: () => ({
    listFilmPoster: [],
    listFilmSingle: [],
    listFilmSeries: [],

    topViewMonth: [],
    filmDetail: null,
    filmWatching: null,
    listFilmAdmin: [],
    listFilmSearch: [],
    listFilmSearchHeader: [],

    filmSearch: [],
    pagination: 0,
    deleteResult: true,
    updateResult: true,
    createResult: true,
    loading: false,
    searchKey: "",
    totalView: 0,
    src: "",
    listYear: [],
    listFilmType: [],
    listCountry: [],
    createFilmStatus: false,

    totalMovies: 0,
    totalPages: 0,
    currentPage: 1,

    searchQuery: "",
    searchYearQuery: "",
    searchGenreQuery: "",
    searchCountryQuery: "",

    itemsPerPage: 10,
    notification: useNotificationStore(),
  }),
  getters: {
    getListFilmSearch(state) {
      return state.listFilmSearch;
    },
  },
  actions: {
    // async setHomeLayoutInfomation() {
    //   try {
    //     const result = await service.get(`/film/listinfo`);
    //      if (result.status === 200) {
    // this.notification.show(
    //   "",
    //   "success",
    //   "Delete Actor success !",
    //   "Sucess"
    // );
    //       this.listCountry = result.data.listCountry.reverse();
    //       this.listFilmType = result.data.listFilmType;
    //       this.listYear = result.data.listYears.slice(0, 18);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async setListFilm() {
      try {
        const result = await service.get(`/movies`);
        if (result.status === 200) {
          this.listFilmPoster = result.data;
          let totalView = 0;
          result?.data?.map((item) => {
            totalView += item.views;
          });
          this.totalView = totalView;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setListFilmType() {
      try {
        const result = await service.get(`/genre`);

        if (result.status === 200) {
          this.listFilmType = result.data.items;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setListFilmYear() {
      try {
        const result = await service.get(`/movies/years/list`);

        if (result.status === 200) {
          this.listYear = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setListFilmCountry() {
      try {
        const result = await service.get(`/movies/countrie/countries`);

        if (result.status === 200) {
          this.listCountry = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setListFilmSingle(itemPerPage) {
      try {
        // const result = await service.get(`/film/newfilm`)
        const result = await service.get(
          `/movies/search?page=1&item_per_page=${itemPerPage}&type=single`
        );

        if (result.status === 200) {
          this.listFilmSingle = result.data.movies;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setListFilmPoster(itemPerPage) {
      try {
        // const result = await service.get(`/film/newfilm`)
        const result = await service.get(
          `/movies/search?page=1&item_per_page=${itemPerPage}`
        );

        if (result.status === 200) {
          this.listFilmPoster = result.data.movies;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setListFilmSeries(itemPerPage) {
      try {
        // const result = await service.get(`/film/newfilm`)
        const result = await service.get(
          `/movies/search?page=1&item_per_page=${itemPerPage}&type=series`
        );

        if (result.status === 200) {
          this.listFilmSeries = result.data.movies;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setFilmDetail(id) {
      try {
        const result = await service.get(`/movies/${id}`);
        if (result.status === 200) {
          this.filmDetail = result.data;
          console.log("detail:", this.filmDetail);

          await service.get(`/movies/view/${id}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setFilmWatching(id) {
      try {
        const result = await service.get(`/film/watching/${id}`);
        if (result.status === 200) {
          this.filmWatching = result.data;
          this.src = result.data?.src2;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFilm(id) {
      try {
        const result = await service.delete(`/movies/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete film success !",
            "Sucess"
          );
          this.fetchMovies();
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async createFilm(data) {
      try {
        const result = await service.post("/movies", data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          return result.data.moive_id;
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        this.notification.show("", "error", "Fail !", "Error");
        console.log(error);
      }
    },
    async updateFilm(id, data) {
      try {
        const result = await service.put(`/movies/${id}`, data);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Update Film success !",
            "Sucess"
          );
        }
      } catch (error) {
        console.log("Update false");
      }
    },
    async createActor(data) {
      try {
        const result = await service.post("/actor", data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          await this.setFilmDetail(data.filmId);
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async deleteActor(filmId, id) {
      try {
        const result = await service.delete(`/actor/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Actor success !",
            "Sucess"
          );
          await this.setFilmDetail(filmId);
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async createFilmType(data) {
      try {
        const result = await service.post("/filmtype", data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          await this.setFilmDetail(data.filmId);
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async deleteFilmType(filmId, id) {
      try {
        const result = await service.delete(`/filmtype/${id}`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Filmtype success !",
            "Sucess"
          );
          await this.setFilmDetail(filmId);
        } else {
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async uploadFilm(id, data) {
      try {
        this.loading = true;
        const result = await service.upload(`/film/uploadfilm/${id}`, data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          this.setFilmDetail(id);
          this.loading = false;
        } else {
          this.loading = false;
          this.notification.show("", "error", "Fail !", "Error");
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.notification.show("", "error", "Fail !", "Error");
      }
    },
    async addView(id) {
      try {
        await service.get(`/film/view/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    async searchFilm(params) {
      try {
        const result = await service.get(`/movies/search`, params);

        if (result.status === 200) {
          this.listFilmSearch = result.data.movies;
          this.totalMovies = result.data.totalMovies;
          this.totalPages = result.data.totalPages;
          this.currentPage = result.data.currentPage;
          if (result.data.totalMovies === 0) {
            this.listFilmSearch = [];
          }
        }
      } catch (error) {
        this.listFilmSearch = [];
        console.log(error);
      }
    },
    async fetchFilmHeader(page = 1) {
      try {
        const response = await service.get("/movies/filter/search", {
          page,
          pageSize: 10,
          search_query: this.searchQuery,
          movie_country: this.searchCountryQuery,
          year: this.searchYearQuery,
          movie_genre: this.searchGenreQuery,
        });

        this.listFilmSearchHeader = response.data.movies;
        this.totalMovies = response.data.pagination.totalCount;
        this.totalPages = response.data.pagination.totalPages;
        this.currentPage = response.data.pagination.page;

        console.log("film header", this.listFilmSearchHeader);
        console.log("filmsearch", this.listFilmSearch);
        if (response.data.totalMovies === 0) {
          this.listFilmSearchHeader = [];
        }
      } catch (error) {
        this.listFilmSearchHeader = [];
        console.log(error);
      }
    },
    async searchFilmHeader(data, page = 1) {
      this.searchCountryQuery = data.movie_country || "";
      this.searchYearQuery = data.year || "";
      this.searchQuery = data.search_query || "";
      this.searchGenreQuery = data.movie_genre || "";

      await this.fetchFilmHeader(page);
    },

    async searchFilmAdmin(data) {
      try {
        const result = await service.get(
          `/movies/search?page=${data.pag}&item_per_page=${data.itemPerPage}&search=${data.name}`
        );
        if (result.status === 200) {
          this.listFilmAdmin = result.data;
          this.totalPages = result.data.totalPages;
        }
      } catch (error) {
        this.listFilmAdmin = [];
        console.log(error);
      }
    },
    async fetchMovies(page = 1) {
      this.loading = true;
      try {
        const response = await service.get("/movies/search", {
          page,
          item_per_page: this.itemsPerPage,
          search: this.searchQuery,
        });
        this.listFilmAdmin = response.data.movies;
        this.totalMovies = response.data.totalMovies;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchMoviesFilter(page = 1) {
      this.loading = true;
      try {
        const response = await service.get("/movies/filter/search", {
          page,
          pageSize: 18,
          search_query: this.searchQuery,
          movie_country: this.searchCountryQuery,
          year: this.searchYearQuery,
          movie_genre: this.searchGenreQuery,
        });

        this.listFilmSearch = response.data.movies;
        this.totalMovies = response.data.pagination.totalCount;
        this.totalPages = response.data.pagination.totalPages;
        this.currentPage = response.data.pagination.page;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
    async searchMoviesFilter(data, page) {
      this.searchCountryQuery = data.movie_country || "";
      this.searchYearQuery = data.year || "";
      this.searchQuery = data.search_query || "";
      this.searchGenreQuery = data.movie_genre || "";

      await this.fetchMoviesFilter(page);
    },

    async fetchMoviesRanking(page = 1) {
      this.loading = true;
      try {
        const response = await service.get("/movies/filter/mostview", {
          page,
          limit: 18,
          search: this.searchQuery,
          country: this.searchCountryQuery,
          year: this.searchYearQuery,
          genre: this.searchGenreQuery,
        });

        this.listFilmSearch = response.data.data;
        this.totalMovies = response.data.total;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.page;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
    async searchMoviesRanking(data, page) {
      this.searchCountryQuery = data.movie_country || "";
      this.searchYearQuery = data.year || "";
      this.searchQuery = data.search_query || "";
      this.searchGenreQuery = data.movie_genre || "";

      await this.fetchMoviesRanking(page);
    },

    async fetchMoviesToprate(page = 1) {
      this.loading = true;
      try {
        const response = await service.get("/movies/ranking/search", {
          page,
          limit: 18,
          search: this.searchQuery,
          ountry: this.searchCountryQuery,
          year: this.searchYearQuery,
          enre: this.searchGenreQuery,
        });

        this.listFilmSearch = response.data.data;
        this.totalMovies = response.data.total;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.page;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
    async searchMoviesToprate(data, page) {
      this.searchCountryQuery = data.movie_country || "";
      this.searchYearQuery = data.year || "";
      this.searchQuery = data.search_query || "";
      this.searchGenreQuery = data.movie_genre || "";

      await this.fetchMoviesToprate(page);
    },

    setSearchQuery: debounce(function (query) {
      this.searchQuery = query;
      this.currentPage = 1; // reset to the first page when searching
      this.fetchMovies();
    }, 300),

    async searchMovies(query) {
      this.setSearchQuery(query);
    },
    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        await this.fetchMovies(page);
      }
    },
    async goToPageFilter(page) {
      if (page >= 1 && page <= this.totalPages) {
        await this.fetchMoviesFilter(page);
      }
    },
    async searchFilmCountry(data) {
      const transformedName = decodeURIComponent(data.name)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/\s+/g, "-");

      try {
        const result = await service.get(
          `/movies/filter-by-country/${transformedName}?page=${data.pag}&item_per_page=18`
        );

        if (result.status === 200) {
          this.listFilmSearch = result.data;
          this.totalPages = result.data.totalPages;
        }
      } catch (error) {
        this.listFilmSearch = [];
        console.log(error);
      }
    },

    async searchFilmType(data) {
      const transformedName = decodeURIComponent(data.name)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/\s+/g, "-");

      try {
        const result = await service.get(
          `/movies/genre/${transformedName}?page=${data.pag}&item_per_page=${data.itemPerPage}`
        );

        if (result.status === 200) {
          this.listFilmSearch = result.data;
          this.totalPages = result.data.totalPages;
        }
      } catch (error) {
        this.listFilmSearch = [];
        console.log(error);
      }
    },
    async searchFilmYear(data) {
      try {
        const result = await service.get(
          `/movies/year/${data.name}?page=${data.pag}&item_per_page=18`
        );

        if (result.status === 200) {
          this.listFilmSearch = result.data;
          this.totalPages = result.data.totalPages;
        }
      } catch (error) {
        this.listFilmSearch = [];
        console.log(error);
      }
    },
    async setListSearch(number) {
      console.log(this.listFilmSearch.slice(number * 5, 5));
      this.listFilmSearch = this.listFilmSearch.slice(number * 5, 5);
    },
    async getTopFilmView() {
      try {
        const result = await service.get("/movies/top-of-month");
        if (result.status === 200) {
          this.topViewMonth = result.data.movies;
        }
      } catch (error) {
        console.log(error);
      }
    },

    setSearchKey(type) {
      this.searchKey = type;
    },
    handleChangeServer(server) {
      if (server === 1) {
        this.src = this.filmWatching?.src2;
      } else {
        this.src = this.filmWatching?.srcurl;
      }
    },
  },
});
