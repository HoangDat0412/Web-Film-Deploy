<script setup>
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
const route = useRoute();
const user = useUserStore();
import { ValidateEmail, checkNull } from "@/validation/validation";
import { ref } from "vue";
import { useLoadingStore } from "@/stores/loading";
const userName = ref("");
const role = ref("");
const email = ref("");
const errorUserName = ref("");
const errorEmail = ref("");
const loading = useLoadingStore();

onBeforeMount(async () => {
  loading.setLoading(true);
  await user.getUserById(route.params.id);
  userName.value = user.userUpdate?.username;
  email.value = user.userUpdate?.email;
  role.value = user.userUpdate?.role;
  loading.setLoading(false);
});

const handleUpdate = async () => {
  !checkNull(email.value)
    ? (errorEmail.value = "email không được bỏ trống")
    : (errorEmail.value = "");
  !checkNull(userName.value)
    ? (errorUserName.value = "userName không được bỏ trống")
    : (errorUserName.value = "");
  !ValidateEmail(email.value)
    ? (errorEmail.value = "email không tồn tại")
    : (errorEmail.value = "");

  const data = {
    email: email.value,
    username: userName.value,
    role: role.value,
  };
  const flag =
    checkNull(email.value) &&
    checkNull(userName.value) &&
    ValidateEmail(email.value);
  if (flag) {
    await user.updateUser(route.params.id, data);
  }
};
</script>

<template>
  <main>
    <div>
      <h3 class="text-3xl text-gray-900">Update User</h3>
      <form className="mt-4">
        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-labe text-gray-900 mb-2">User Name</label>
              <input
                type="text"
                v-model="userName"
                name="userName"
                className="form-control"
              />

              <p style="color: red">{{ errorUserName }}</p>
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label text-gray-900">Email</label>

              <input
                type="email"
                v-model="email"
                name="email"
                className="form-control"
              />
              <p style="color: red">{{ errorEmail }}</p>
            </div>
          </div>
          <div className="col">
            <label className="form-label text-gray-900 ">User Type</label>

            <div data-mdb-input-init className="form-outline">
              <select name="role" v-model="role" className="form-select">
                <option value="user">USER</option>
                <option value="client">CLIENT</option>
                <option value="staff">STAFF</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
        </div>
        <button
          data-mdb-ripple-init
          type="button"
          @click="() => handleUpdate()"
          className="btn btn-primary btn-block mb-4"
        >
          Update
        </button>
      </form>
    </div>
  </main>
</template>
