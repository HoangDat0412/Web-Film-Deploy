<script setup>
// import router from "@/router";
// import { useUserStore } from "@/stores/user";
// import { onBeforeMount } from "vue";
// const user = useUserStore();
// onBeforeMount(async () => {
//   await user.getUserInformation();
//   if (
//     user?.userInformation?.role !== "admin" &&
//     user?.userInformation?.role !== "STAFF"
//   ) {
//     router.push("/");
//   }
// });
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { useUserStore } from "@/stores/user";
import { RouterLink, RouterView } from "vue-router";
import router from "@/router";
import logoFilm from "@/assets/logofilmv2.jpg";
import { onBeforeUnmount, onMounted, watchEffect } from "vue";

const userStore = useUserStore();
const handleLogout = () => {
  userStore.logout();
  router.push({ path: "/login" });
};

onMounted(() => {
  document.body.style.backgroundColor = "white";
});

onBeforeUnmount(() => {
  document.body.style.backgroundColor = "#424040";
});

watchEffect(async () => {
  await userStore.getUserInformation();
});
import Notification from "@/components/Notification/Notification.vue";
</script>

<template>
  <div>
    <Notification />

    <nav
      class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      style="border-bottom: solid 1px #d3d3d3"
    >
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="/" class="flex ms-2 md:me-24">
              <img :src="logoFilm" class="h-8 me-3" alt="FilmSearch Logo" />
            </a>
          </div>
          <div class="flex items-center">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="btn inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <img
                    class="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                    :src="userStore?.userInformation?.avatar_url"
                    alt=""
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="/"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Account settings</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Support</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >License</a
                      >
                    </MenuItem>
                    <form method="POST" action="#">
                      <MenuItem v-slot="{ active }">
                        <a
                          type="submit"
                          :class="[
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm',
                          ]"
                          @click="handleLogout"
                        >
                          Sign out
                        </a>
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 bg-gray-50 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
      style="box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium" style="padding-left: 0">
          <li>
            <RouterLink
              to="/admin/dashboard-user"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path
                  d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                />
                <path
                  d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                />
              </svg>
              <span class="ms-3">Dashboard</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/admin/user"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path
                  d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/admin/film"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <font-awesome-icon
                icon="fa-solid fa-film"
                class="text-gray-700 w-5 h-5"
              />
              <span class="flex-1 ms-3 whitespace-nowrap">Film</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/admin/actor"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <font-awesome-icon
                icon="fa-solid fa-user"
                class="text-gray-700 w-5 h-5"
              />
              <span class="flex-1 ms-3 whitespace-nowrap">Actors</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/director"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <font-awesome-icon
                icon="fa-solid fa-user"
                class="text-gray-700 w-5 h-5"
              />
              <span class="flex-1 ms-3 whitespace-nowrap">Directors</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/admin/genres"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <font-awesome-icon
                icon="fa-solid fa-film"
                class="text-gray-700 w-5 h-5"
              />
              <span class="flex-1 ms-3 whitespace-nowrap">Film Types</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/admin/bug"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <font-awesome-icon
                icon="fa-solid fa-bug"
                class="text-gray-700 w-5 h-5"
              />
              <span class="flex-1 ms-3 whitespace-nowrap">Report Bug</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/admin/request-feature"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <font-awesome-icon
                icon="fa-solid fa-comment-medical"
                class="text-gray-700 w-5 h-5"
              />
              <span class="flex-1 ms-3 whitespace-nowrap">Request Feature</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/admin/blog"
              class="flex admin-active-link items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <font-awesome-icon
                icon="fa-solid fa-blog"
                class="text-gray-700 w-5 h-5"
              />
              <span class="flex-1 ms-3 whitespace-nowrap">Blogs</span>
            </RouterLink>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"
                />
                <path
                  d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"
                />
                <path
                  d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <div class="p-4 sm:ml-64 bg-white">
      <div style="padding-top: 60px">
        <RouterView />
      </div>
    </div>
  </div>
</template>
