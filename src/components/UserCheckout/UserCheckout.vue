<script setup>
import { useCheckoutStore } from '@/stores/checkout';
import { watchEffect } from 'vue';
import moment from 'moment';
const checkout = useCheckoutStore()

watchEffect(async ()=>{
    await checkout.getUserCheckout()
})
</script>

<template>
    <main style="background-color: aliceblue;">
        <div class="table-responsive container mt-5" >
            <h5 class="mt-4 mb-3">Thanh Toán Bằng VNPAY</h5>
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr class="whitespace-nowrap">
                        <th scope="col">STT</th>
                        <th scope="col">Order ID</th>
                        <th scope="col">Ngày Thanh Toán</th>
                        <th scope="col">Ngày Hết Hạn</th>
                        <th scope="col">Số Tiền</th>
                        <th scope="col">Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(item,key) in checkout?.userCheckoutList" :key="key" class="whitespace-nowrap">
                        <th scope="row">{{ key + 1 }}</th>
                        <td>{{ item?.orderid }}</td>

                        <td>
                            {{moment(item?.createdAt).format('DD-MM-YYYY')}}
                        </td>
                        <td>
                            {{ moment(item?.deadline).format('DD-MM-YYYY') }}
                        </td>
                        <td>{{item?.moneyPay}}</td>
                        <td v-if="item?.status === true">Thành Công</td>
                        <td v-if="item?.status === false">Thất Bại</td>
                    </tr>


                    <tr>
                        <td colSpan="4">Tổng Tiền</td>
                        <td>{{ checkout?.totalPriceUser }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-responsive container mt-5" >
            <h5 class="mb-3">Thanh Toán Bằng Bitcoin</h5>
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr class="whitespace-nowrap">
                        <th scope="col">STT</th>
                        <th scope="col">địa chỉ ví</th>
                        <th scope="col">bitcoin</th>
                        <th scope="col">Ngày Thanh Toán</th>
                        <th scope="col">Ngày Hết Hạn</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(item,key) in checkout?.userCheckoutBitcoinList" :key="key" class="whitespace-nowrap">
                        <th scope="row">{{ key + 1 }}</th>
                        <td>{{ item?.walletaddress }}</td>
                        <td>{{ item?.bitcoinprice }}</td>

                        <td>
                            {{moment(item?.createdAt).format('DD-MM-YYYY')}}
                        </td>
                        <td>
                            {{ moment(item?.deadline).format('DD-MM-YYYY') }}
                        </td>
                    </tr>


                    <tr>
                        <td colSpan="4">Tổng Tiền</td>
                        <td>{{ checkout?.totalBitcoinUser }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>