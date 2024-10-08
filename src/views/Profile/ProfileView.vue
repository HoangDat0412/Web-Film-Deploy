<script setup>
import UserInformation from "@/components/UserInformation/UserInformation.vue";
// import UserCheckout from "@/components/UserCheckout/UserCheckout.vue"
import ListFilmView from "../ListFilm/ListFilmView.vue";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, onBeforeUpdate, ref, watchEffect } from "vue";
import WatchList from "@/components/WatchList/WatchList.vue";
import avatarNone from "@/assets/img/avatar-none.png";
import UserOverView from "@/components/UserOverView/UserOverView.vue";

const user = useUserStore();
const avatar = ref(null);

watchEffect(async () => {
  await user.getUserInformation();
});

onBeforeMount(async () => {
  await user.getUserInformation();
  avatar.value = user?.userInformation?.avatar_url
    ? user?.userInformation?.avatar_url
    : avatarNone;
});

onBeforeUpdate(() => {
  if (user.userInformation?.avatar_url) {
    avatar.value = user?.userInformation?.avatar_url;
  }
});
</script>

<template>
  <main>
    <div class="header-profile">
      <img :src="avatar ? avatar : avatarNone" />
      <h2 class="text-3xl ml-4 font-bold" style="font-family: 'Noto Sans'">
        {{ user.userInformation?.username }}
      </h2>
    </div>
    <div class="profile pb-5">
      <nav>
        <div
          class="nav nav-tabs justify-content-center"
          id="nav-tab"
          role="tablist"
        >
          <button
            style="font-weight: 600"
            class="nav-link active"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="true"
          >
            Tài Khoản
          </button>
          <button
            style="font-weight: 600"
            class="nav-link"
            id="nav-favouritefilm-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-favouritefilm"
            type="button"
            role="tab"
            aria-controls="nav-favouritefilm"
            aria-selected="true"
          >
            Playlist Phim
          </button>
          <button
            style="font-weight: 600"
            class="nav-link"
            id="nav-watchlistfilm-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-watchlistfilm"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="true"
          >
            Watchlist
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <!-- <UserInformation /> -->
          <UserOverView />
        </div>
        <!-- <div class="tab-pane fade" id="nav-chekout" role="tabpanel" aria-labelledby="nav-chekout-tab">
          <UserCheckout/>
        </div> -->
        <div
          class="tab-pane fade"
          id="nav-favouritefilm"
          role="tabpanel"
          aria-labelledby="nav-favouritefilm-tab"
        >
          <ListFilmView />
        </div>
        <div
          class="tab-pane fade"
          id="nav-watchlistfilm"
          role="tabpanel"
          aria-labelledby="nav-watchlistfilm-tab"
        >
          <WatchList />
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
@import url("./ProfileView.scss");
</style>
