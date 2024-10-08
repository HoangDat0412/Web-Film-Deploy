<script setup>
import { useCheckoutStore } from "@/stores/checkout";
import { watchEffect } from "vue";
import { useUserStore } from "@/stores/user";
const checkout = useCheckoutStore();
const loading = useLoadingStore();
const user = useUserStore();
import moment from "moment";
import { useLoadingStore } from "@/stores/loading";

watchEffect(async () => {
  loading.setLoading(true);
  await checkout.getAllCheckout();
  loading.setLoading(false);
});

import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";

DataTable.use(DataTablesCore);

const columns = [
  { data: null, render: "#action2", title: "ID Người Dùng" },
  { data: "orderid", title: "Mã giao dịch" },
  { data: "moneyPay", title: "Số tiền" },
  { data: null, render: "#action1", title: "Thời gian giao gịch" },
  { data: null, render: "#action", title: "Thời hạn" },
  { data: "status", title: "Trạng thái" },
];

const handleUserInfo = async (id) => {
  await user.getUserById(id);

  loading.model = true;
};
</script>

<template>
  <main>
    <div>
      <h2 style="color: black">Manage Checkout</h2>
      <div class="profile pt-4 pb-5">
        <nav>
          <div
            class="nav nav-tabs justify-content-center"
            id="nav-tab"
            role="tablist"
          >
            <button
              style="color: #ff9658; font-weight: 600"
              class="nav-link active"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="true"
            >
              VNPay
            </button>
            <button
              style="color: #ff9658; font-weight: 600"
              class="nav-link"
              id="nav-chekout-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-chekout"
              type="button"
              role="tab"
              aria-controls="nav-chekout"
              aria-selected="true"
            >
              Bitcoin
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div class="mt-4">
              <DataTable
                id="table"
                class="table table-striped table-bordered display table_data table_vnpay"
                :order="true"
                :data="checkout?.checkoutList"
                :ordering="true"
                :columns="columns"
                style="color: black"
                columns.defaultContent
                :options="{
                  responsive: true,
                  autoWidth: false,
                  language: {
                    search: 'Tìm Kiếm',
                    zeroRecords: 'Không có dữ liệu',
                  },
                }"
              >
                <template #action2="props">
                  <Button
                    class="btn btn-default"
                    @click="() => handleUserInfo(props.cellData.userId)"
                    >{{ props.cellData.userId }}</Button
                  >
                </template>
                <template #action1="props">
                  <Button class="btn btn-default">{{
                    moment(props.cellData.createdAt).format("DD-MM-YYYY")
                  }}</Button>
                </template>
                <template #action="props">
                  <button className="btn btn-default">
                    {{ moment(props.cellData.dealine).format("DD-MM-YYYY") }}
                  </button>
                </template>
              </DataTable>
            </div>
            <!-- <div className='pt-4'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User ID</th>
              <th scope="col">Order ID</th>
              <th scope="col">Money Pay</th>
              <th scope="col">Create At</th>
              <th scope="col">Deadline</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in checkout?.checkoutList" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item?.userId }}</td>
              <td>{{ item?.orderid }}</td>
              <td>{{ item?.moneyPay }}</td>
              <td>{{ moment(item?.createdAt).format('DD-MM-YYYY') }}</td>
              <td>{{ moment(item?.deadline).format('DD-MM-YYYY') }}</td>
              <td>{{ item?.status }}</td>

            </tr>

          </tbody>
        </table>
      </div> -->
          </div>
          <div
            class="tab-pane fade"
            id="nav-chekout"
            role="tabpanel"
            aria-labelledby="nav-chekout-tab"
          >
            <UserCheckout />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="loading.model"
      class="modal fade show"
      style="display: block; color: rgba(0, 0, 0, 1)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thông Tin Người Dùng</h5>
            <button
              type="button"
              @click="loading.model = false"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Email: {{ user?.userUpdate.email }}</p>
            <p>Tài Khoản: {{ user?.userUpdate.userName }}</p>
            <p>Type: {{ user?.userUpdate.role }}</p>
            <p>Ngày Khởi Tạo: {{ user?.userUpdate.createdAt }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "datatables.net-dt";
@import "datatables.net-bs5";
</style>
