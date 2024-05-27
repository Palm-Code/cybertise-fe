import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "@/utils/config";
import { getRequestForgotPasswordAPIURL } from "@/core/routes/auth/password";

export const fetchGetRequestForgotPassword = async (payload: string) => {
  const url = BASE_URL + getRequestForgotPasswordAPIURL();
  return await axios
    .post(url, {
      email: payload,
    })
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
