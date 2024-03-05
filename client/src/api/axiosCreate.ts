import axios from "axios";

const getToken =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("userToken")
    : null;
export const axiosInterceptor = axios.create({
  baseURL: "https://keep-me-sigma.vercel.app/",
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
  withCredentials: true,
});
