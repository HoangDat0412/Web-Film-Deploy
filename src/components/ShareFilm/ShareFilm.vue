<template>
  <div
    :style="{ backgroundColor: props.color }"
    class="p-2 rounded-sm"
    :title="network"
  >
    <ShareNetwork :network="network" :url="url">
      <font-awesome-icon
        :icon="[
          'fab',
          network === 'messenger' ? 'facebook-messenger' : network,
        ]"
        class="mr-2"
      />
      <span class="text-white-100">Share on {{ capitalize(network) }}</span>
    </ShareNetwork>
  </div>
</template>
<script setup>
import { capitalize } from "lodash";

const props = defineProps(["url", "network", "color"]);
const network = props.network;
const url = props.url;
</script>
