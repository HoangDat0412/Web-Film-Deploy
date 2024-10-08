<script setup>
import { ref } from "vue";
import { checkNull, ValidateEmail } from "@/validation/validation";
import { useUserStore } from "@/stores/user";
const user = useUserStore();
const email = ref("");
const errorEmail = ref("");
const passWord = ref("");
const errorPassword = ref("");
const userName = ref("");
const errorUserName = ref("");

const handleRegister = async () => {
  !checkNull(email.value)
    ? (errorEmail.value = "email không được bỏ trống")
    : (errorEmail.value = "");
  !checkNull(passWord.value)
    ? (errorPassword.value = "passWord không được bỏ trống")
    : (errorPassword.value = "");
  !checkNull(userName.value)
    ? (errorUserName.value = "userName không được bỏ trống")
    : (errorUserName.value = "");
  !ValidateEmail(email.value)
    ? (errorEmail.value = "email không tồn tại")
    : (errorEmail.value = "");

  const data = {
    email: email.value,
    username: userName.value,
    password: passWord.value,
  };
  const flag =
    checkNull(email.value) &&
    checkNull(passWord.value) &&
    checkNull(userName.value) &&
    ValidateEmail(email.value);

  if (flag) {
    await user.register(data);
    console.log("data send", data);
  }
};
</script>

<template>
  <main>
    <div className="jss2526">
      <div className="signin">
        <RouterLink to="/">
          <h2 className="text-center logo-film-login pb-3">
            <img width="100px" src="../../assets/logofilmv2.jpg" alt="" />
          </h2>
        </RouterLink>
        <div class="mb-3 mt-2">
          <h4 class="text-2xl">Đăng Ký</h4>
        </div>
        <div>
          <form>
            <div className="form-group position-relative mb-2">
              <label htmlFor="email" class="mb-1">Email</label>
              <input
                name="email"
                className="form-control"
                type="email"
                v-model="email"
              />
              <p style="color: red">{{ errorEmail }}</p>
            </div>
            <div className="form-group position-relative mb-2">
              <label htmlFor="userName" class="mb-1">Tài Khoản</label>
              <input
                name="userName"
                className="form-control"
                type="text"
                v-model="userName"
              />
              <p style="color: red">{{ errorUserName }}</p>
            </div>
            <div class="form-group position-relative mb-2">
              <label htmlFor="passWord" class="mb-1">Mật Khẩu</label>
              <input
                name="passWord"
                className="form-control"
                type="password"
                v-model="passWord"
              />
              <p style="color: red">{{ errorPassword }}</p>
            </div>
            <button
              class="btn login-btn mt-1 container mb-3"
              @click.prevent="() => handleRegister()"
            >
              Đăng Ký
            </button>
            <hr />
            <div class="flex mt-2">
              <p class="mr-4">Đã có tài khoản?</p>
              <RouterLink to="/login" class="text-yellow-500">
                Đăng nhập</RouterLink
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("./RegisterView.scss");
</style>
