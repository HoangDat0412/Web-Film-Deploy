<script setup>
import { watchEffect } from "vue";
import { RouterLink } from "vue-router";
import { useLoadingStore } from "@/stores/loading";
import bannerImg from "@/assets/img/blog-banner.png";
import BlogSidebar from "@/components/BlogSidebar/BlogSidebar.vue";

import BlogTrendingItem from "@/components/BlogTrendingItem/BlogTrendingItem.vue";
import { useBlogStore } from "@/stores/blog";

const loading = useLoadingStore();
const blog = useBlogStore();

watchEffect(async () => {
  loading.setLoading(true);
  blog.fetchBlog();
  loading.setLoading(false);
});
console.log(bannerImg);

console.log("trending", blog.blogTrendingList);

//hardcode
</script>

<template>
  <main class="px-5">
    <div class="mt-4">
      <img :src="bannerImg" class="w-full" />
    </div>
    <div class="flex mt-4">
      <p class="uppercase trending-p font-bold">Nổi bật trong tháng</p>
      <a href="#" class="pl-4" style="color: gray">Xem TOP 10 bài viết</a>
    </div>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-3">
      <div v-for="(item, index) in blog.blogs.slice(0, 4)" :key="index">
        <BlogTrendingItem :blog="item" />
      </div>
    </div>

    <div class="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-16">
      <div class="col-span-2">
        <div class="flex mb-8">
          <RouterLink
            class="uppercase tab-blog underline-active-link"
            :to="{ path: '/blog/foryou' }"
            >Dành cho bạn</RouterLink
          >
          <RouterLink
            class="uppercase tab-blog underline-active-link"
            :to="{ path: '/blog/top' }"
            >nổi bật</RouterLink
          >
          <RouterLink
            class="uppercase tab-blog underline-active-link"
            :to="{ path: '/blog/newest' }"
            >Mới nhất</RouterLink
          >
          <RouterLink
            class="uppercase tab-blog underline-active-link"
            :to="{ path: '/blog/following' }"
            >Theo dõi</RouterLink
          >
        </div>
        <router-view></router-view>
      </div>
      <div class="hidden lg:flex">
        <BlogSidebar />
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("BlogHomeView.scss");
</style>
