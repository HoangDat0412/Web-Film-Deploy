<script setup>
const author = {
  name: "Ngo Tau",
  numOfBlog: 10,
  avatar_url:
    "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
};
</script>

<template>
  <div class="flex justify-between mb-2">
    <img :src="author.avatar_url" />
    <div>
      <p class="mb-0">{{ author.name }}</p>
      <p class="mb-0 text-gray-500 sm-xs">
        Số bài viết: {{ author.numOfBlog }}
      </p>
    </div>
    <div
      class="flex h-1/3 items-center justify-center"
      style="padding: 0.5rem 0.75rem"
    >
      <span class="more-btn text-center"> Xem thêm</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("./BloggerSidebarItem.scss");
</style>
