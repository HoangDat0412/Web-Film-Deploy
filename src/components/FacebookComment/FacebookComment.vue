<template>
  <div
    class="fb-comments"
    :data-href="url"
    :data-width="width"
    :data-numposts="numposts"
  ></div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "100%",
  },
  numposts: {
    type: Number,
    default: 5,
  },
});

onMounted(() => {
  if (typeof FB !== "undefined") {
    FB.XFBML.parse();
  }
});
</script>
