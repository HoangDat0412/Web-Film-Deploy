<script setup lang="ts">
import { RouterView } from "vue-router";
import { useLoadingStore } from "./stores/loading";

const loading = useLoadingStore();
</script>

<template>
  <div v-if="loading.isLoading">
    <div class="loading-container">
      <div class="loading"></div>
    </div>
  </div>
  <RouterView />
  <notifications />

  <!-- <SelectActorsView /> -->
</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  z-index: 10;
  width: 50px;
  height: 50px;
  border: 3px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
