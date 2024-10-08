<template>
  <Notifications
    group="notification"
    position="top right"
    dangerously-set-inner-html
    :speed="500"
  />
</template>

<script setup>
import { useNotificationStore } from "@/stores/notification";
const notification = useNotificationStore();

const props = defineProps(["type", "text", "title"]);
</script>

<style lang="scss" scoped>
/*
  EXAMPLES
*/

.notification.n-light {
  margin: 10px;
  margin-bottom: 0;

  border-radius: 3px;
  font-size: 13px;

  padding: 10px 20px;

  color: #495061;
  background: #eaf4fe;

  border: 1px solid #d4e8fd;

  .notification-title {
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 10px;
    color: #2589f3;
  }
}

.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  text-align: left;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;

  &,
  & > div {
    box-sizing: border-box;
  }

  background: #e8f9f0;
  border: 2px solid #d0f2e1;

  .custom-template-icon {
    flex: 0 1 auto;
    color: #15c371;
    font-size: 32px;
    padding: 0 10px;
  }

  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;

    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }
}

.block {
  display: flex;
}

.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all 0.5s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-500px) scale(0.2);
}
</style>
