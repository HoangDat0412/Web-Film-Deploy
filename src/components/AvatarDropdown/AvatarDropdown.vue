<template>
  <div class="dropdown">
    <RouterLink
      to="/profile"
      class="avatar me-0 me-lg-3"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img :src="props.avatar" class="rounded-circle" alt="avatar" />
      <!-- <Avatar name="Ngu" /> -->
    </RouterLink>

    <ul class="dropdown-menu dropdown-menu-dark">
      <li>
        <a href="/profile">
          <h5 class="text-lg font-semibold text-white pt-2 px-3">
            {{ user.userInformation.username }}
          </h5>
          <h6 class="dropdown-header">Xem hồ sơ</h6>
        </a>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <a class="dropdown-item" href="/edit-profile">Playlist</a>
      </li>
      <li>
        <a class="dropdown-item" href="/edit-profile">Watchlist</a>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <a class="dropdown-item" href="/edit-profile">Sửa thông tin</a>
      </li>
      <li>
        <a @click="user.logout()" href="#" class="dropdown-item">Đăng xuất</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const props = defineProps("avatar");
</script>

<style lang="scss" scoped></style>
