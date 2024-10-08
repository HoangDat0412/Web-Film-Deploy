<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onBeforeMount, watchEffect } from "vue";
import { ValidateEmail, checkNull } from "@/validation/validation";
import { useLoadingStore } from "@/stores/loading";
import avatarNone from "@/assets/img/avatar-none.png";
import { RouterLink } from "vue-router";

const user = useUserStore();
// const favouriteFilm = useFavouriteFilmStore();
// const checkout = useCheckoutStore();
const avatar = ref(null);

console.log("avatar", avatar);

const userName = ref();
const passWord = ref("");
const email = ref("");
const errorPassword = ref("");
const errorNewPassword = ref("");

const errorNewName = ref("");
const errorEmail = ref("");
const loading = useLoadingStore();

const newUserName = ref("");
const newPassword = ref("");
const newEmail = ref("");

const url = ref(null);

watchEffect(async () => {
  loading.setLoading(true);
  await user.getUserInformation();
  // await favouriteFilm.getFavouriteFilm();
  // await checkout.getUserCheckout();
  // await checkout.getUserCheckoutBitcoin();
  loading.setLoading(false);
});

const bio = ref("");

onBeforeMount(async () => {
  await user.getUserInformation();
  userName.value = user?.userInformation?.username;
  email.value = user?.userInformation?.email;
  bio.value = user?.userInformation?.bio;
  avatar.value = user?.userInformation?.avatar_url
    ? user?.userInformation?.avatar_url
    : avatarNone;
});

const handleUploadAvatar = async () => {
  let formData = new FormData();

  formData.append("avatar", avatar.value);
  console.log(formData);

  await user.uploadAvatar(formData);
};

const handleAvatarChange = (e) => {
  avatar.value = e.target.files[0];
  url.value = URL.createObjectURL(avatar.value);
};

const handleUpdateUserName = async () => {
  !checkNull(newUserName.value)
    ? (errorNewName.value = "userName không được bỏ trống")
    : (errorNewName.value = "");

  const data = {
    username: newUserName.value,
  };

  if (checkNull(newUserName.value)) {
    console.log(data);
    await user.userUpdateUserName(data);
    userName.value = newUserName.value;
  }
};
const handleUpdatePassword = async () => {
  !checkNull(newPassword.value)
    ? (errorNewPassword.value = "password mới không được bỏ trống")
    : (errorNewPassword.value = "");

  !checkNull(passWord.value)
    ? (errorPassword.value = "password không được bỏ trống")
    : (errorPassword.value = "");

  const data = {
    oldPassword: passWord.value,
    newPassword: newPassword.value,
  };

  if (checkNull(newPassword.value)) {
    console.log(data);
    await user.userUpdatePassword(data);
    passWord.value = newPassword.value;
  }
};

const handleLogout = async () => {
  await user.logout();
};

const handleUpdateEmail = async () => {
  !checkNull(newEmail.value)
    ? (errorEmail.value = "email không được bỏ trống")
    : (errorEmail.value = "");

  const data = {
    email: newEmail.value,
  };

  if (checkNull(newEmail.value) && ValidateEmail(newEmail.value)) {
    console.log(data);
    await user.userUpdateEmail(data);
    email.value = newEmail.value;
  }
};

const handleUpdateBio = async () => {
  if (checkNull(bio.value)) {
    await user.userUpdateBio({ bio: bio.value });
  }
};
</script>

<template>
  <main>
    <div className="container pt-5 pb-5">
      <div className="row d-flex justify-content-center ">
        <div className="col-12 col-lg-5">
          <form>
            <div
              className="form-group position-relative mb-2"
              class="d-flex flex-column"
            >
              <div class="flex">
                <img :src="url ? url : avatar" />

                <div>
                  <label
                    for="avatar"
                    class="button bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
                    >Chọn avatar</label
                  >
                  <button
                    class="button bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
                    style="margin-left: 10px"
                    type="button"
                    @click="() => handleUploadAvatar()"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>

            <input
              id="avatar"
              className="form-control"
              @change="handleAvatarChange"
              type="file"
              style="display: none"
              accept="image/jpeg, image/png, image/jpg"
            />
          </form>
          <p class="text-gray-300 font-medium">Tiểu sử</p>
          <textarea
            id="content"
            rows="3"
            required
            v-model="bio"
            class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          ></textarea>
          <button
            class="button bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
            style="margin-top: 10px"
            type="button"
            @click="() => handleUpdateBio()"
          >
            Lưu
          </button>
        </div>

        <div className="col-12 col-lg-5 mt-5 mt-lg-0">
          <div
            className="form-group position-relative mb-2 pb-3"
            style="border-bottom: 1px solid gray"
          >
            <p class="text-gray-300 font-medium">Tên người dùng</p>

            <div class="flex justify-between items-center">
              <label htmlFor="email" className="text-gray-300 font-small">
                {{ userName }}
              </label>
              <!-- <input
                  name="userName"
                  className="input  "
                  type="text"
                  v-model="userName"
                />
                <p style="color: red">{{ errorUserName }}</p> -->

              <div
                type="button"
                class="bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
                data-bs-toggle="modal"
                data-bs-target="#usernameModal"
              >
                Thay đổi
              </div>

              <div
                class="modal fade"
                id="usernameModal"
                tabindex="-1"
                aria-labelledby="usernameModalLabel"
                aria-hidden="true"
                ref="modalRef"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="usernameModalLabel"
                        style="color: black"
                      >
                        Thay đổi tên người dùng
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label
                          for="playlist-name"
                          class="col-form-label"
                          style="color: black"
                          >Tên mới:</label
                        >
                        <input
                          v-model="newUserName"
                          type="text"
                          class="form-control"
                          id="playlist-name"
                        />
                        <p style="color: red">{{ errorNewName }}</p>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="handleUpdateUserName"
                      >
                        Thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="form-group position-relative mb-2 pb-3"
            style="border-bottom: 1px solid gray"
          >
            <p class="text-gray-300 font-medium">Mật khẩu</p>
            <div class="flex justify-between items-center">
              <label htmlFor="email" className="text-gray-300 font-small">
                ******
              </label>

              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#passwordModal"
                class="bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
              >
                Thay đổi
              </button>
              <div
                class="modal fade"
                id="passwordModal"
                tabindex="-1"
                aria-labelledby="passwordModalLabel"
                aria-hidden="true"
                ref="modalRef"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="passwordModalLabel"
                        style="color: black"
                      >
                        Thay đổi mật khẩu
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label
                          for="playlist-name"
                          class="col-form-label"
                          style="color: black"
                          >Mật khẩu cũ:</label
                        >
                        <input
                          v-model="passWord"
                          type="text"
                          class="form-control"
                          id="playlist-name"
                        />
                        <p style="color: red">{{ errorPassword }}</p>
                        <label
                          for="playlist-name"
                          class="col-form-label"
                          style="color: black"
                          >Mật khẩu mới:</label
                        >
                        <input
                          v-model="newPassword"
                          type="text"
                          class="form-control"
                          id="playlist-name"
                        />
                        <p style="color: red">{{ errorNewPassword }}</p>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="handleUpdatePassword"
                      >
                        Thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group position-relative mb-2">
            <p class="text-gray-300 font-medium">Email</p>
            <div class="flex justify-between items-center">
              <label htmlFor="email" className="text-gray-300 font-small">
                {{ email }}
              </label>

              <div
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#emailModal"
                class="bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
              >
                Thay đổi
              </div>
              <div
                class="modal fade"
                id="emailModal"
                tabindex="-1"
                aria-labelledby="emailModalLabel"
                aria-hidden="true"
                ref="modalRef"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="emailModalLabel"
                        style="color: black"
                      >
                        Thay đổi email
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label
                          for="playlist-name"
                          class="col-form-label"
                          style="color: black"
                          >Email mới:</label
                        >
                        <input
                          v-model="newEmail"
                          type="text"
                          class="form-control"
                          id="playlist-name"
                        />
                        <p style="color: red">{{ errorEmail }}</p>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="handleUpdateEmail"
                      >
                        Thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>

        <hr />
        <div className="col-12 col-lg-5 mt-5 mt-lg-0"></div>
        <div className="col-12 col-lg-5 mt-5 mt-lg-0">
          <!-- <ul className="list-group mt-2">
            <li className="list-group-item text-muted">Hoạt động</li>

            <li className="list-group-item text-right">
              <span className="float-left">
                <strong
                  >Phim yêu thích:
                  {{ favouriteFilm.listFavouriteFilm?.length }}</strong
                >
              </span>
            </li>
          </ul> -->
          <div class="d-flex float-end mt-3">
            <RouterLink
              v-if="
                user?.userInformation?.role === `admin` ||
                user?.userInformation?.role === `STAFF`
              "
              class="button bg-gray-600 mr-2 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
              style="background-color: #ea148c; font-weight: 600"
              to="/admin/dashboard-user"
            >
              Go To Admin Page
            </RouterLink>

            <RouterLink
              to="/"
              style="height: 40px"
              class="button bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400 shadow-lg shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 button"
              @click="handleLogout"
              >Đăng xuất
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
@import url("./UserInformation.scss");
</style>
