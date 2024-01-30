import axios from "axios";

export interface Data {
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
}
export interface LoginData {
  username: string;
  password: string;
}
export const signUp = async (data: Data) => {
  const url = await axios.post("http://localhost:5000/auth/signup", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return url.data;
};
export const logIn = async (data: LoginData) => {
  const url = await axios.post("http://localhost:5000/auth/login", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return url.data;
};
