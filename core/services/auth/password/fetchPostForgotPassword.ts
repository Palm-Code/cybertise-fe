import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "@/utils/config";
import { postForgotPasswordAPIURL } from "@/core/routes/auth/password";
import { I_GetForgotPasswordRequest } from "@/core/models/auth/forgot-password";

export const fetchPostForgotPassword = async (
  payload: I_GetForgotPasswordRequest
) => {
  const url = BASE_URL + postForgotPasswordAPIURL();
  return await axios
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
