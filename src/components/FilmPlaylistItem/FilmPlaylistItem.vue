<template>
  <div
    v-for="(item, index) in userStore?.playlist"
    :style="{
      backgroundImage:
        item?.category_movies?.length > 0
          ? 'url(' + item?.category_movies[0]?.movie?.poster_url + ')'
          : 'url(' + imageNone + ')',
    }"
    class="film-list-item"
    :key="index"
  >
    <div class="overlay"></div>
    <font-awesome-icon
      icon="fa-regular fa-trash-can"
      class="trash-icon"
      data-bs-toggle="modal"
      data-bs-target="#reportBugModal"
    />
    <div
      class="modal fade"
      id="reportBugModal"
      tabindex="-1"
      aria-labelledby="reportBugModalLabel"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="reportBugModalLabel"
              style="color: black"
            >
              Bạn có chắc chắn xóa playlist này
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
              class="btn-modal btn-primary"
              @click="handleDeletePlaylist(item?.category_id)"
              data-bs-dismiss="modal"
            >
              Xóa
            </button>
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
    <RouterLink
      class="h-full w-full flex items-center justify-center"
      :to="`/list/${item?.category_id}`"
      ><div style="color: white">
        <h5 class="text-xl font-bold text-center mt-2">
          {{ item.name }}
        </h5>
        <p class="text-gray-200">
          Cập nhật : {{ item?.updated_at?.split("T")[0] }}
        </p>
      </div></RouterLink
    >
  </div>
</template>

<script setup>
import imageNone from "@/assets/img/no-img.jpg";
import { useUserStore } from "@/stores/user";
import { watchEffect } from "vue";

const userStore = useUserStore();

watchEffect(async () => {
  await userStore.getUserPLaylist();
});

// onBeforeMount(async () => {
//   await userStore.getUserPLaylist();
//   playlist.value = userStore.playlist;
// });

const handleDeletePlaylist = async (id) => {
  await userStore.deleteUserPLaylist(id);
};
</script>

<style lang="scss" scoped>
@import url("./FilmPlaylistItem.scss");
</style>
