<script setup>
import router from "@/router";
// import { useFilmStore } from '@/stores/film';
import { useRoute } from "vue-router";
import "./footer.scss";
const route = useRoute();
// const film = useFilmStore()
const handleSearch = async (type) => {
  router.push({ path: `/type/${type}/1` });
};
const handleCountry = async (type) => {
  // if (route.name !== "country") {
  //   router.push({ path: `/country/${type}` })
  // }
  // else {
  //   router.push({ path: `${type}` })
  // }
  router.push({ path: `/country/${type}/1` });
};
</script>

<template>
  <main>
    <hr />
    <footer class="main" style="margin-top: 70px">
      <div class="fbox mt-3 mt-lg-4">
        <div class="fcmpbox">
          <div class="primary row">
            <div class="fotlogo col-12 col-lg-4">
              <div class="logo">
                <img width="100px" src="../../assets/logofilm.png" alt="" />
              </div>
              <div class="text">
                <p>
                  - Trang xem phim Online với giao diện mới được bố trí và thiết
                  kế thân thiện với người dùng. Nguồn phim được tổng hợp từ các
                  website lớn với đa dạng các đầu phim và thể loại vô cùng phong
                  phú.
                </p>
              </div>
            </div>
            <div
              class="columenu col-12 col-lg-8 row justify-content-around mt-4 mt-lg-0"
            >
              <div class="item col-12 col-sm-4 d-flex justify-content-center">
                <div>
                  <h4 class="text-2xl" style="color: rgb(255, 150, 88)">
                    Thể Loại Phim
                  </h4>
                  <ul>
                    <li>
                      <a @click="() => handleSearch(`Khoa Học`)"
                        >Phim Khoa Học</a
                      >
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a @click="() => handleSearch(`Bí Ẩn`)"
                        >Phim Siêu Nhiên</a
                      >
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a @click="() => handleSearch(`Kinh Dị`)">Phim Kinh Dị</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a @click="() => handleSearch(`Hài Hước`)"
                        >Phim Hài Hước</a
                      >
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a @click="() => handleSearch(`Hành Động`)"
                        >Phim Hành Động</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="item col-12 col-sm-4 d-flex justify-content-center">
                <div>
                  <h4 class="text-2xl" style="color: rgb(255, 150, 88)">
                    Quốc Gia
                  </h4>
                  <ul>
                    <li>
                      <a @click="() => handleCountry(`Âu Mỹ`)">Phim Âu Mỹ</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a @click="() => handleCountry(`Hàn Quốc`)"
                        >Phim Hàn Quốc</a
                      >
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a @click="() => handleCountry(`Trung Quốc`)"
                        >Phim Trung Quốc</a
                      >
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a @click="() => handleCountry(`Nhật Bản`)"
                        >Phim Nhật Bản</a
                      >
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a @click="() => handleCountry(`Thái Lan`)"
                        >Phim Thái Lan</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="item col-12 col-sm-4 d-flex justify-content-center">
                <div>
                  <h4 class="text-2xl" style="color: rgb(255, 150, 88)">
                    Thông tin
                  </h4>
                  <ul>
                    <li><a href="/gioi-thieu">Giới thiệu</a></li>
                  </ul>
                  <ul>
                    <li><a href="/lien-he-chung-toi">Liên hệ chúng tôi</a></li>
                  </ul>
                  <ul>
                    <li><a href="#">Điều khoản sử dụng</a></li>
                  </ul>
                  <ul>
                    <li>
                      <a href="/chinh-sach-rieng-tu">Chính sách riêng tư</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="/khieu-nai-ban-quyen">Khiếu nại bản quyền</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped></style>
