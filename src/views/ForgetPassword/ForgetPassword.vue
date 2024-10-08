<script setup>
import { ref } from "vue";
import { checkNull, ValidateEmail } from "@/validation/validation";
import { useUserStore } from "@/stores/user";
const user = useUserStore();
const email = ref("");
const errorEmail = ref("");

const handleForgetPassword = async () => {
  if (!checkNull(email.value)) {
    errorEmail.value = "email không được bỏ trống";
  } else {
    errorEmail.value = "";
  }

  !ValidateEmail(email.value)
    ? (errorEmail.value = "email không tồn tại")
    : (errorEmail.value = "");

  const data = {
    email: email.value,

    // full_name: "Tien Dzung",
  };
  const flag = checkNull(email.value) && ValidateEmail(email.value);
  if (flag) {
    await user.forgetPassword(data);
  }
};
</script>
<template>
  <main>
    <div className="jss2526 mb-5">
      <div className="signin">
        <RouterLink to="/">
          <h2 className="text-center logo-film-login pb-3">
            <img width="100px" src="../../assets/logofilmv2.jpg" alt="" />
          </h2>
        </RouterLink>
        <div class="mb-3 mt-2">
          <h4 class="text-2xl">Quên mật khẩu</h4>
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

            <button
              class="btn mt-2 container login-btn"
              @click.prevent="() => handleForgetPassword()"
            >
              Lấy lại mật khẩu
            </button>

            <div style="display: flex; justify-content: flex-end; width: 100%">
              <RouterLink to="/login" class="mt-3">
                Về trang đăng nhập
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("./ForgetPassword.scss");
</style>
