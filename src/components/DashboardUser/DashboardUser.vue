<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          ID
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Tên
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Email
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Ngày đăng ký
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(user, index) in userStore.userList" :key="index">
        <td
          class="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {{ user.user_id }}
        </td>
        <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
          {{ user.username }}
        </td>
        <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
          {{ user.email }}
        </td>
        <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
          {{ user.created_at.split("T")[0] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>

<style lang="scss" scoped></style>
