import Axios from "axios";
import { DOMAIN, TOKEN, REFRESHTOKEN } from "../utils/config";
import Cookies from "js-cookie";

class baseService {
  constructor() {
    this.service = Axios.create({
      baseURL: DOMAIN,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get(TOKEN)}`,
      },
    });
    this.service.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là 401 và yêu cầu chưa được thử lại
        console.log(error.response);

        if (error.response.status === 419 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const access_token = await this.refreshToken();
            if (access_token) {
              originalRequest.headers.Authorization = `Bearer ${access_token}`;

              return Axios(originalRequest);
            }
          } catch (refreshError) {
            console.error("Failed to refresh token", refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }
  async refreshToken() {
    try {
      const refresh_token = Cookies.get(REFRESHTOKEN);
      const response = await Axios.post(`${DOMAIN}/auth/refresh-token`, {
        refresh_token,
      });
      const { access_token } = response.data;

      Cookies.set(TOKEN, access_token);

      return access_token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      return null;
    }
  }
  put(url, model) {
    return this.service.put(url, model);
  }

  post(url, model) {
    return this.service.post(url, model);
  }

  get(url, params) {
    return this.service.get(url, { params });
  }

  delete(url) {
    return this.service.delete(url);
  }

  patch = (url, model) => {
    return this.service.patch(url, model);
  };

  upload(url, formData) {
    return this.service.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookies.get(TOKEN)}`,
      },
    });
  }

  // put = (url, model) => {
  //   return Axios({
  //     url: `${DOMAIN}${url}`,
  //     method: "PUT",
  //     data: model,
  //     headers: { Authorization: "Bearer " + Cookies.get(TOKEN) }, //JWT
  //   });
  // };
  // get = (url, model) => {
  //   return Axios({
  //     url: `${DOMAIN}${url}`,
  //     method: "GET",
  //     data: model,
  //     headers: { Authorization: "Bearer " + Cookies.get(TOKEN) }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
  //   });
  // };
  // post = (url, model) => {
  //   return Axios({
  //     url: `${DOMAIN}${url}`,
  //     method: "POST",
  //     data: model,
  //     headers: { Authorization: "Bearer " + Cookies.get(TOKEN) }, //JWT
  //   });
  // };
  // patch = (url, model) => {
  //   return Axios({
  //     url: `${DOMAIN}${url}`,
  //     method: "PATCH",
  //     data: model,
  //     headers: { Authorization: "Bearer " + Cookies.get(TOKEN) }, //JWT
  //   });
  // };
  // delete = (url) => {
  //   return Axios({
  //     url: `${DOMAIN}${url}`,
  //     method: "DELETE",
  //     headers: { Authorization: "Bearer " + Cookies.get(TOKEN) }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
  //   });
  // };
  // upload = (url, model) => {
  //   return Axios({
  //     url: `${DOMAIN}${url}`,
  //     method: "POST",
  //     data: model,
  //     headers: {
  //       "content-type": "multipart/form-data",
  //       Authorization: "Bearer " + Cookies.get(TOKEN),
  //     }, //JWT
  //   });
  // };
}

export const service = new baseService();
