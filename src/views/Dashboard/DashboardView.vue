<template>
  <div class="">
    <!-- Page Header -->
    <header class="mt-1 pb-1 border-b dark:border-gray-700">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard
      </h2>
    </header>

    <!-- Dashboard Overview -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <!-- Total Movies Card -->
      <div
        class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <RouterLink to="/admin/film">
          <div class="flex align-middle justify-between">
            <h6
              class="text-l font-semibold tracking-tight text-gray-700 dark:text-white"
            >
              Total Films
            </h6>
            <font-awesome-icon icon="fa-solid fa-film" class="text-gray-700" />
          </div>
          <h5
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ dashboardStore.totalFilms }}
          </h5>
        </RouterLink>
        <a
          class="inline-flex font-medium items-center text-gray-700 dark:text-white hover:underline"
          style="font-size: 14px"
        >
          +{{ dashboardStore.filmsThisWeek }} this week
        </a>
      </div>

      <!-- Total User Card -->
      <div
        class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <RouterLink to="/admin/user">
          <div class="flex align-middle justify-between">
            <h6
              class="text-l font-semibold tracking-tight text-gray-700 dark:text-white"
            >
              Total Activate Users
            </h6>
            <font-awesome-icon icon="fa-solid fa-user" class="text-gray-700" />
          </div>
          <h5
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ dashboardStore.totalActivatedUsers }}
          </h5>
        </RouterLink>
        <a
          class="inline-flex font-medium items-center text-gray-700 dark:text-white hover:underline"
          style="font-size: 14px"
        >
          +{{ dashboardStore.usersThisWeek }} this week
        </a>
      </div>

      <!-- Total Star Card -->
      <div
        class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex align-middle justify-between">
          <h6
            class="text-l font-semibold tracking-tight text-gray-700 dark:text-white"
          >
            Total Rate
          </h6>
          <font-awesome-icon icon="fa-solid fa-star" class="text-gray-700" />
        </div>
        <a href="#">
          <h5
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ dashboardStore.totalRates }}
          </h5>
        </a>
        <a
          class="inline-flex font-medium items-center text-gray-700 dark:text-white hover:underline"
          style="font-size: 14px"
        >
          +{{ dashboardStore.ratesThisWeek }} this week
        </a>
      </div>

      <div
        class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <RouterLink to="/admin/bug">
          <div class="flex align-middle justify-between">
            <h6
              class="text-l font-semibold tracking-tight text-gray-700 dark:text-white"
            >
              Total Roport Bugs
            </h6>
            <font-awesome-icon icon="fa-solid fa-bug" class="text-gray-700" />
          </div>
          <h5
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ dashboardStore.totalReportBugs }}
          </h5>
        </RouterLink>

        <a
          class="inline-flex font-medium items-center text-gray-700 dark:text-white hover:underline"
          style="font-size: 14px"
        >
          +{{ dashboardStore.bugsThisWeek }} this week
        </a>
      </div>

      <div
        class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <RouterLink to="/admin/blog">
          <div class="flex align-middle justify-between">
            <h6
              class="text-l font-semibold tracking-tight text-gray-700 dark:text-white"
            >
              Total Blog
            </h6>
            <font-awesome-icon icon="fa-solid fa-blog" class="text-gray-700" />
          </div>
          <h5
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ dashboardStore.totalBlogs }}
          </h5>
        </RouterLink>
        <a
          class="inline-flex font-medium items-center text-gray-700 dark:text-white hover:underline"
          style="font-size: 14px"
        >
          +{{ dashboardStore.blogsThisWeek }} this week
        </a>
      </div>

      <div
        class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <RouterLink to="/admin/film">
          <div class="flex align-middle justify-between">
            <h6
              class="text-l font-semibold tracking-tight text-gray-700 dark:text-white"
            >
              Total Actor
            </h6>
            <font-awesome-icon icon="fa-solid fa-user" class="text-gray-700" />
          </div>

          <h5
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ dashboardStore.totalActors }}
          </h5>
        </RouterLink>
        <a
          class="inline-flex font-medium items-center text-gray-700 dark:text-white hover:underline"
          style="font-size: 14px"
        >
          +{{ dashboardStore.actorsThisWeek }} this week
        </a>
      </div>

      <div
        class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex align-middle justify-between">
          <h6
            class="text-l font-semibold tracking-tight text-gray-700 dark:text-white"
          >
            Total Film Type
          </h6>
          <font-awesome-icon icon="fa-solid fa-star" class="text-gray-700" />
        </div>
        <a href="#">
          <h5
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ dashboardStore.totalFilmTypes }}
          </h5>
        </a>
        <a
          class="inline-flex font-medium items-center text-gray-700 dark:text-white hover:underline"
          style="font-size: 14px"
        >
          +{{ dashboardStore.filmTypesThisWeek }} this week
        </a>
      </div>

      <div
        class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex align-middle justify-between">
          <h6
            class="text-l font-semibold tracking-tight text-gray-700 dark:text-white"
          >
            Total Countries
          </h6>
          <font-awesome-icon icon="fa-solid fa-star" class="text-gray-700" />
        </div>
        <a href="#">
          <h5
            class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ dashboardStore.totalCountries }}
          </h5>
        </a>
        <a
          class="inline-flex font-medium items-center text-gray-700 dark:text-white hover:underline"
          style="font-size: 14px"
        >
          +{{ dashboardStore.countriesThisWeek }} this week
        </a>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
      <div class="flex">
        <RouterLink
          class="underline-active-link text-gray-900 dark:text-white text-lg font-medium mr-4 mb-2"
          :to="{ path: '/admin/dashboard-user' }"
          >New Users</RouterLink
        >
        <RouterLink
          class="underline-active-link text-gray-900 dark:text-white text-lg font-medium mr-4 mb-2"
          :to="{ path: '/admin/dashboard-film' }"
          >New Films</RouterLink
        >
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminDashboardStore } from "@/stores/adminDashboard";
import { onBeforeMount } from "vue";

const dashboardStore = useAdminDashboardStore();

onBeforeMount(() => {
  dashboardStore.getStaticDashboard();
});
</script>

<style scoped></style>
