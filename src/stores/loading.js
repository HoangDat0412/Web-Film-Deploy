import { defineStore } from "pinia";
// import { TOKEN } from "@/utils/config";
export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading:false,
    model:false
  }),
  getters: {
    
  },
  actions: {
    setLoading(data){
        this.isLoading = data
    }
  },
});

