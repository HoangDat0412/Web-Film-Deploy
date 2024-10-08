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
import { useFilmStore } from "@/stores/film";
import avatarNone from "@/assets/img/avatar-none.png";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { RouterLink, useRoute } from "vue-router";
import Avatar from "../Avatar/Avatar.vue";
const route = useRoute();
const user = useUserStore();
const search = ref("");
const film = useFilmStore();
const avatar = ref(null);
const isLoading = ref(false); // Trạng thái loading

watchEffect(async () => {
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
    await film.searchFilm({
      pag: 1,
      name: newValue,
      itemPerPage: 8,
    });
  } else {
    film.filmSearch = [];
  }
  isLoading.value = false;
  console.log(film.listFilmSearch);
}, 500);

watch(search, searchFilmDebounced);

onBeforeUpdate(() => {
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
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <main class="px-3">
    <nav class="navbar navbar-expand-lg py-0">
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
          <div class="d-flex">
            <div
              v-if="user?.userInformation?.username"
              class="navbar-nav profile_user align-items-center mt-3 mt-lg-0"
            >
              <RouterLink to="/blog/new-blog">
                <button
                  class="btn ml-4 border-1 border-white rounded-3xl px-4"
                  style="color: white; font-size: 1rem"
                  type="button"
                >
                  <font-awesome-icon icon="fa-solid fa-pen-nib" />
                  Viết bài
                </button>
              </RouterLink>
              <button
                class="btn"
                style="color: white; font-size: 1rem"
                type="button"
              >
                <font-awesome-icon icon="fa-solid fa-bell" />
              </button>

              <div class="dropdown">
                <RouterLink
                  to="/profile"
                  class="avatar me-0 me-lg-3"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img :src="avatar" class="rounded-circle" :alt="avatar" />
                  <!-- <Avatar name="Ngu" /> -->
                </RouterLink>

                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a href="/profile">
                      <h5 class="dropdown-header">
                        {{ user.userInformation.username }}
                      </h5>
                      <h6 class="dropdown-header">View profile</h6>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="/profile">Another action</a>
                  </li>
                  <li>
                    <a @click="user.logout()" href="#" class="dropdown-item"
                      >Đăng xuất</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div
              v-else
              class="navbar-nav profile_user mt-lg-0 flex items-center justify-center"
            >
              <RouterLink
                to="/login"
                style="height: 40px"
                class="login-btn flex items-center justify-center"
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
    <div class="d-flex w-100 justify-center">
      <div
        class="collapse flex justify-center"
        style="position: relative; width: 35%"
        id="collapseSearchInput"
      >
        <div class="input-group mt-2 mt-lg-0" style="position: relative">
          <input
            @blur="handleBlur"
            @focus="handleFocus(true)"
            id="searchInput"
            type="text"
            class="form-control"
            @keyup.enter="() => handleSearch()"
            v-model="search"
            placeholder="Nhập tên phim, diễn viên..."
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
        </div>
        <SearchFilmDropdown
          class="dropdown-search"
          :searchResult="film.filmSearch"
          :isFocus="isFocus"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("BlogHeader.scss");
</style>
