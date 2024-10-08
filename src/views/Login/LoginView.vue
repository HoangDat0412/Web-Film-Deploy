<script setup>
import { ref } from "vue";
import { checkNull, ValidateEmail } from "@/validation/validation";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const email = ref("");
const passWord = ref("");
const errors = ref({ email: "", password: "", recaptcha: "" });
const recaptchaToken = ref(null);

const validateForm = () => {
  let valid = true;

  if (!checkNull(email.value)) {
    errors.value.email = "Email không được bỏ trống";
    valid = false;
  } else if (!ValidateEmail(email.value)) {
    errors.value.email = "Email không tồn tại";
    valid = false;
  } else {
    errors.value.email = "";
  }

  if (!checkNull(passWord.value)) {
    errors.value.password = "Password không được bỏ trống";
    valid = false;
  } else {
    errors.value.password = "";
  }
  try {
    recaptchaToken.value = window.grecaptcha.getResponse();
  } catch (err) {
    console.log(err);
  }
  // if (!recaptchaToken.value) {
  //   errors.value.recaptcha = "Vui lòng xác nhận reCAPTCHA";
  //   valid = false;
  // } else {
  //   errors.value.recaptcha = "";
  // }

  return valid;
};

const handleLogin = async () => {
  if (validateForm()) {
    const data = {
      recaptchaToken: recaptchaToken.value,
      email: email.value,
      password: passWord.value,
    };
    await user.login(data);
  }
};
</script>

<template>
  <main>
    <div class="jss2526 mb-5">
      <div class="signin">
        <RouterLink to="/">
          <h2 class="text-center logo-film-login pb-3">
            <img width="100px" src="../../assets/logofilmv2.jpg" alt="" />
          </h2>
        </RouterLink>

        <div class="mb-3 mt-2">
          <h4 class="text-2xl">Đăng nhập</h4>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group position-relative mb-2">
            <label for="email">Email</label>
            <input
              name="email"
              class="form-control"
              type="email"
              v-model="email"
              autocomplete="username"
            />
            <p style="color: red">{{ errors.email }}</p>
          </div>

          <div class="form-group position-relative mb-2">
            <div class="flex justify-between">
              <label for="passWord">Mật Khẩu</label>
              <RouterLink to="/forgetpassword">Quên mật khẩu?</RouterLink>
            </div>
            <input
              name="passWord"
              class="form-control"
              type="password"
              v-model="passWord"
              autocomplete="current-password"
            />
            <p style="color: red">{{ errors.password }}</p>
          </div>

          <!-- reCAPTCHA -->
          <div
            class="g-recaptcha"
            data-sitekey="6LeTxkgqAAAAAOME8lmIG75aagbiOgF4PvcXi2DA"
          ></div>
          <!-- <p style="color: red">{{ errors.recaptcha }}</p> -->

          <button class="btn login-btn mt-2 container" type="submit">
            Đăng Nhập
          </button>

          <div class="divider-container">
            <hr class="left-hr" />
            <p>Chưa có tài khoản?</p>
            <hr class="right-hr" />
          </div>

          <RouterLink to="/register" class="mt-1 register-btn">
            Đăng ký ngay!
          </RouterLink>
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "./LoginView.scss";
</style>
