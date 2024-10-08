
import { defineStore } from "pinia";
// import { TOKEN } from "@/utils/config";
export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isSidebarOpen:true,
    page:"eCommerce",
    selected:"Dashboard"
  }),
  getters: {},
  actions: {

  },
});
