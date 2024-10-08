<script setup>
import { ref } from "vue";

const props = defineProps(["film"]);
const film = ref(props.film);
</script>

<template>
  <main
    style="
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    "
  >
    <div className="trendingItem container-fluid mt-3">
      <RouterLink :to="`/filmdetail/${film?.movie_id}`" class="row">
        <div className="col-3">
          <img
            width="100%"
            height="90%"
            :src="film?.thumb_url"
            :alt="film?.name"
          />
        </div>
        <div class="col-9 d-flex" style="align-items: center">
          <div>
            <h6 class="mb-1 text-gray-400 font-semibold">{{ film?.name }}</h6>
            <h6 class="mb-1 text-gray-400">Lượt xem: {{ film?.view }}</h6>
          </div>
        </div>
      </RouterLink>
    </div>
  </main>
</template>
