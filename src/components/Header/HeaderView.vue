<script setup>
import {
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import AvatarDropdown from "../AvatarDropdown/AvatarDropdown.vue";
import { useFilmStore } from "@/stores/film";
import avatarNone from "@/assets/img/avatar-none.png";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchFilmDropdown from "../SearchFilmDropdown/SearchFilmDropdown.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const user = useUserStore();
const search = ref("");
const film = useFilmStore();
const avatar = ref(null);
const isLoading = ref(false); // Trạng thái loading

const handleSearch = async () => {
  router.push({ path: `/filter` });

  const data = {
    search_query: search.value,
  };

  film.searchFilmHeader(data);

  search.value = "";
};

const handleFilmType = (type) => {
  // router.push({ path: `/filter`, query: { genre: `${type}` } });

  const data = {
    movie_genre: type,
  };

  film.searchMoviesFilter(data);
  router.push({ path: `/filter` });
};

const handleCountry = async (type) => {
  // router.push({ path: `/country/${type}/1` });
  // router.push({ path: `/filter`, query: { country: `${type}` } });

  const data = {
    movie_country: type,
  };

  film.searchMoviesFilter(data);

  router.push({ path: `/filter` });
};

watchEffect(async () => {
  await film.setListFilmType();
  await film.setListFilmCountry();

  await user.getUserInformation();

  if (!user.userInformation?.avatar_url) {
    avatar.value = avatarNone;
  }
});

watch(route, () => {
  search.value = "";
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const searchFilmDebounced = debounce(async (newValue) => {
  if (newValue.length !== 0) {
    isLoading.value = true;
    await film.searchFilmHeader({
      search_query: newValue,
    });
  } else {
    film.listFilmSearchHeader = [];
  }
  isLoading.value = false;
  console.log(film.filmSearch);
}, 500);

watch(search, searchFilmDebounced);

onBeforeUpdate(async () => {
  if (user.userInformation?.avatar_url) {
    avatar.value = user?.userInformation?.avatar_url;
  }
});
const isFocus = ref("false");

const handleFocus = (state) => {
  isFocus.value = state;
};

const handleClickOutside = (event) => {
  const input = document.getElementById("searchInput");
  const dropdown = document.getElementById("dropdownSearch");

  if (
    input &&
    !input.contains(event.target) &&
    dropdown &&
    !dropdown.contains(event.target)
  ) {
    isFocus.value = false;
  }
};

const handleBlur = () => {
  setTimeout(() => {
    if (!document.getElementById("dropdownSearch").matches(":hover")) {
      isFocus.value = false;
    }
  }, 100);
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  console.log("onmounted header");
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const notifications = [
  "Blog cua ban da duoc duyet",
  "Bug cua ban da duoc duyet",
  "Pham nhung ngay vui ve da qua da co tap moi",
];
</script>

<template>
  <main>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">
          <img src="../../assets/logofilmv2.jpg" alt="" />
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <font-awesome-icon icon="fa-solid fa-bars" />
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" id="menu">
            <li class="nav-item">
              <a class="nav-link">
                <h6>Bảng xếp hạng <span class="arrow arrow-down"></span></h6>
              </a>
              <ul class="dropdown_menu dropdown-menu">
                <div class="flex flex-column">
                  <li>
                    <a href="/most-view" class="dropdown-item">Tổng lượt xem</a>
                  </li>
                  <li>
                    <a href="/top-rate" class="dropdown-item">Đánh giá cao</a>
                  </li>
                </div>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link">
                <h6>Thể Loại <span class="arrow arrow-down"></span></h6>
              </a>
              <ul class="dropdown_menu dropdown-menu">
                <div class="flex">
                  <div>
                    <li
                      v-for="(type, index) in film?.listFilmType.slice(0, 5)"
                      :key="index"
                    >
                      <a
                        @click="() => handleFilmType(`${type?.genre_id}`)"
                        class="dropdown-item"
                        >{{ type?.name }}</a
                      >
                    </li>
                  </div>

                  <div>
                    <li
                      v-for="(type, index) in film?.listFilmType.slice(5, 10)"
                      :key="index"
                    >
                      <a
                        @click="() => handleFilmType(`${type?.genre_id}`)"
                        class="dropdown-item"
                        >{{ type?.name }}</a
                      >
                    </li>
                  </div>
                  <div>
                    <li
                      v-for="(type, index) in film?.listFilmType.slice(10, 15)"
                      :key="index"
                    >
                      <a
                        @click="() => handleFilmType(`${type?.genre_id}`)"
                        class="dropdown-item"
                        >{{ type?.name }}</a
                      >
                    </li>
                  </div>
                  <div>
                    <li
                      v-for="(type, index) in film?.listFilmType.slice(15, 20)"
                      :key="index"
                    >
                      <a
                        @click="() => handleFilmType(`${type?.genre_id}`)"
                        class="dropdown-item"
                        >{{ type?.name }}</a
                      >
                    </li>
                  </div>
                </div>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <h6>Quốc Gia <span class="arrow arrow-down"></span></h6>
              </a>
              <ul class="dropdown_menu dropdown-menu">
                <div class="flex">
                  <div>
                    <li
                      v-for="(type, index) in film?.listCountry.slice(0, 6)"
                      :key="index"
                    >
                      <a
                        @click="() => handleCountry(`${type?.country_id}`)"
                        class="dropdown-item"
                        >{{ type?.name }}</a
                      >
                    </li>
                  </div>

                  <div>
                    <li
                      v-for="(type, index) in film?.listCountry.slice(6, 12)"
                      :key="index"
                    >
                      <a
                        @click="() => handleCountry(`${type?.country_id}`)"
                        class="dropdown-item"
                        >{{ type?.name }}</a
                      >
                    </li>
                  </div>
                  <div>
                    <li
                      v-for="(type, index) in film?.listCountry.slice(16, 22)"
                      :key="index"
                    >
                      <a
                        @click="() => handleCountry(`${type?.country_id}`)"
                        class="dropdown-item"
                        >{{ type?.name }}</a
                      >
                    </li>
                  </div>
                  <div>
                    <li
                      v-for="(type, index) in film.listCountry?.slice(22, 28)"
                      :key="index"
                    >
                      <a
                        @click="() => handleCountry(`${type?.country_id}`)"
                        class="dropdown-item"
                        >{{ type?.name }}</a
                      >
                    </li>
                  </div>
                </div>
              </ul>
            </li>
          </ul>
          <div class="flex">
            <RouterLink
              :to="{ path: '/blog/foryou' }"
              class="login-btn flex items-center justify-center mr-3"
            >
              <font-awesome-icon
                icon="fa-solid fa-blog"
                class="w-5 h-5"
                style="color: white"
              />
            </RouterLink>

            <div
              v-if="user?.userInformation?.username"
              class="navbar-nav profile_user items-center mt-lg-0"
            >
              <div class="dropstart">
                <button
                  class="btn"
                  style="color: white; font-size: 1rem"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <font-awesome-icon icon="fa-solid fa-bell" />
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-dark notification-dropdown"
                >
                  <li>
                    <h5 class="text-lg font-semibold text-white pt-2 px-3">
                      Thông báo
                    </h5>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li v-for="(item, index) in notifications" :key="index">
                    <div class="dropdown-item">{{ item }}</div>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item">Xem tất cả thông báo</a>
                  </li>
                </ul>
              </div>
              <div class="dropdown">
                <RouterLink
                  to="/profile"
                  class="avatar me-0 me-lg-3"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img :src="avatar" class="rounded-circle" :alt="avatar" />
                </RouterLink>

                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a href="/profile">
                      <h5 class="text-lg font-semibold text-white pt-2 px-3">
                        {{ user.userInformation.username }}
                      </h5>
                      <h6 class="dropdown-header">Xem hồ sơ</h6>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="/edit-profile">Playlist</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/edit-profile">Watchlist</a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="/edit-profile"
                      >Sửa thông tin</a
                    >
                  </li>
                  <li>
                    <a @click="user.logout()" href="#" class="dropdown-item"
                      >Đăng xuất</a
                    >
                  </li>
                </ul>
              </div>
              <!-- <AvatarDropdown  /> -->
            </div>
            <div
              v-else
              class="navbar-nav profile_user mt-lg-0 flex items-center justify-center"
            >
              <RouterLink
                to="/login"
                style="height: 40px"
                class="login-btn flex items-center justify-center ml-2"
                >Đăng Nhập
              </RouterLink>
            </div>
            <button
              class="btn ml-4"
              style="color: #01b4e4; font-size: 1.2rem"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSearchInput"
              aria-expanded="false"
              aria-controls="collapseSearchInput"
            >
              <font-awesome-icon icon="fa-solid fa-search" />
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex w-100 justify-center">
      <div
        class="collapse flex justify-center md:w-2/5 w-5/6"
        style="position: relative"
        id="collapseSearchInput"
      >
        <div class="input-group mt-lg-0 mb-2" style="position: relative">
          <input
            @blur="handleBlur"
            @focus="handleFocus(true)"
            id="searchInput"
            type="text"
            class="form-control"
            @keyup.enter="() => handleSearch()"
            v-model="search"
            placeholder="Nhập tên phim, diễn viên..."
            autocomplete="off"
          />
          <FontAwesomeIcon
            v-if="isLoading"
            :icon="faSpinner"
            class="loading-search"
          />
          <button
            @click="() => handleSearch()"
            class="btn btn-secondary"
            style="
              background: linear-gradient(
                to bottom,
                rgb(255, 150, 88) 0%,
                #6c757d 100%
              );
            "
          >
            <font-awesome-icon icon="fa-solid fa-search" />
          </button>
          <!-- <div class="flex items-center justify-center p-5">
            <div class="flex">
              <div
                class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5"
              >
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  class="pointer-events-none absolute w-5 fill-gray-500 transition"
                >
                  <path
                    d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                class="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
                placeholder=""
                id=""
              />
              <input
                type="button"
                value="Search"
                class="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
              />
            </div>
          </div> -->
        </div>
        <SearchFilmDropdown
          id="dropdownSearch"
          class="dropdown-search"
          :searchResult="film.listFilmSearchHeader"
          :isFocus="isFocus"
          :searchInput="search"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "./header.scss";

/* Các style khác (nếu có) */
</style>
