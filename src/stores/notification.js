// store/notificationStore.js
import { defineStore } from "pinia";

import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification();

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    id: 0,
  }),
  actions: {
    show(group = "notification", type = "", text = "", title = "") {
      notification.notify({
        group,
        title,
        text,
        type,
      });
    },
  },
});
