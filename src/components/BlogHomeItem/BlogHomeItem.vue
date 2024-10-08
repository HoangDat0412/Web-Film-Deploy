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
</script>
<template>
  <main class="container">
    <div class="grid lg:grid-cols-3 md:grid-cols-4 gap-4">
      <div>
        <RouterLink :to="'/blog' + '/content/' + blog.blog_id"
          ><img :src="DOMAIN.slice(0, -4) + blog.image_url"
        /></RouterLink>
      </div>

      <div class="md:col-span-3 lg:col-span-2">
        <div class="h-5 flex justify-between">
          <span class="text-gray-500 text-sm">18 phút đọc</span>
          <FontAwesomeIcon
            :icon="faBookmark"
            class="fa-bookmark"
            title="Click để lưu bài viết"
            @click="handleAddToBookmark"
          />
        </div>
        <RouterLink :to="'/blog' + '/content/' + blog.blog_id">
          <p class="mt-4 blog-title font-big">
            {{ blog.title }}
          </p></RouterLink
        >
        <!-- <p class="text-gray-500 pb-2 blog-title">{{ blog.content }}</p> -->
        <div class="flex">
          <a href="/profile"
            ><img :src="blog.user.avatar_url" class="avatar"
          /></a>
          <a href="/profile" class="flex items-center justify-center">
            <p class="flex items-center mb-0 ml-2 font-bold">
              {{ blog.user.username }}
              <span class="ml-2" style="font-size: 0.8rem; color: gray">{{
                blog.created_at.split("T")[0]
              }}</span>
            </p>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
@import url("./BlogHomeItem.scss");
</style>
