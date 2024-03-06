import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "./refreshToken";
interface DecodeJWT {
  exp: number;
  iat: number;
  id: string;
}

const getToken =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("userToken")
    : null;
export const createAxios = axios.create({
  baseURL: "https://keep-me-mern.vercel.app/",
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
  withCredentials: true,
});
createAxios.interceptors.request.use(async (config) => {
  if (!getToken) {
    return config;
  }
  try {
    const decodedToken: DecodeJWT = jwtDecode(getToken);
    const decodedAccessToken = decodedToken.exp * 1000;
    const currentTime = Date.now();
    if (currentTime > decodedAccessToken) {
      const getRefreshToken = await refreshToken();
      if (getRefreshToken) {
        localStorage.setItem("userToken", getRefreshToken);
        config.headers.Authorization = `Bearer ${getRefreshToken}`;
      } else {
        localStorage.removeItem("userToken");
      }
    }
    return config;
  } catch (err) {
    const getRefreshToken = await refreshToken();
    if (getRefreshToken) {
      localStorage.setItem("userToken", getRefreshToken);
      config.headers.Authorization = `Bearer ${getRefreshToken}`;
    } else {
      localStorage.removeItem("userToken");
    }
  }
  return config;
});

// createAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalConfig = error.config;
//     const status = error?.response?.status;
//     if (status === 403 && !originalConfig._retry) {
//       console.log("Run only once");
//       originalConfig._retry = true;
//       // router.push("/login");
//       window.location.pathname = "/login";
//     } else if (status === 401 && !originalConfig._retry) {
//       originalConfig._retry = true;
//       window.location.pathname =
//         "/login?" + new URLSearchParams({ message: "You are not log in" });
//     }
//     console.log("Running!!");
//     return Promise.reject(error);
//   }
// );
