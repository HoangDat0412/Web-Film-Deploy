import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import HomeLayout from "../layout/HomeLayout/HomeLayout.vue";
import AdminLayout from "../layout/AdminLayout/AdminLayoutView.vue";
import LoginLayout from "../layout/LoginLayout/LoginLayout.vue";
import FilmDetail from "../views/FilmDetail/FilmDetailView.vue";
import SearchFilmView from "../views/SearchFilm/SearchFilmView.vue";
import Profile from "../views/Profile/ProfileView.vue";
import Login from "../views/Login/LoginView.vue";
import Register from "../views/Register/RegisterView.vue";
import ManagerUser from "../views/ManagerUser/ManagerUserView.vue";
import ManagerFilm from "../views/ManagerFilm/ManagerFilmView.vue";
import ManagerCheckout from "../views/ManagerCheckout/ManagerCheckoutView.vue";
import CreateFilm from "../views/CreateFilm/CreateFilmView.vue";
import UpdateFilm from "../views/UpdateFilm/UpdateFilmView.vue";
import UpdateUser from "../views/UpdateUser/UpdateUserView.vue";
import ManagerCheckoutBitcoin from "../views/ManagerCheckoutBitcoin/ManagerCheckoutBitcoin.vue";
import Dashboard from "../views/Dashboard/DashboardView.vue";

import ForgetPassword from "@/views/ForgetPassword/ForgetPassword.vue";
import ListFilmItem from "@/views/ListFilmItem/ListFilmItem.vue";
import BlogLayout from "@/layout/BlogLayout/BlogLayout.vue";
import BlogHomeView from "@/views/BlogHome/BlogHomeView.vue";
import ManagerActor from "@/views/ManagerActor/ManagerActor.vue";
import ManagerDirectorView from "@/views/ManagerDirector/ManagerDirectorView.vue";
import ManagerGenreView from "@/views/ManagerGenre/ManagerGenreView.vue";
import ManagerReportBugView from "@/views/ManagerReportBug/ManagerReportBugView.vue";
import ManagerRequestFeatureView from "@/views/ManagerRequestFeature/ManagerRequestFeatureView.vue";
import FilmFilterView from "@/views/FilmFilter/FilmFilterView.vue";
import ManagerBlogView from "@/views/ManagerBlog/ManagerBlogView.vue";
import FilmTopViewView from "@/views/FilmTopView/FilmTopViewView.vue";
import BlogContentView from "@/views/BlogContent/BlogContentView.vue";
import DashboardUser from "@/components/DashboardUser/DashboardUser.vue";
import DashboardFilm from "@/components/DashboardFilm/DashboardFilm.vue";
import CreateBlogV2 from "@/views/CreateBlog/CreateBlogV2.vue";
import FilmToprateView from "@/views/FilmToprate/FilmToprateView.vue";
import UserInformation from "@/components/UserInformation/UserInformation.vue";
import NewLoginView from "@/views/Login/NewLoginView.vue";

const BlogForYouView = () =>
  import("@/views/BlogForYouView/BlogForYouView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/blog",
      name: "bloglayout",
      component: BlogLayout,
      children: [
        {
          path: "/blog",
          name: "bloghome",
          component: BlogHomeView,
          children: [
            {
              path: "/blog/:sort",
              name: "blogforyou",
              component: BlogForYouView,
            },
          ],
        },
        {
          path: "/blog/new-blog",
          name: "newblog",
          component: CreateBlogV2,
        },
        {
          path: "/blog/content/:id",
          name: "blogcontent",
          component: BlogContentView,
        },
      ],
    },
    {
      path: "/",
      name: "homelayout",
      component: HomeLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/filmdetail/:id",
          component: FilmDetail,
        },

        {
          path: "/search/:name/:page?",
          component: SearchFilmView,
          name: "search",
        },

        {
          path: "/filter",
          component: FilmFilterView,
          name: "filter",
        },
        {
          path: "/most-view",
          component: FilmTopViewView,
          name: "mostview",
        },
        {
          path: "/top-rate",
          component: FilmToprateView,
          name: "toprate",
        },

        {
          path: "/profile",
          component: Profile,
        },
        {
          path: "/edit-profile",
          component: UserInformation,
        },
        {
          path: "/list/:id",
          component: ListFilmItem,
        },
      ],
    },
    {
      path: "/admin",
      name: "adlayout",
      component: AdminLayout,
      children: [
        {
          path: "/admin",
          component: Dashboard,
          children: [
            {
              path: "/admin/dashboard-user",
              component: DashboardUser,
            },
            {
              path: "/admin/dashboard-film",
              component: DashboardFilm,
            },
          ],
        },
        {
          path: "/admin/user",
          component: ManagerUser,
        },
        {
          path: "/admin/film",
          component: ManagerFilm,
        },
        {
          path: "/admin/actor",
          component: ManagerActor,
        },
        {
          path: "/admin/director",
          component: ManagerDirectorView,
        },
        {
          path: "/admin/genres",
          component: ManagerGenreView,
        },
        {
          path: "/admin/bug",
          component: ManagerReportBugView,
        },
        {
          path: "/admin/request-feature",
          component: ManagerRequestFeatureView,
        },
        {
          path: "/admin/blog",
          component: ManagerBlogView,
        },
        {
          path: "/admin/checkout",
          component: ManagerCheckout,
        },
        {
          path: "/admin/createfilm",
          component: CreateFilm,
        },

        {
          path: "/admin/updatemovie/:id",
          component: UpdateFilm,
        },
        {
          path: "/admin/updateuser/:id",
          component: UpdateUser,
        },
        {
          path: "/admin/checkoutbitcoin",
          component: ManagerCheckoutBitcoin,
        },
      ],
      // meta: { requiresAuth: true },
    },
    {
      path: "/",
      name: "loginlayout",
      component: LoginLayout,
      children: [
        {
          path: "/login",
          component: Login,
          // component: NewLoginView,
        },
        {
          path: "/register",
          component: Register,
        },
        {
          path: "/forgetpassword",
          component: ForgetPassword,
        },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { top: 0, left: 0 }; // cuộn lên đầu trang
  //   }
  // },
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();
//   const role = userStore?.userInformation?.role; // Giả sử bạn có getter để kiểm tra trạng thái đăng nhập

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (role !== "admin") {
//       next("/login"); // Chuyển hướng về trang đăng nhập nếu không có quyền truy cập
//     } else {
//       next(); // Cho phép tiếp tục nếu đã đăng nhập
//     }
//   } else {
//     next(); // Không cần xác thực, cho phép tiếp tục
//   }
// });

export default router;
