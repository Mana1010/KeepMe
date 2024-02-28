import { jwtDecode } from "jwt-decode";
import { refreshToken } from "@/api/refreshToken";
interface DecodeJWT {
  exp: number;
  iat: number;
  id: string;
}

const checkToken = async () => {
  const getAccessToken = localStorage.getItem("userToken");

  if (!getAccessToken) {
    return false;
  }
  try {
    const decodedToken: DecodeJWT = jwtDecode(getAccessToken);
    const getExpToken = decodedToken.exp * 1000;
    const currentTime = Date.now();
    //Checking if the token is expired
    if (currentTime > getExpToken) {
      const refresh = await refreshToken();
      if (refresh) {
        localStorage.setItem("userToken", refresh);
        return true;
      } else {
        localStorage.removeItem("userToken");
        return false;
      }
    }
    return true;
  } catch (err) {
    const refresh = await refreshToken();
    if (refresh) {
      localStorage.setItem("userToken", refresh);
      return true;
    }
    localStorage.removeItem("userToken");
    return false;
  }
};

export default checkToken;
