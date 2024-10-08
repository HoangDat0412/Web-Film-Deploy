<template>
  <div
    class="modal fade"
    id="reportBugModal"
    tabindex="-1"
    aria-labelledby="reportBugModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reportBugModalLabel" style="color: black">
            Bạn có chắc chắn xóa phim này
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn-modal btn-primary"
            data-bs-dismiss="modal"
          >
            {{ props.action }}
          </button>
          <button
            type="button"
            class="btn-modal btn-secondary"
            data-bs-dismiss="modal"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["action"]);

// data-bs-toggle="modal"
// data-bs-target="#reportBugModal"
</script>

<style lang="scss" scoped></style>
