import axios, { AxiosResponse } from "axios";
import { postLogoutAPIURL } from "@/core/routes/auth/logout";
import Cookies from "js-cookie";

export const fetchPostLogout = async () => {
  const accessToken = Cookies.get("token");
  const url = postLogoutAPIURL();
  return await axios
    .post(url, { token: accessToken })
    .then((res: AxiosResponse<any>) => {
      return res;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    })
    .finally(() => {
      window.location.href = "/auth/signin";
    });
};
