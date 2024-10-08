// export const DOMAIN = "https://htad.id.vn/api/v1/films";
export const LINKBE = "https://htad.id.vn";

export const DOMAIN = import.meta.env.VITE_DOMAIN;

export const TOKEN = import.meta.env.VITE_TOKEN;
export const REFRESHTOKEN = import.meta.env.VITE_REFRESHTOKEN;
export const USER_LOGIN = import.meta.env.VITE_USER_LOGIN;

export const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
