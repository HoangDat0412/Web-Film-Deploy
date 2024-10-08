<script setup>
import qr from "@/assets/img/qr.jpg";
import { ref, onBeforeMount } from "vue";
// const accountNumber = ref("")
// const bank = ref("")
// const errBank = ref("");
// const errAcc = ref("")
const walletaddress = ref("");
const errwalletaddress = ref("");
const bitcoinprice = ref(0.00001);
import { useCheckoutStore } from "@/stores/checkout";
import router from "@/router";
import { checkNull } from "@/validation/validation";
import { useUserStore } from "@/stores/user";
import { useLoadingStore } from "@/stores/loading";
const checkout = useCheckoutStore();
// const handleSubmit = async () => {
//   !checkNull(bank.value) ? errBank.value = "bank không được bỏ trống" : errBank.value = "";
//   !checkNull(accountNumber.value) ? errAcc.value = "account number không được bỏ trống" : errAcc.value = "";
//   const flag = checkNull(bank.value) && checkNull(accountNumber.value)
//   if (flag) {
//     await checkout.createCheckout({
//       bank: bank.value,
//       accountNumber: accountNumber.value,
//     })
//     if (checkout.checkoutResult) {
//       router.push({ path: "/login" })
//     }
//   }

// }
const user = useUserStore();
const handlePaymentBitcoin = async () => {
  !checkNull(walletaddress.value)
    ? (errwalletaddress.value = "walletaddress không được bỏ trống")
    : (errwalletaddress.value = "");

  const flag = checkNull(walletaddress.value);
  console.log({
    bitcoinprice: bitcoinprice.value,
    walletaddress: walletaddress.value,
  });
  if (flag) {
    await checkout.createCheckoutBitcoin({
      bitcoinprice: bitcoinprice.value,
      walletaddress: walletaddress.value,
    });
    if (checkout.checkoutResult) {
      router.push({ path: "/login" });
    }
  }
};
const loading = useLoadingStore();
onBeforeMount(async () => {
  loading.setLoading(true);
  await user.getUserInformation();
  loading.setLoading(false);
  if (!user.userInformation.role) {
    alert("Bạn cần đăng nhập để thanh toán");
    router.push({
      path: "/login",
      replace: true,
    });
  }
});
</script>

<template>
  <main>
    <div class="container pt-4 pb-4">
      <h1 class="h3 mb-5">Payment</h1>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button collapsed"
              @click="() => checkout.paymentvnpay()"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-controls="collapseOne"
            >
              VNPAY
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="row d-flex justify-content-center">
                <div class="col-12 col-lg-3">
                  <div class="card position-sticky top-0">
                    <div class="p-3 bg-light bg-opacity-10">
                      <h6 class="card-title mb-3">Vip User</h6>

                      <div class="d-flex justify-content-center">
                        <img :src="qr" width="70%" alt="" />
                      </div>
                      <hr />
                      <div class="d-flex justify-content-between mb-4 small">
                        <span>TOTAL</span>
                        <strong class="text-dark">20000 VND</strong>
                      </div>
                      <div class="form-check mb-1 small">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="tnc"
                        />
                        <label class="form-check-label" htmlFor="tnc">
                          I agree to the <a href="#">terms and conditions</a>
                        </label>
                      </div>
                      <a
                        type="button"
                        :href="checkout.vnpayurl"
                        class="btn btn-primary w-100 mt-2"
                        >Payment</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Bitcoin
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <form>
                <div class="row">
                  <div class="col-12">
                    <div class="mb-3">
                      <label class="form-label">Địa chỉ ví bitcoin</label>
                      <input
                        name="accountNumber"
                        class="form-control"
                        v-model="walletaddress"
                        type="text"
                      />
                      <p style="color: red">{{ errwalletaddress }}</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="mb-3">
                      <label class="form-label">price</label>
                      <input
                        name="bank"
                        class="form-control"
                        disabled
                        v-model="bitcoinprice"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="handlePaymentBitcoin"
                  class="btn btn-primary w-100 mt-2"
                >
                  Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
