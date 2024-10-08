<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import FilmPlaylistItem from "@/components/FilmPlaylistItem/FilmPlaylistItem.vue";
// import { RouterLink } from "vue-router";

const user = useUserStore();
const newPlaylistName = ref("");

const handleNewPlaylist = async () => {
  await user.createNewPlaylist({
    name: newPlaylistName.value,
  });

  await user.getUserPLaylist();
};
</script>

<template>
  <main>
    <div className="container py-2 px-12">
      <div className="pt-3 pb-5">
        <div class="flex justify-between">
          <h3 className="mb-3 text-3xl">Playlist Phim Của Bạn</h3>
          <div
            class="mb-3 button-playlist"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Tạo playlist
            <div class="hoverEffect">
              <div></div>
            </div>
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
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="handleNewPlaylist"
                    data-bs-dismiss="modal"
                  >
                    Tạo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
          <FilmPlaylistItem />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("./ListFilmView.scss");
</style>
