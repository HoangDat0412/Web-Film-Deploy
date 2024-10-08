<script setup>
import Notification from "@/components/Notification/Notification.vue";
</script>

<template>
  <main>
    <Notification />

    <div class="d-flex">
      <div className="background_usertemplate">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped>
.background_usertemplate {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  background-size: contain;
  justify-content: center;
  background-image: url(../../assets/bgAuth.jpg);
  background-position: center;
}
</style>
