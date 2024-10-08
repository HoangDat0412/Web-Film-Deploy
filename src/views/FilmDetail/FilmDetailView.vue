<script setup>
import { ref, watchEffect, watch, shallowRef, onBeforeUpdate } from "vue";
import { useFilmStore } from "@/stores/film";
import { useRateStore } from "@/stores/rate";
import { useRoute } from "vue-router";
import StarRating from "vue-star-rating";
import { useUserStore } from "@/stores/user";
import { useLoadingStore } from "@/stores/loading";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import FilmItem from "@/components/FilmItem/FilmItem.vue";
import topViewsidebar from "@/components/topViewsidebar/topViewsidebar.vue";
import { usePlayListFilmStore } from "@/stores/playListFilm";
import FacebookComment from "@/components/FacebookComment/FacebookComment.vue";
import ShareFilm from "@/components/ShareFilm/ShareFilm.vue";
import noImage from "@/assets/img/no-img.jpg";
import { useWatchListStore } from "@/stores/watchList";

const breakpoints = {
  0: {
    itemsToShow: 2.5,
    snapAlign: "center",
  },
  500: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  700: {
    itemsToShow: 4.5,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 5,
    snapAlign: "start",
  },
};
const bug = useBugStore();
const playListFilm = usePlayListFilmStore();
const film = useFilmStore();
const rate = useRateStore();
const user = useUserStore();

const route = useRoute();
const rating = ref(rate.totalPoint);
const loading = useLoadingStore();

import { useRequestFeatureStore } from "@/stores/requestFeature";
import { checkNull } from "@/validation/validation";

const requestFeature = useRequestFeatureStore();
const currentView = shallowRef(FacebookComment);

const bugDescription = ref("");
const bugName = ref("");
const bugImage = ref(null);
const bugImageUrl = ref("");
const bugNameError = ref("");
const bugDesError = ref("");
const bugImgError = ref("");

const requestFeatureDescription = ref("");
const requestFeatureName = ref("");
const requestFeatureImage = ref(null);
const requestFeatureImageUrl = ref("");
const requestFeatureNameError = ref("");
const requestFeatureDesError = ref("");
const requestFeatureImgError = ref("");

const handleToFilterView = (type) => {
  const data = {
    movie_genre: type,
  };

  film.searchMoviesFilter(data);
};

const handleBugImageChange = (e) => {
  bugImage.value = e.target.files[0];
  bugImageUrl.value = URL.createObjectURL(bugImage.value);
};

const handleRequestFeatureImageChange = (e) => {
  requestFeatureImage.value = e.target.files[0];
  requestFeatureImageUrl.value = URL.createObjectURL(requestFeatureImage.value);
};

const handleReportBug = async () => {
  const formData = new FormData();

  !checkNull(bugName.value)
    ? (bugNameError.value = "Tên lỗi không được bỏ trống")
    : (bugNameError.value = "");

  !checkNull(bugDescription.value)
    ? (bugDesError.value = "Mô tả lỗi không được bỏ trống")
    : (bugDesError.value = "");

  !checkNull(bugImageUrl.value)
    ? (bugImgError.value = "Ảnh không được bỏ trống")
    : (bugImgError.value = "");

  formData.append("title", bugName.value);
  formData.append("description", bugDescription.value);
  formData.append("file", bugImage.value);

  if (
    checkNull(bugName.value) &&
    checkNull(bugDescription.value) &&
    checkNull(bugImageUrl.value)
  ) {
    await bug.sendReportBug(formData);
  }
};

const handleRequestFeature = async () => {
  const formData = new FormData();

  !checkNull(requestFeatureName.value)
    ? (requestFeatureNameError.value = "Tên tính năng không được bỏ trống")
    : (requestFeatureNameError.value = "");

  !checkNull(requestFeatureDescription.value)
    ? (requestFeatureDesError.value = "Mô tả tính năng không được bỏ trống")
    : (requestFeatureDesError.value = "");

  !checkNull(requestFeatureImageUrl.value)
    ? (requestFeatureImgError.value = "Ảnh không được bỏ trống")
    : (requestFeatureImgError.value = "");

  formData.append("title", requestFeatureName.value);
  formData.append("description", requestFeatureDescription.value);
  formData.append("file", requestFeatureImage.value);

  if (
    checkNull(requestFeatureName.value) &&
    checkNull(requestFeatureDescription.value) &&
    checkNull(requestFeatureImageUrl.value)
  ) {
    await requestFeature.sendRequestFeature(formData);
  }
};

const handleAddFilmToPlaylist = (cate_id) => {
  playListFilm.addNewFilmToPlaylist(cate_id, route.params.id);
};

import { onMounted } from "vue";
import ReviewFilm from "@/components/ReviewFilm/ReviewFilm.vue";
import { useBugStore } from "@/stores/bug";
import { useNotificationStore } from "@/stores/notification";

const currentUrl = ref(window.location.href);

watch(route, () => {
  currentUrl.value = window.location.href;
  if (window.FB) {
    window.FB.XFBML.parse();
  }
});

onMounted(() => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
});

watchEffect(async () => {
  loading.setLoading(true);
  await film.setFilmDetail(route.params.id);
  // console.log("user:", user.userInformation);
  await user.getUserPLaylist();
  await rate.getRates(route.params.id);

  rating.value = rate.totalPoint;

  await rate.getYourRating(route.params.id);
  await film.getTopFilmView();
  await user.getUserInformation();
  await film.setListFilmPoster();
  await watchlistStore.getIsInWatchlist(route.params.id);

  loading.setLoading(false);
});

onBeforeUpdate(() => {
  rating.value = rate.totalPoint;
});

onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: "hover", // Ensures tooltip shows only on hover
    });
  });
});

const newPlaylistName = ref("");

const handleNewPlaylist = async () => {
  await user.createNewPlaylist({
    name: newPlaylistName.value,
  });

  await user.getUserPLaylist();
};
const notification = useNotificationStore();

const watchlistStore = useWatchListStore();

const handleAddFilmToWatchList = async () => {
  if (
    user.userInformation.role !== `NO` &&
    user.userInformation.role !== undefined
  ) {
    await watchlistStore.addNewFilmToWatchlist(route.params.id);
  } else {
    notification.show("", "warn", "Bạn chưa đắng nhập !", "Lỗi");
  }
};
</script>

<template>
  <main>
    <div class="row p-lg-4">
      <div
        class="col-12 pb-5 pt-5 row detail-container pr-12"
        :style="{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) calc((50vw - 170px) - 360px), rgba(31.5, 31.5, 52.5, 0.84) 50%, rgba(31.5, 31.5, 52.5, 0.84) 100%), url(${film?.filmDetail?.poster_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <div class="col-12 col-sm-3 mb-5 mb-sm-0 filmdetail_wrap">
          <div class="banner_filmdetail h-full">
            <main style="height: 100%">
              <div class="film_item">
                <div
                  class="myui-vodlist__thumb"
                  :style="{
                    background: 'url(' + film?.filmDetail?.thumb_url + ')',
                  }"
                >
                  <span class="play hidden-xs"></span>
                  <span class="pic-tag pic-tag-top"> Full HD </span>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div class="col-12 col-sm-9 pl-8">
          <h3 style="color: #ff9658" class="mb-8 text-3xl">
            {{ film.filmDetail?.name }}
            <span>({{ film.filmDetail?.year }})</span>
          </h3>
          <p>
            Thể loại :
            <RouterLink
              class="me-3 cate"
              v-for="(i, index) in film.filmDetail?.movie_genres"
              :key="index"
              @click="handleToFilterView(i.genre.genre_id)"
              :to="'/filter'"
              >{{ i?.genre.name }}
            </RouterLink>
          </p>
          <p>Trạng thái : {{ film.filmDetail?.episode_current }}</p>

          <p>Thời lượng : {{ film.filmDetail?.duration }}</p>
          <p>
            Đạo diễn :
            <span v-if="film.filmDetail?.movie_directors[0]?.director?.name">
              <span
                class="me-1"
                v-for="(i, key) in film.filmDetail?.movie_directors.slice(
                  0,
                  film.filmDetail?.movie_directors.length - 2
                )"
                :key="key"
                >{{ i?.actor.name }},</span
              >
              <span class="me-1">{{
                film.filmDetail?.movie_directors[
                  film.filmDetail?.movie_directors.length - 1
                ].director.name
              }}</span>
            </span>
          </p>
          <p>
            Diễn viên :
            <span v-if="film.filmDetail?.movie_actors[0]?.actor?.name">
              <span
                class="me-1"
                v-for="(i, key) in film.filmDetail?.movie_actors.slice(
                  0,
                  film.filmDetail?.movie_actors.length - 2
                )"
                :key="key"
                >{{ i?.actor.name }},</span
              >
              <span class="me-1">{{
                film.filmDetail?.movie_actors[
                  film.filmDetail?.movie_actors.length - 1
                ].actor.name
              }}</span>
            </span>
            <span v-else class="me-1">N/A</span>
          </p>
          <p>Lượt xem : {{ film.filmDetail?.view }}</p>
          <div class="flex">
            <div
              class="dropdown"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Thêm phim vào list của bạn"
            >
              <button
                class="btn bg-blue-900 rounded-full h-10 w-10 mr-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <font-awesome-icon
                  style="font-size: 1rem; color: white"
                  icon="fa-solid fa-list"
                />
              </button>

              <ul
                class="dropdown-menu dropdown-menu-dark"
                v-if="
                  user.userInformation.role !== `NO` &&
                  user.userInformation.role !== undefined
                "
              >
                <li>
                  <span class="dropdown-header" style="font-size: 1rem"
                    >Lưu phim vào...</span
                  >
                </li>
                <li v-for="(item, index) in user?.playlist" :key="index">
                  <a
                    class="dropdown-item"
                    @click="handleAddFilmToPlaylist(item?.category_id)"
                    >{{ item?.name }}</a
                  >
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    + Tạo PlayList Mới
                  </button>
                </li>
              </ul>
              <ul class="dropdown-menu dropdown-menu-dark" v-else>
                <li>
                  <a class="dropdown-item" href="/login"
                    >Đăng nhập để lưu list phim</a
                  >
                </li>
              </ul>
            </div>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              ref="modalRef"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title"
                      id="exampleModalLabel"
                      style="color: black"
                    >
                      Tạo playlist mới
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label
                        for="playlist-name"
                        class="col-form-label"
                        style="color: black"
                        >Tên:</label
                      >
                      <input
                        v-model="newPlaylistName"
                        type="text"
                        class="form-control"
                        id="playlist-name"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn-modal btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn-modal btn-primary"
                      @click="handleNewPlaylist"
                      data-bs-dismiss="modal"
                    >
                      Tạo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="btn bg-blue-900 rounded-full h-10 w-10 mr-4"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Thêm vào watchlist"
              @click="handleAddFilmToWatchList"
            >
              <font-awesome-icon
                style="font-size: 0.7rem"
                :style="{
                  color: watchlistStore.isInWatchlist ? '#ff9658' : 'white',
                }"
                :icon="['fas', 'bookmark']"
              />
            </button>
            <div
              class="dropdown"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Chia sẻ"
            >
              <button
                class="btn bg-blue-900 rounded-full h-10 w-10 mr-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="padding: 0.375rem 0.85rem"
              >
                <font-awesome-icon
                  style="font-size: 0.7rem; color: white"
                  :icon="['fas', 'share']"
                  class="flex items-center justify-center"
                />
              </button>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li>
                  <div
                    class="dropdown-item"
                    style="font-size: 1rem; color: white"
                  >
                    <ShareFilm
                      url="https://www.google.com/"
                      network="facebook"
                      color="#1877f2"
                    />
                  </div>
                  <div
                    class="dropdown-item"
                    style="font-size: 1rem; color: white"
                  >
                    <ShareFilm
                      url="https://www.google.com/"
                      network="twitter"
                      color="#1da1f2"
                    />
                  </div>
                  <div
                    class="dropdown-item"
                    style="font-size: 1rem; color: white"
                  >
                    <ShareFilm
                      url="https://www.google.com/"
                      network="telegram"
                      color="#0088cc"
                    />
                  </div>
                  <div
                    class="dropdown-item"
                    style="font-size: 1rem; color: white"
                  >
                    <ShareFilm
                      url="https://www.google.com/"
                      network="messenger"
                      color="#0084ff"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-5 d-flex">
            <div>
              <div class="d-flex items-center">
                <div
                  class="d-flex px-3 h-3/4"
                  style="
                    background-color: #ffffff14;
                    border-radius: 3px;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: 600;
                  "
                >
                  {{ rate?.totalPoint }}
                </div>
                <div class="h-3/4 ml-4">
                  <StarRating
                    v-model:rating="rating"
                    :increment="0.5"
                    :show-rating="false"
                    :star-size="20"
                    :read-only="true"
                  />
                  <p class="h-1/2 mb-0">
                    {{ rate?.rates.length }} lượt đánh giá
                  </p>
                </div>
                <div class="flex items-center">
                  <p class="ml-10 py-2 px-4 rounded-md bg-gray-700">
                    Đánh giá của bạn:
                    {{ rate?.didIRate ? rate.yourPoint : "Chưa đánh giá" }}
                  </p>
                </div>
              </div>
            </div>
            <!-- <div class="">
              <button
                v-if="
                  user.userInformation.role !== `NO` &&
                  user.userInformation.role !== undefined
                "
                class="btn"
                @click="handleAddFilmToPlaylist"
              >
                <font-awesome-icon
                  style="font-size: 30px; color: white"
                  icon="fa-solid fa-list"
                />
              </button>
            </div> -->
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-9">
        <div class="row">
          <div class="mt-5">
            <h3 class="text-3xl" style="color: #ff9658">Nội Dung Chi Tiết</h3>
            <h4 class="mt-4 text-2xl mb-2">{{ film.filmDetail?.name }}</h4>
            <p style="line-height: 1.7rem">{{ film.filmDetail?.content }}</p>

            <h3 class="text-3xl mb-2" style="color: #ff9658">
              Found online link
            </h3>
            <div>
              <div v-if="film.filmDetail?.episode_total">
                <a
                  target="_blank"
                  class="episodes"
                  v-for="(ep, index) in film.filmDetail?.episodes"
                  :key="index"
                  :href="ep.link_film"
                  style="border: 1px solid gray; margin: 5px"
                  >Tập {{ index + 1 }}
                </a>
              </div>
              <div v-else>Chưa có tập phim nào</div>
            </div>

            <h3 class="mt-3 text-xl" style="color: #ff9658" id="trailer">
              Trailer
            </h3>
            <iframe
              v-if="film?.filmDetail?.trailer_url"
              class="metaframe rptss mt-4"
              :src="film?.filmDetail?.trailer_url.replace('watch?v=', 'embed/')"
              frameborder="0"
              scrolling="no"
              allow="autoplay; encrypted-media"
              allowfullscreen="true"
              width="80%"
              height="400px"
            ></iframe>
            <div v-else>
              <h5 class="mt-2 mb-2 text-xl" style="color: white">
                Chưa có trailer
              </h5>
            </div>
          </div>
          <h3 class="mt-5 mb-3 text-3xl" style="color: #ff9658" id="trailer">
            Phim cùng thể loại
          </h3>

          <Carousel
            :items-to-show="1.5"
            :breakpoints="breakpoints"
            :wrap-around="true"
          >
            <Slide
              v-for="(film, index) in film?.listFilmPoster?.slice(0, 10)"
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

          <!-- <h3 class="mt-5" style="color: #ff9658" id="trailer">Bình luận</h3> -->

          <nav class="mt-12 mb-1">
            <button
              class="mr-2 bg-gradient-to-r from-orange-800 to-yellow-700 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:from-orange-900 hover:to-yellow-800 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50 transition-all duration-300"
              @click="currentView = FacebookComment"
            >
              Bình luận
            </button>
            <button
              class="bg-gradient-to-r from-orange-800 to-yellow-700 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:from-orange-900 hover:to-yellow-800 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50 transition-all duration-300"
              @click="currentView = ReviewFilm"
            >
              Đánh giá
              <span class="text-sm font-semibold"
                >({{ rate?.rates.length }})</span
              >
            </button>
          </nav>

          <div v-if="currentView === FacebookComment">
            <FacebookComment
              url="http://localhost:5173"
              width="100%"
              numposts="5"
              style="background-color: white"
            />
          </div>
          <div v-else><ReviewFilm /></div>
        </div>
      </div>

      <div class="col-0 col-lg-3 trending">
        <h5 class="mb-2 mt-4" style="color: rgb(255, 150, 88)">
          Lượt Xem Nhiều Nhất
        </h5>
        <hr />
        <topViewsidebar :film="film" />

        <div
          class="w-full p-2 mt-4"
          style="border: solid 1px rgba(255, 255, 255, 0.08)"
        >
          <div
            data-bs-toggle="modal"
            data-bs-target="#reportBugModal"
            class="flex items-center report-bug"
          >
            <font-awesome-icon icon="fa-solid fa-flag" />
            <p class="mb-0 ml-2">Báo lỗi</p>
          </div>
          <div
            class="modal fade"
            id="reportBugModal"
            tabindex="-1"
            aria-labelledby="reportBugModalLabel"
            aria-hidden="true"
            ref="modalRef"
          >
            <div
              class="modal-dialog modal-dialog-centered"
              v-if="
                user.userInformation.role !== `NO` &&
                user.userInformation.role !== undefined
              "
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title"
                    id="reportBugModalLabel"
                    style="color: black"
                  >
                    Báo lỗi
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label
                        for="bug-name"
                        class="col-form-label"
                        style="color: black"
                        >Tên lỗi:</label
                      >
                      <input
                        v-model="bugName"
                        type="text"
                        class="form-control"
                        id="bug-name"
                      />
                      <p style="color: red">{{ bugNameError }}</p>

                      <label
                        for="bug-description"
                        class="col-form-label"
                        style="color: black"
                        >Mô tả lỗi:</label
                      >
                      <textarea
                        v-model="bugDescription"
                        type="text"
                        class="form-control"
                        id="bug-description"
                        row="3"
                      />
                      <p style="color: red">{{ bugDesError }}</p>

                      <div class="flex mt-3 items-center">
                        <img
                          :src="bugImageUrl ? bugImageUrl : noImage"
                          style="height: 80px; width: 100px"
                          class="mr-4"
                        />
                        <label
                          for="bug-image"
                          style="height: 40px"
                          class="button bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
                          >Chọn ảnh</label
                        >
                        <input
                          type="file"
                          accept="image/jpeg, image/png, image/jpg"
                          @change="handleBugImageChange"
                          id="bug-image"
                          class="hidden"
                        />
                        <p style="color: red">{{ bugImgError }}</p>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn-modal btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    class="btn-modal btn-primary"
                    data-bs-dismiss="modal"
                    @click="handleReportBug"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title"
                    id="reportBugModalLabel"
                    style="color: black"
                  >
                    Bạn cần đăng nhập để báo lỗi
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn-modal btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full p-2 mt-2"
          style="border: solid 1px rgba(255, 255, 255, 0.08)"
        >
          <div
            data-bs-toggle="modal"
            data-bs-target="#requestFeatureModal"
            class="flex items-center report-bug"
          >
            <font-awesome-icon icon="fa-solid fa-wrench" />
            <p class="mb-0 ml-2">Đề xuất tính năng</p>
          </div>
          <div
            class="modal fade"
            id="requestFeatureModal"
            tabindex="-1"
            aria-labelledby="requestFeatureModalLabel"
            aria-hidden="true"
            ref="modalRef"
          >
            <div
              class="modal-dialog modal-dialog-centered"
              v-if="
                user.userInformation.role !== `NO` &&
                user.userInformation.role !== undefined
              "
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title"
                    id="requestFeatureModalLabel"
                    style="color: black"
                  >
                    Đề xuất tính năng
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label
                        for="bug-name"
                        class="col-form-label"
                        style="color: black"
                        >Tên tính năng:</label
                      >
                      <input
                        v-model="requestFeatureName"
                        type="text"
                        class="form-control"
                        id="bug-name"
                      />
                      <p style="color: red">{{ requestFeatureNameError }}</p>

                      <label
                        for="bug-description"
                        class="col-form-label"
                        style="color: black"
                        >Mô tả tính năng:</label
                      >
                      <textarea
                        v-model="requestFeatureDescription"
                        type="text"
                        class="form-control"
                        id="bug-description"
                        row="3"
                      />
                      <p style="color: red">{{ requestFeatureDesError }}</p>

                      <div class="flex mt-3 items-center">
                        <img
                          :src="
                            requestFeatureImageUrl
                              ? requestFeatureImageUrl
                              : noImage
                          "
                          style="height: 80px; width: 100px"
                          class="mr-4"
                        />
                        <label
                          for="feature-image"
                          style="height: 40px"
                          class="button bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
                          >Chọn ảnh</label
                        >
                        <input
                          type="file"
                          accept="image/jpeg, image/png, image/jpg"
                          @change="handleRequestFeatureImageChange"
                          id="feature-image"
                          class="hidden"
                        />
                        <p style="color: red">{{ requestFeatureImgError }}</p>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn-modal btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    class="btn-modal btn-primary"
                    data-bs-dismiss="modal"
                    @click="handleRequestFeature"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title"
                    id="reportBugModalLabel"
                    style="color: black"
                  >
                    Bạn cần đăng nhập để báo lỗi
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn-modal btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import url("./FilmDetail.scss");
</style>
