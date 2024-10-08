<template>
  <div class="comment p-3" style="background-color: white">
    <div class="pb-4">
      <textarea
        class="form-control"
        v-model="comment"
        @keyup.enter="handleComment"
        placeholder="Viết bình luận ..."
        rows="3"
      ></textarea>
      <!-- <button class="btn" style="background-color: #9cb4d8;" @click="handleComment">Comment</button> -->
    </div>
    <div>
      <div
        v-for="(i, key) in commentStore?.listComment"
        :key="key"
        class="card mb-3"
      >
        <div class="card-body">
          <div class="d-flex flex-start align-items-center">
            <img
              class="rounded-circle shadow-1-strong me-3"
              :src="handleImg(i?.avatar ? i?.avatar : false)"
              alt="avatar"
              width="40"
              height="40"
            />
            <div class="w-100">
              <div
                class="d-flex justify-content-between align-items-center"
                style="color: black"
              >
                <h6 class="mb-0">
                  {{ i?.userName }}
                  <br />
                  <span style="color: black">{{ i?.comment }}</span>
                </h6>
                <p class="mb-0">
                  {{ moment(i?.createdAt).format("DD/MM/YYYY-HH:MM") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
