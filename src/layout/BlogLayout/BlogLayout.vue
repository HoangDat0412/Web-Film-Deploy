<script setup>
import FooterView from "@/components/Footer/FooterView.vue";
import BlogHeader from "@/components/BlogHeader/BlogHeader.vue";
import { onBeforeUnmount, onMounted } from "vue";
// import Notification from "@/components/Notification/Notification.vue";
onMounted(() => {
  document.body.style.backgroundColor = "white";
});

onBeforeUnmount(() => {
  document.body.style.backgroundColor = "#424040";
});
</script>

<template>
  <main
    class="container-fluid container-xl px-0"
    style="background-color: #ffffff; color: #161616"
  >
    <BlogHeader />
    <Notification />

    <RouterView />
    <FooterView />
  </main>
</template>

<style scoped>
:deep(body) {
  background-color: white;
}
</style>
