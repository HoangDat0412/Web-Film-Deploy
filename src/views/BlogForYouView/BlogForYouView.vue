<script setup>
import BlogHomeItem from "@/components/BlogHomeItem/BlogHomeItem.vue";
import { useBlogStore } from "@/stores/blog";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const sortBy = route.query.sort;
const currentPage = route.query.page_idx;

const blog = useBlogStore();

watchEffect(async () => {});
</script>
<template>
  <main>
    <div class="container">
      <div v-for="(item, index) in blog.blogs" :key="index" class="mb-8">
        <BlogHomeItem :blog="item" />
      </div>
    </div>
  </main>
</template>
<style scoped></style>
