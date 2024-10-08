<template>
  <div
    style="
      animation: slideInFromLeft 1s ease-out;
      background: linear-gradient(
        to top,
        rgba(30, 64, 175, 0.8),
        rgba(139, 92, 246, 0.3)
      );
    "
    class="max-w-md w-full rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
  >
    <h2
      style="animation: appear 2s ease-out"
      class="text-center text-4xl font-extrabold text-white"
    >
      Welcome
    </h2>
    <p style="animation: appear 3s ease-out" class="text-center text-gray-200">
      Sign in to your account
    </p>
    <form method="POST" action="#" class="space-y-6">
      <div class="relative">
        <input
          placeholder="john@example.com"
          class="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
          required=""
          id="email"
          name="email"
          type="email"
        />
        <label
          class="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
          for="email"
          >Email
        </label>
      </div>
      <div class="relative">
        <input
          placeholder="Password"
          class="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
          required=""
          id="password"
          name="password"
          type="password"
        />
        <label
          class="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
          for="password"
          >Mật khẩu</label
        >
      </div>
      <div class="flex items-center justify-between">
        <label class="flex items-center text-sm text-gray-200">
          <input
            class="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
            type="checkbox"
          />
          <span class="ml-2">Ghi nhớ</span>
        </label>
        <a class="text-sm text-purple-200 hover:underline" href="#"
          >Quên mật khẩu?</a
        >
      </div>
      <button
        class="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
        type="submit"
      >
        Đăng nhập
      </button>
    </form>
    <div class="text-center text-gray-300">
      Chưa có tài khoản?
      <a class="text-purple-300 hover:underline" href="#">Đăng ký</a>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
