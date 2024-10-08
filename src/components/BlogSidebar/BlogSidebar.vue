<script setup>
import BloggerSidebarItem from "../BloggerSidebarItem/BloggerSidebarItem.vue";
</script>
<template>
  <main class="container">
    <div class="border border-solid border-gray-500 px-3 py-4 rounded-md">
      <div class="flex justify-between w-full">
        <p class="font-semibold text-uppercase mb-4">Đóng góp nhiều</p>
        <a class="text-grey-500 font-sm text-sm" href="#">Xem thêm</a>
      </div>
      <div class="">
        <BloggerSidebarItem />
        <BloggerSidebarItem />
        <BloggerSidebarItem />
        <BloggerSidebarItem />
      </div>
    </div>
    <div></div>
  </main>
</template>
<style scoped></style>
