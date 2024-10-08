<template>
  <div class="container mx-auto p-2">
    <h1 class="text-2xl font-bold mb-4 text-gray-600">User Manager</h1>

    <div class="mb-4"></div>

    <div class="mb-4">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search by name, country or genre"
        class="px-4 py-2 w-full border rounded-md text-gray-600"
      />
    </div>

    <table class="min-w-full bg-white border">
      <thead>
        <tr class="bg-gray-200 text-gray-600 text-left">
          <th class="py-2 px-4">Id</th>
          <!-- <th class="py-2 px-4">Avatar</th> -->
          <th class="py-2 px-4">Username</th>
          <th class="py-2 px-4">Email</th>

          <th class="py-2 px-4">Created At</th>
          <th class="py-2 px-4">Verify</th>
          <th class="py-2 px-4">2fa</th>

          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-600">
        <tr
          v-for="(user, index) in userStore.userList"
          :key="index"
          class="border-t"
        >
          <td class="py-2 px-4">{{ user.user_id }}</td>

          <td class="py-2 px-4">{{ user.username }}</td>
          <td class="py-2 px-4">{{ user.email }}</td>

          <td class="py-2 px-4">{{ user.created_at.split("T")[0] }}</td>
          <td class="py-2 px-4">{{ user.is_verify }}</td>
          <td class="py-2 px-4">{{ user.is_2fa }}</td>

          <td class="py-2 px-4">
            <RouterLink
              :to="`/admin/updateuser/${user.user_id}`"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
              class="btn mr-1 cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] h-7 rounded-md px-2"
            >
              <font-awesome-icon
                icon="fa-solid fa-edit"
                style="font-size: 13px"
              />
            </RouterLink>
            <button
              data-bs-toggle="modal"
              data-bs-target="#reportBugModal"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
              class="btn mr-1 cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[red] h-7 rounded-md px-2"
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
                      @click="handleDeleteUser(user.user_id)"
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
            <button
              @click="handleEnableDisableUser(user.user_id, user.is_verify)"
              style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
              class="btn mr-1 cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[orange] h-7 rounded-md px-2"
            >
              <font-awesome-icon
                icon="fa-solid fa-user-lock"
                style="font-size: 13px"
              />
            </button>
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
              'bg-gray-100 text-gray-700': userStore.currentPage === 1,
              'text-gray-500': userStore.currentPage !== 1,
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
              'bg-blue-50 text-blue-600': userStore.currentPage === page,
              'text-gray-500': userStore.currentPage !== page,
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {{ page }}
          </a>
        </li>
        <li v-if="endPage < userStore.totalPages">
          <a
            @click.prevent="goToPage(userStore.totalPages)"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >{{ userStore.totalPages }}</a
          >
        </li>
        <li>
          <a
            @click.prevent="nextPage"
            :class="{
              'bg-gray-100 text-gray-700':
                userStore.currentPage === userStore.totalPages,
              'text-gray-500': userStore.currentPage !== userStore.totalPages,
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
import { useUserStore } from "@/stores/user";
import { onMounted, ref, computed } from "vue";
import { RouterLink } from "vue-router";
const userStore = useUserStore();
const searchQuery = ref(userStore.searchQuery);
// Create a debounced version of the search function using lodash

// Function to handle search
function handleSearch() {
  userStore.searchUsers(searchQuery.value);
}

const maxPagesToShow = 5; // Maximum number of pages to display

const startPage = computed(() =>
  Math.max(1, userStore.currentPage - Math.floor(maxPagesToShow / 2))
);
const endPage = computed(() =>
  Math.min(userStore.totalPages, startPage.value + maxPagesToShow - 1)
);
const pagesArray = computed(() => {
  const pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

const handleDeleteUser = (id) => {
  userStore.deleteUser(id);
};

const handleEnableDisableUser = async (id, is_verify) => {
  const data = {
    is_verify: !is_verify,
  };
  await userStore.enableDisableUser(id, data);
};

onMounted(() => {
  userStore.fetchUser();
});

function prevPage() {
  if (userStore.currentPage > 1) {
    userStore.goToPage(userStore.currentPage - 1);
  }
}

function nextPage() {
  if (userStore.currentPage < userStore.totalPages) {
    userStore.goToPage(userStore.currentPage + 1);
  }
}

function goToPage(page) {
  userStore.goToPage(page);
}
</script>
