<script setup>
import { onMounted, ref, watchEffect } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "./home.scss";
import FilmItem from "@/components/FilmItem/FilmItem.vue";
import router from "@/router";
import { useFilmStore } from "@/stores/film";
import { useLoadingStore } from "@/stores/loading";
import topViewsidebar from "@/components/topViewsidebar/topViewsidebar.vue";
import HomeCarousel from "@/components/HomeCarousel/HomeCarousel.vue";
import { useAdminDashboardStore } from "@/stores/adminDashboard";

const adminDashboardStore = useAdminDashboardStore();

const film = useFilmStore();
const loading = useLoadingStore();

const breakpoints = {
  0: {
    itemsToShow: 3,
    snapAlign: "center",
  },
  700: {
    itemsToShow: 4,
    snapAlign: "center",
  },
  1000: {
    itemsToShow: 5,
    snapAlign: "center",
  },
};

const breakpoints2 = {
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },

  900: {
    itemsToShow: 3,
    snapAlign: "center",
  },
};
const search = ref("");

const handleSearch = async () => {
  router.push({ path: `/filter` });

  const data = {
    search_query: search.value,
    movie_country: "",
    year: "",
    movie_genre: "",
  };

  await film.searchMoviesFilter(data, 1);

  search.value = "";
};

watchEffect(async () => {
  loading.setLoading(true);

  await adminDashboardStore.getStaticDashboard();
  await film.setListFilmPoster(5);
  await film.setListFilmSeries(8);
  await film.setListFilmSingle(8);
  await film.searchFilmType({ itemPerPage: 8, name: "Tình Cảm", pag: 1 });

  await film.setListFilmYear();
  await film.getTopFilmView();

  loading.setLoading(false);

  console.log("film", film?.listFilmPoster);
});

const handleSearchYear = (year) => {
  const data = {
    year: year,
  };

  film.searchMoviesFilter(data);

  router.push({ path: `/filter` });
};

const handleViewAll = (params) => {
  const data = {
    year: year,
  };

  film.searchMoviesFilter(data);

  router.push({ path: `/filter` });
};

const activeTab = ref("Tháng");

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <main>
    <div class="row mt-4">
      <div class="col-12 banner mb-12">
        <div class="title">
          <h2 class="text-4xl font-bold" style="color: white">Search Engine</h2>
          <h3 class="text-xl font-semibold" style="color: white">
            Chúng tôi cung cấp search engine tìm kiếm link, thông tin, diễn
            viên, review... của hàng triệu bộ phim, TV Show để bạn khám phá.
          </h3>
          <div class="search-banner mt-6">
            <input
              type="text"
              autocorrect="off"
              autofill="off"
              autocomplete="off"
              spellcheck="false"
              placeholder="Tìm tên phim, diễn viên..."
              v-model="search"
              @keyup.enter="handleSearch"
            />

            <div @click="handleSearch" class="search-banner-btn">Tìm</div>
          </div>
        </div>
      </div>
      <h4 class="mb-10 text-2xl" style="color: rgb(255, 150, 88)">
        <span> Mới cập nhật</span>
      </h4>
      <div
        class="col-12"
        style="border-top: solid 1px rgba(255, 255, 255, 0.08)"
      >
        <Carousel
          :breakpoints="breakpoints2"
          :itemsToScroll="1"
          :snapAlign="start"
          :wrap-around="true"
        >
          <Slide
            v-for="(film, index) in film?.listFilmPoster?.slice(0, 10)"
            :key="index"
          >
            <div class="carousel__item" style="width: 90%; height: 280px">
              <FilmItem :film="film" :isPoster="true" />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination class="pagination-carusol" />
          </template>
        </Carousel>
      </div>
      <div
        class="col-12 col-md-9 mb-4"
        style="border-top: solid 1px rgba(255, 255, 255, 0.08)"
      >
        <h4
          class="mb-6 mt-8 text-2xl flex justify-between items-center"
          style="color: rgb(255, 150, 88)"
        >
          <span>Trending</span>
          <span class="text-sm view-all" @click="handleViewAll"
            >Xem tất cả >>
          </span>
        </h4>
        <Carousel
          :items-to-show="1.5"
          :breakpoints="breakpoints"
          :wrap-around="true"
          :listFilm="film?.listFilmSingle"
        >
          <Slide
            v-for="(film, index) in film?.listFilmSingle?.slice(0, 10)"
            :key="index"
          >
            <div class="carousel__item" style="width: 90%; height: 220px">
              <FilmItem :film="film" />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
        <!-- <HomeCarousel :listFilm="film?.listFilmSingle" /> -->
        <h4
          class="mb-6 mt-8 text-2xl flex justify-between items-center"
          style="color: rgb(255, 150, 88)"
        >
          <span> Phim lẻ mới cập nhật </span>
          <span class="text-sm view-all" @click="handleViewAll"
            >Xem tất cả >>
          </span>
        </h4>
        <Carousel
          :items-to-show="1.5"
          :breakpoints="breakpoints"
          :wrap-around="true"
        >
          <Slide
            v-for="(film, index) in film?.listFilmSingle?.slice(0, 10)"
            :key="index"
          >
            <div class="carousel__item" style="width: 90%; height: 220px">
              <FilmItem :film="film" />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>

        <h4
          class="mb-6 mt-8 text-2xl flex justify-between items-center"
          style="color: rgb(255, 150, 88)"
        >
          <span> Phim bộ mới cập nhật </span>
          <span class="text-sm view-all" @click="handleViewAll"
            >Xem tất cả >>
          </span>
        </h4>
        <Carousel
          :items-to-show="1.5"
          :breakpoints="breakpoints"
          :wrap-around="true"
        >
          <Slide
            v-for="(film, index) in film?.listFilmSeries?.slice(0, 10)"
            :key="index"
          >
            <div class="carousel__item" style="width: 90%; height: 220px">
              <FilmItem :film="film" />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
        <!-- <HomeCarousel filmList="listFilmSeries" action="setListFilmSeries" /> -->
        <h4
          class="mb-6 mt-8 text-2xl flex justify-between items-center"
          style="color: rgb(255, 150, 88)"
        >
          <span>Phim Tình cảm mới cập nhật</span>
          <span class="text-sm view-all" @click="handleViewAll"
            >Xem tất cả >></span
          >
        </h4>
        <Carousel
          :items-to-show="1.5"
          :breakpoints="breakpoints"
          :wrap-around="true"
        >
          <Slide
            v-for="(film, index) in film?.listFilmSearch?.movies?.slice(0, 10)"
            :key="index"
          >
            <div class="carousel__item" style="width: 90%; height: 220px">
              <FilmItem :film="film" />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>

      <div class="col-12 col-md-3 trending">
        <div class="grid grid-cols-2 pb-2">
          <div class="p-2">
            <p class="text-yellow-600 font-semibold mb-1">Cập nhật hôm nay</p>
            <div class="flex justify-center text-blue-200">
              <font-awesome-icon
                icon="fa-solid fa-film"
                class="mr-2 self-center"
              />{{ adminDashboardStore.filmsThisDay }} Phim
            </div>
          </div>
          <div class="p-2">
            <p class="justify-center flex text-yellow-600 font-semibold mb-1">
              Tổng
            </p>
            <div class="flex justify-center text-blue-200">
              <font-awesome-icon
                icon="fa-solid fa-film"
                class="mr-2 self-center"
              />{{ adminDashboardStore.totalFilms }} Phim
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h5 class="mb-2 mt-3" style="color: rgb(255, 150, 88)">
            Năm Phát Hành
          </h5>
          <div
            class="row custom-scrollbar"
            style="overflow-y: scroll; height: 300px; padding-left: 20px"
          >
            <button
              @click="() => handleSearchYear(i)"
              class="col-2 col-md-3 btn_year m-2"
              v-for="i in film?.listYear"
              :key="i"
            >
              {{ i }}
            </button>
          </div>
        </div>

        <div>
          <h5 class="mb-3 mt-4" style="color: rgb(255, 150, 88)">
            Lượt Xem Nhiều Nhất
          </h5>
          <nav class="grid grid-cols-3">
            <!-- <div class="flex justify-center items-center p-2">Tháng</div>
            <div class="flex justify-center items-center p-2">Tuần</div> -->
            <div
              :class="[
                'flex justify-center items-center p-2 cursor-pointer transition-colors duration-200',
                activeTab === 'Tháng'
                  ? 'bg-orange-900/20'
                  : 'hover:bg-gray-900',
              ]"
              @click="setActiveTab('Tháng')"
            >
              <span
                :class="[
                  'font-medium',
                  activeTab === 'Tháng' ? 'text-orange-400' : 'text-gray-400',
                ]"
                >Tháng</span
              >
            </div>
            <div
              :class="[
                'flex justify-center items-center p-2 cursor-pointer transition-colors duration-200',
                activeTab === 'Tuần' ? 'bg-orange-900/20' : 'hover:bg-gray-900',
              ]"
              @click="setActiveTab('Tuần')"
            >
              <span
                :class="[
                  'font-medium',
                  activeTab === 'Tuần' ? 'text-orange-400' : 'text-gray-400',
                ]"
                >Tuần</span
              >
            </div>
          </nav>

          <hr />
          <topViewsidebar :film="film" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
