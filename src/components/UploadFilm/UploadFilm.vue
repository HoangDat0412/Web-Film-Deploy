<script setup>
import { useFilmStore } from "@/stores/film";
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const film = useFilmStore();
onBeforeMount(async () => {
  await await film.setFilmWatching(route.params.id);
});

const img = ref({});
const src = ref({});
const trailer = ref({});
const hanleSubmit = async () => {
  let formData = new FormData();
  const image = img.value;
  const src1 = src.value;
  const trailer1 = trailer.value;
  formData.append("img", image.value);
  formData.append("src", src1.value);
  formData.append("trailer", trailer1.value);
  await film.uploadFilm(route.params.id, formData);
};
</script>

<template>
  <form>
    <div className="form-group position-relative mb-2 mt-5">
      <h5>Img</h5>
      <img
        :src="film.filmWatching?.thumb_url"
        style="width: 100px; height: 120px"
        alt=""
      />
    </div>
    <div className="form-group position-relative mb-2">
      <h5>Src</h5>
      <iframe
        class="metaframe rptss mt-4"
        :src="film.filmWatching?.srcurl"
        frameborder="0"
        scrolling="no"
        allow="encrypted-media"
        allowfullscreen="true"
        width="400px"
        height="250px"
      ></iframe>
    </div>
    <div className="form-group position-relative mb-2">
      <h5>Trailer</h5>
      <iframe
        class="metaframe rptss mt-4"
        :src="film.filmWatching?.trailerurl"
        frameborder="0"
        scrolling="no"
        allow="encrypted-media"
        allowfullscreen="true"
        width="400px"
        height="250px"
      ></iframe>
    </div>
  </form>

  <h3 class="mt-5">Cập Nhật File</h3>
  <form>
    <div className="form-group position-relative mb-2">
      <label htmlFor="img">Ảnh</label>
      <input
        name="img"
        className="form-control"
        @change="(e) => (img.value = e.target.files[0])"
        type="file"
      />
    </div>
    <div className="form-group position-relative mb-2">
      <label htmlFor="src">Video</label>
      <input
        name="src"
        className="form-control"
        @change="(e) => (src.value = e.target.files[0])"
        type="file"
      />
    </div>
    <div className="form-group position-relative mb-2">
      <label htmlFor="trailer">Trailer</label>
      <input
        name="trailer"
        className="form-control"
        @change="(e) => (trailer.value = e.target.files[0])"
        type="file"
      />
    </div>
    <button
      class="btn btn-success mt-3 container"
      @click.prevent="() => hanleSubmit()"
    >
      Cập Nhật
    </button>
  </form>
</template>
