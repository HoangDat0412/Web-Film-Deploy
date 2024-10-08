<template>
  <div class="container flex pt-4 px-2 flex-column items-center">
    <div class="m-6 w-3/4">
      <h1 class="text-5xl font-bold text-gray-800 mb-2">{{ blog?.title }}</h1>
    </div>
    <div class="flex w-3/4 p-6">
      <a href="/profile"><img :src="user.avatar_url" class="avatar" /></a>
      <a href="/profile">
        <p class="ml-2 font-bold flex flex-column">
          {{ user.username }}
          <span class="ml-2" style="font-size: 0.8rem; color: gray">{{
            blog?.created_at?.split("T")[0]
          }}</span>
        </p>
      </a>
    </div>

    <div class="w-3/4 quill-container p-6" style="border-left: 1px solid grey">
      <QuillEditor
        class="min-h-[400px]"
        theme="snow"
        v-model:content="blogContent"
        contentType="html"
        toolbar="full"
        readOnly="true"
      />
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from "@/stores/blog";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useLoadingStore } from "@/stores/loading";

const loading = useLoadingStore();
const user = ref({
  avatar_url: "",
  username: "",
});

const blog = useBlogStore();
const route = useRoute();
const blogContent = ref(null);

watchEffect(async () => {
  loading.setLoading(true);
  await blog.getBlogDetail(route.params.id);

  blogContent.value = blog.content;
  user.value.avatar_url = blog.author_avatar;
  user.value.username = blog.author_name;
  console.log(blog.content);

  loading.setLoading(false);
});
</script>

<style lang="scss" scoped>
:deep(.ql-toolbar.ql-snow) {
  display: none;
}
:deep(.ql-container.ql-snow) {
  border: none;
}
@import url("./BlogContentView.scss");
</style>
