import { service } from "@/service/baseService";
import { defineStore } from "pinia";
// import { TOKEN } from "@/utils/config";
export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    checkoutList: [],
    checkoutBitcoinList: [],
    totalPrice: 0,
    checkoutResult: false,
    userCheckoutList: [],
    userCheckoutBitcoinList: [],
    totalPriceUser: 0,
    totalBitcoinUser: 0,
    deadline: true,
    vnpayurl: "",
  }),
  getters: {},
  actions: {
    async createCheckout(data) {
      try {
        const result = await service.post(`/checkout/create`, {
          moneyPay: 200000,
          ...data,
        });
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          this.checkoutResult = true;
          alert("Check out thành công, bạn hay đăng nhập lại tài khoản !");
        } else {
          this.checkoutResult = false;
          alert("Check out thất bại");
        }
      } catch (error) {
        this.checkoutResult = false;
        alert("Check out thất bại");
      }
    },
    async getAllCheckout() {
      try {
        const result = await service.get("/checkout/getall");
        if (result?.status === 200) {
          this.checkoutList = result.data;
          let totalmoney = 0;
          result?.data?.map((item) => {
            if (item.status === true) {
              totalmoney += item.moneyPay;
            }
          });
          this.totalPrice = totalmoney;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUserCheckout() {
      try {
        const result = await service.get(`/checkout`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Actor success !",
            "Sucess"
          );
          this.userCheckoutList = result.data;
          let totalmoney = 0;
          result?.data?.map((item) => {
            if (item.status === true) {
              totalmoney += item.moneyPay;
            }
          });
          console.log("moneyPay", totalmoney);
          this.totalPriceUser = totalmoney;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checkDeadline() {
      try {
        const result = await service.get(`/checkout/checkdeadline`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Actor success !",
            "Sucess"
          );
          if (result?.data === true) {
            this.deadline = true;
          } else {
            // alert("Hết thời hạn sử dụng tài khoản vip, bạn hãy thanh toán để tiếp tục xem phim")
            this.deadline = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createCheckoutBitcoin(data) {
      try {
        const result = await service.post(`/checkoutbitcoin/create`, data);
        if (result.status === 201) {
          this.notification.show(
            "",
            "success",
            "Add new Actor success !",
            "Sucess"
          );
          this.checkoutResult = true;
          alert("Check out thành công, bạn hay đăng nhập lại tài khoản !");
        } else {
          this.checkoutResult = false;
          alert("Check out thất bại");
        }
      } catch (error) {
        this.checkoutResult = false;
        alert("Check out thất bại");
      }
    },
    async getUserCheckoutBitcoin() {
      try {
        const result = await service.get(`/checkoutbitcoin`);
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Actor success !",
            "Sucess"
          );
          this.userCheckoutBitcoinList = result.data;
          let totalmoney = 0;
          result?.data?.map((item) => {
            totalmoney += item.bitcoinprice;
          });
          this.totalBitcoinUser = totalmoney;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAllCheckoutBitcoin() {
      try {
        const result = await service.get("/checkoutbitcoin/getall");
        if (result?.status === 200) {
          this.checkoutBitcoinList = result.data;
          let totalmoney = 0;
          result?.data?.map((item) => {
            totalmoney += item.moneyPay;
          });
          this.totalPrice = totalmoney;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async paymentvnpay() {
      try {
        const result = await service.get("/order/create_payment_url");
        if (result.status === 200) {
          this.notification.show(
            "",
            "success",
            "Delete Actor success !",
            "Sucess"
          );
          this.vnpayurl = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
