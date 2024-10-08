import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueSocialSharing from "vue-social-sharing";
import Notifications from "@kyvg/vue3-notification";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faBars,
  faFilm,
  faList,
  faHome,
  faMoneyCheck,
  faUser,
  faSearch,
  faBookmark,
  faBell,
  faShare,
  faStar,
  faBlog,
  faEdit,
  faDeleteLeft,
  faTrash,
  faFlag,
  faCommentMedical,
  faBug,
  faWrench,
  faPenNib,
  faCheck,
  faEllipsis,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsDown,
  faThumbsUp,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(
  faUser,
  faBars,
  faList,
  faHome,
  faFilm,
  faMoneyCheck,
  faSearch,
  faBookmark,
  faBell,
  faThumbsDown,
  faThumbsUp,
  faShare,

  faStar,
  faBlog,
  faEdit,
  faDeleteLeft,
  faTrash,
  faTwitter,
  faTelegram,
  faFacebookMessenger,
  faFacebook,
  faFlag,
  faCommentMedical,
  faBug,
  faWrench,
  faPenNib,
  faCheck,
  faTrashCan,
  faUserLock
  // faEllipsis
);

import {
  faFacebook,
  faFacebookMessenger,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// import the pagination lib
import VueAwesomePaginate from "vue-awesome-paginate";
// import { VueReCaptcha } from 'vue-recaptcha-v3';
import "vue-awesome-paginate/dist/style.css";
import { createHead } from "@unhead/vue";
const pinia = createPinia();

const app = createApp(App);
const head = createHead(); // Create a head instance

app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("QuillEditor", QuillEditor);

app.use(Notifications);

app.use(VueAwesomePaginate);
app.use(VueSocialSharing);
app.use(router);
app.use(head);

app.mount("#app");
