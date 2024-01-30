import axios from "axios";

export const refreshToken = async () => {
  try {
    const getToken = await axios.get("http://localhost:5000/auth/refresh", {
      withCredentials: true,
    });
    if (getToken.status === 200) {
      return getToken.data.token;
    }
  } catch (err) {
    console.log(err);
  }
};
