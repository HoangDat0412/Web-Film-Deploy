<template>
  <div class="container mx-auto p-2">
    <h1 class="text-2xl font-bold mb-4 text-gray-600">
      Request Feature Manager
    </h1>

    <div class="mb-4"></div>

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search by name, country or genre"
        class="px-4 py-2 w-full border rounded-md text-gray-600"
      />
    </div>

    <!-- User Table -->
    <table class="min-w-full bg-white border">
      <thead>
        <tr class="bg-gray-200 text-gray-600 text-left">
          <th class="py-2 px-4">#</th>
          <th class="py-2 px-4">ID</th>
          <th class="py-2 px-4">UserID</th>

          <!-- <th class="py-2 px-4">Avatar</th> -->
          <th class="py-2 px-4">Title</th>
          <th class="py-2 px-4">Description</th>
          <th class="py-2 px-4">Image</th>

          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-600">
        <tr
          v-for="(actor, index) in requestFeatureStore.requestFeatures"
          :key="index"
          class="border-t"
        >
          <td class="py-2 px-4">
            {{
              (requestFeatureStore.currentPage - 1) *
                requestFeatureStore.itemsPerPage +
              index +
              1
            }}
          </td>
          <td class="py-2 px-4">{{ actor.feature_id }}</td>

          <!-- <td class="py-2 px-4">
            <img
              :src="user.avatar_url"
              alt="thumbnail"
              class="w-16 h-16 object-cover rounded-md"
            />
          </td> -->
          <td class="py-2 px-4">{{ actor.user_id }}</td>

          <td class="py-2 px-4">{{ actor.title }}</td>
          <td class="py-2 px-4">{{ actor.description }}</td>
          <td class="py-2 px-4">
            <img
              :src="DOMAIN.slice(0, -4) + actor.url_image"
              style="width: 60px; height: 60px"
            />
          </td>

          <td class="py-2 px-4">
            <button
              data-bs-toggle="modal"
              data-bs-target="#reportBugModal"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
              class="btn cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[red] h-7 rounded-md px-2"
            >
              <font-awesome-icon
                icon="fa-solid fa-trash"
                style="font-size: 13px"
              />
            </button>
            <div
              class="modal fade"
              id="reportBugModal"
              tabindex="-1"
              aria-labelledby="reportBugModalLabel"
              aria-hidden="true"
              ref="modalRef"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title"
                      id="reportBugModalLabel"
                      style="color: black"
                    >
                      Bạn có chắc chắn xóa phim này?
                    </h5>

                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn-modal btn-primary"
                      @click="handleDeleteRequestFeature(actor.feature_id)"
                      data-bs-dismiss="modal"
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      class="btn-modal btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <nav class="mt-3" aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <a
            @click.prevent="prevPage"
            :class="{
              'bg-gray-100 text-gray-700':
                requestFeatureStore.currentPage === 1,
              'text-gray-500': requestFeatureStore.currentPage !== 1,
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-s-lg hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </a>
        </li>
        <!-- Display pages around the current page with ellipsis -->
        <li v-if="startPage > 1">
          <a
            @click.prevent="goToPage(1)"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li v-for="page in pagesArray" :key="page">
          <a
            @click.prevent="goToPage(page)"
            :class="{
              'bg-blue-50 text-blue-600':
                requestFeatureStore.currentPage === page,
              'text-gray-500': requestFeatureStore.currentPage !== page,
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {{ page }}
          </a>
        </li>
        <li v-if="endPage < requestFeatureStore.totalPages">
          <a
            @click.prevent="goToPage(requestFeatureStore.totalPages)"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >{{ requestFeatureStore.totalPages }}</a
          >
        </li>
        <li>
          <a
            @click.prevent="nextPage"
            :class="{
              'bg-gray-100 text-gray-700':
                requestFeatureStore.currentPage ===
                requestFeatureStore.totalPages,
              'text-gray-500':
                requestFeatureStore.currentPage !==
                requestFeatureStore.totalPages,
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useRequestFeatureStore } from "@/stores/requestFeature";
import { onMounted, ref, computed } from "vue";

const requestFeatureStore = useRequestFeatureStore();

const searchQuery = ref(requestFeatureStore.searchQuery);
// Create a debounced version of the search function using lodash

// Function to handle search
function handleSearch() {
  requestFeatureStore.searchRequestFeature(searchQuery.value);
}

const maxPagesToShow = 5; // Maximum number of pages to display

const startPage = computed(() =>
  Math.max(1, requestFeatureStore.currentPage - Math.floor(maxPagesToShow / 2))
);
const endPage = computed(() =>
  Math.min(requestFeatureStore.totalPages, startPage.value + maxPagesToShow - 1)
);
const pagesArray = computed(() => {
  const pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

const handleDeleteRequestFeature = (id) => {
  requestFeatureStore.deleteRequestFeature(id);
};

onMounted(() => {
  requestFeatureStore.fetchRequestFeature();
});

function prevPage() {
  if (requestFeatureStore.currentPage > 1) {
    requestFeatureStore.goToPage(requestFeatureStore.currentPage - 1);
  }
}

function nextPage() {
  if (requestFeatureStore.currentPage < requestFeatureStore.totalPages) {
    requestFeatureStore.goToPage(requestFeatureStore.currentPage + 1);
  }
}

function goToPage(page) {
  requestFeatureStore.goToPage(page);
}
</script>
