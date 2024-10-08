<template>
  <div class="container mx-auto p-2">
    <h1 class="text-2xl font-bold mb-4 text-gray-600">Genre Manager</h1>

    <div class="mb-4">
      <div
        style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
        class="btn cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#06B6D4] h-9 rounded-md px-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <svg
          class="lucide lucide-rocket text-cyan-500 dark:text-cyan-400"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="#06B6D4"
          fill="none"
          viewBox="0 0 24 24"
          height="22"
          width="22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
          ></path>
          <path
            d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
          ></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
        </svg>
        Add Genre
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLabel"
                style="color: black"
              >
                Create new genre
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label
                  for="playlist-name"
                  class="col-form-label"
                  style="color: black"
                  >Tên:</label
                >
                <input
                  v-model="newGenreName"
                  type="text"
                  class="form-control"
                  id="playlist-name"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="handleAddNewGenre"
              >
                Tạo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search by name"
        class="px-4 py-2 w-full border rounded-md text-gray-600"
      />
    </div>

    <!-- User Table -->
    <table class="min-w-full bg-white border">
      <thead>
        <tr class="bg-gray-200 text-gray-600 text-left">
          <th class="py-2 px-4">#</th>
          <th class="py-2 px-4">Id</th>
          <!-- <th class="py-2 px-4">Avatar</th> -->
          <th class="py-2 px-4">Name</th>

          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-600">
        <tr
          v-for="(actor, index) in genreStore.genres"
          :key="index"
          class="border-t"
        >
          <td class="py-2 px-4">
            {{
              (genreStore.currentPage - 1) * genreStore.itemsPerPage + index + 1
            }}
          </td>
          <td class="py-2 px-4">{{ actor.genre_id }}</td>

          <!-- <td class="py-2 px-4">
            <img
              :src="user.avatar_url"
              alt="thumbnail"
              class="w-16 h-16 object-cover rounded-md"
            />
          </td> -->
          <td class="py-2 px-4">{{ actor.name }}</td>

          <td class="py-2 px-4">
            <!-- <RouterLink
              :to="`/admin/updatemovie/${user.user_id}`"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
              class="btn mr-1 cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] h-7 rounded-md px-2"
            >
              <font-awesome-icon
                icon="fa-solid fa-edit"
                style="font-size: 13px"
              />
            </RouterLink> -->
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
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title"
                      id="reportBugModalLabel"
                      style="color: black"
                    >
                      Bạn có chắc chắn xóa phim này
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
                      @click="handleDeleteGenre(actor.genre_id)"
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
              'bg-gray-100 text-gray-700': genreStore.currentPage === 1,
              'text-gray-500': genreStore.currentPage !== 1,
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
              'bg-blue-50 text-blue-600': genreStore.currentPage === page,
              'text-gray-500': genreStore.currentPage !== page,
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {{ page }}
          </a>
        </li>
        <li v-if="endPage < genreStore.totalPages">
          <a
            @click.prevent="goToPage(genreStore.totalPages)"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >{{ genreStore.totalPages }}</a
          >
        </li>
        <li>
          <a
            @click.prevent="nextPage"
            :class="{
              'bg-gray-100 text-gray-700':
                genreStore.currentPage === genreStore.totalPages,
              'text-gray-500': genreStore.currentPage !== genreStore.totalPages,
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
    genreStore
  </div>
</template>

<script setup>
import { useGenreStore } from "@/stores/genre";
import { onMounted, ref, computed } from "vue";

const newGenreName = ref("");
const genreStore = useGenreStore();

const handleAddNewGenre = async () => {
  const data = {
    name: newGenreName.value,
  };

  await genreStore.addNewGenre(data);
};

const searchQuery = ref(genreStore.searchQuery);
// Create a debounced version of the search function using lodash

// Function to handle search
function handleSearch() {
  genreStore.searchGenres(searchQuery.value);
}

const maxPagesToShow = 5; // Maximum number of pages to display

const startPage = computed(() =>
  Math.max(1, genreStore.currentPage - Math.floor(maxPagesToShow / 2))
);
const endPage = computed(() =>
  Math.min(genreStore.totalPages, startPage.value + maxPagesToShow - 1)
);
const pagesArray = computed(() => {
  const pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

const handleDeleteGenre = (id) => {
  genreStore.deleteGenre(id);
};

onMounted(() => {
  genreStore.fetchGenres();
});

function prevPage() {
  if (genreStore.currentPage > 1) {
    genreStore.goToPage(genreStore.currentPage - 1);
  }
}

function nextPage() {
  if (genreStore.currentPage < genreStore.totalPages) {
    genreStore.goToPage(genreStore.currentPage + 1);
  }
}

function goToPage(page) {
  genreStore.goToPage(page);
}
</script>
