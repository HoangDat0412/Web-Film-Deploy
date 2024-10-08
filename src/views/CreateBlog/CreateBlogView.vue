<template>
  <div class="container p-12 flex items-center flex-column">
    <h1 class="text-2xl pb-2">Tạo bài viết mới</h1>

    <!-- <QuillEditor
        theme="snow"
        v-model:content="content"
        placeholder="Viết gì đó..."
      /> -->

    <form class="w-full mb-3 flex items-center flex-column">
      <label
        for="blog-name"
        style="color: black"
        class="font-semibold text-lg mb-2 w-full lg:w-3/4"
        >Tiêu đề bài viết</label
      >
      <input
        v-model="blogName"
        type="text"
        class="input w-full lg:w-3/4"
        id="blog-name"
      />
      <p style="color: red">{{ blogNameError }}</p>

      <label
        for="blog-description"
        class="font-semibold text-lg mb-2 mt-4 w-full lg:w-3/4"
        style="color: black"
        >Nội dung bài viết
      </label>
      <textarea
        v-model="blogContent"
        type="text"
        class="input w-full lg:w-3/4 pt-2 mb-8"
        id="blog-content"
        row="3"
        style="height: 50vh"
        autocorrect="off"
        spellcheck="false"
      />
      <p style="color: red">{{ blogContentError }}</p>

      <div class="form">
        <span class="form-title">Tải tệp lên</span>
        <p class="form-paragraph">Tệp phải là ảnh</p>
        <div v-if="blogImageUrl" class="drop-container">
          <label for="file-input" class="h-full">
            <img :src="blogImageUrl" class="mr-4" />
            <input
              type="file"
              accept="image/*"
              required=""
              id="file-input"
              @change="handleBlogImageChange"
              class="hidden"
            />
          </label>
        </div>

        <div v-else>
          <label for="file-input" class="drop-container">
            <span class="drop-title">Drop files here</span>
            or
            <input
              type="file"
              accept="image/*"
              required=""
              id="file-input"
              @change="handleBlogImageChange"
            />
          </label>
        </div>
        <p style="color: red">{{ blogImgError }}</p>
      </div>
    </form>
    <button class="button" @click="handleCreateBlog">Đăng bài viết</button>
  </div>
</template>

<script setup>
import { useBlogStore } from "@/stores/blog";
import { checkNull } from "@/validation/validation";
import { ref } from "vue";
// const content = ref({
//   ops: [
//     { insert: "The Two Towers" },
//     { insert: "\n", attributes: { header: 1 } },
//     { insert: "Aragorn sped on up the hill.\n" },
//   ],
// });
const blogStore = useBlogStore();

const blogImageUrl = ref(null);
const blogName = ref("");
const blogNameError = ref("");
const blogContent = ref("");
const blogContentError = ref("");
const blogImgError = ref("");
const blogImage = ref(null);
const didChoseImage = ref(false);

const handleCreateBlog = async () => {
  const formData = new FormData();

  !checkNull(blogName.value)
    ? (blogNameError.value = "Tên lỗi không được bỏ trống")
    : (blogNameError.value = "");

  !checkNull(blogContent.value)
    ? (blogContentError.value = "Mô tả lỗi không được bỏ trống")
    : (blogContentError.value = "");

  !checkNull(blogImageUrl.value)
    ? (blogImgError.value = "Ảnh không được bỏ trống")
    : (blogImgError.value = "");

  formData.append("title", blogName.value);
  formData.append("content", blogContent.value);
  formData.append("image_url", blogImage.value);

  if (
    checkNull(blogName.value) &&
    checkNull(blogContent.value) &&
    checkNull(blogImageUrl.value)
  ) {
    await blogStore.createNewBlog(formData);
  }
};

const handleBlogImageChange = (e) => {
  blogImage.value = e.target.files[0];
  blogImageUrl.value = URL.createObjectURL(blogImage.value);
  didChoseImage.value = true;
};
</script>

<style lang="scss" scoped>
@import url("./CreateBlogView.scss");
</style>
