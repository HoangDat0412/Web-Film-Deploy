<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { DOMAIN } from "@/utils/config";
import { useNotificationStore } from "@/stores/notification";
const notification = useNotificationStore();

const handleAddToBookmark = () => {
  alert("Đang phát triển tính năng");
};

const props = defineProps(["blog"]);
const blog = props.blog;

console.log("blog", blog);
</script>
<template>
  <main style="height: 100%">
    <RouterLink :to="'/blog' + '/content/' + blog.blog_id">
      <img :src="DOMAIN.slice(0, -4) + blog.image_url"
    /></RouterLink>

    <div>
      <div class="h-5 flex justify-between">
        <span class="ml-2 text-gray-500 text-sm">18 phút đọc</span>
        <FontAwesomeIcon
          :icon="faBookmark"
          class="fa-bookmark"
          title="Click để lưu bài viết"
          @click="handleAddToBookmark"
        />
      </div>
      <RouterLink :to="'/blog' + '/content/' + blog.blog_id">
        <p class="mt-4 blog-title">
          {{ blog.title }}
        </p></RouterLink
      >
      <div class="flex">
        <a href="/profile"
          ><img :src="blog.user.avatar_url" class="avatar"
        /></a>
        <p class="flex items-center mb-0 ml-2 font-semibold">
          {{ blog.user.username }}
          <span
            class="ml-2 hidden md:flex"
            style="font-size: 0.8rem; color: gray"
            >{{ blog.created_at.split("T")[0] }}</span
          >
        </p>
      </div>
    </div>
  </main>
</template>
<style scoped>
@import url("./BlogTrendingItem.scss");
</style>
