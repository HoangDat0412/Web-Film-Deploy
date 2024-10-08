<template>
  <div class="max-w-4xl mx-auto p-4 space-y-6 bg-gray-900 text-gray-100">
    <h2 class="text-2xl font-bold text-center mb-6 text-blue-400">
      Đánh giá phim
    </h2>

    <!-- New Review Form -->
    <div class="bg-gray-800 shadow-lg rounded-lg p-6 border-gray-700">
      <h3 class="text-xl font-semibold mb-4 text-blue-300">Đánh giá của bạn</h3>
      <form @submit.prevent="submitReview" class="space-y-4">
        <div>
          <label
            id="rating-label"
            class="block text-sm font-medium text-gray-300"
            >Rating</label
          >
          <div
            class="flex items-center space-x-2 mt-1"
            role="group"
            aria-labelledby="rating-label"
          >
            <StarRating
              v-model:rating="yourRating"
              @update:rating="setYourRating"
              :increment="0.5"
              :show-rating="false"
              :star-size="20"
            />
          </div>
        </div>
        <div>
          <label for="content" class="block text-sm font-medium text-gray-300"
            >Your Review</label
          >
          <textarea
            id="content"
            v-model="yourReview.content"
            rows="3"
            required
            class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Review
        </button>
      </form>
    </div>

    <!-- Existing Reviews -->
    <div
      v-for="(review, index) in rate.rates"
      :key="index"
      class="bg-gray-800 shadow-lg rounded-lg p-6 border-gray-700"
    >
      <div class="flex items-center mb-4">
        <div class="font-semibold text-blue-300">
          {{ review.user?.username }}
        </div>
        <div class="ml-auto">
          <StarRating
            :rating="review.score"
            :increment="0.5"
            :show-rating="false"
            :star-size="20"
            :read-only="true"
          />
        </div>
      </div>
      <p class="text-gray-300 mb-4">{{ review.review }}</p>
      <div class="flex items-center space-x-4">
        <div
          @click="likeReview(review.rating_id)"
          :class="{
            'text-gray-400 flex items-center space-x-1 transition duration-300 cursor-pointer hover:text-green-300':
              'true',
            'text-green-400': review.userAction === 'like',
          }"
        >
          <font-awesome-icon icon="fa-regular fa-thumbs-up" />
          <span>{{ review.likeCount }}</span>
        </div>
        <div
          @click="dislikeReview(review.rating_id)"
          class=""
          :class="{
            'flex items-center text-gray-400 space-x-1 hover:text-red-300 transition duration-300 cursor-pointer': true,
            'text-red-400 ': review.userAction === 'dislike',
          }"
        >
          <font-awesome-icon icon="fa-regular fa-thumbs-down" />
          <span>{{ review.dislikeCount }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="visibleReviews.length < rate.rates.length"
      class="text-center mt-6"
    >
      <button
        @click="loadMoreReviews"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Load More Reviews
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import StarRating from "vue-star-rating";
import { useRoute } from "vue-router";
import { useRateStore } from "@/stores/rate";
import { useUserStore } from "@/stores/user";
import { useNotificationStore } from "@/stores/notification";
const user = useUserStore();

const rate = useRateStore();

const route = useRoute();
const rating = ref(rate.totalPoint);

watchEffect(async () => {
  await rate.getRates(route.params.id);
});

// onBeforeUpdate(async () => {
//   await rate.getRates(route.params.id);
// });

const visibleCount = ref(3);

const visibleReviews = computed(() => rate.rates.slice(0, visibleCount.value));

const loadMoreReviews = () => {
  visibleCount.value = Math.min(visibleCount.value + 3, rate.rates.length);
};

const likeReview = (id) => {
  rate.likeOrUnlike(id);
};

const dislikeReview = (id) => {
  rate.dislikeOrUndislike(id);
};

// New review form
const yourRating = ref(0);
const setYourRating = () => {
  console.log("ur RATING", yourRating);
};

const yourReview = ref({
  content: "",
});

const notification = useNotificationStore();

const submitReview = async () => {
  if (
    user.userInformation.role !== `NO` &&
    user.userInformation.role !== undefined
  ) {
    const data = {
      filmId: route.params.id,
      score: yourRating.value,
      review: yourReview.value.content,
    };
    await rate.setRate(data);
    await rate.getYourRating(route.params.id);
    console.log("rate", route.params.id, rating.value);
  } else {
    alert("bạn cần đăng nhập để đánh giá ");
  }
};
</script>
