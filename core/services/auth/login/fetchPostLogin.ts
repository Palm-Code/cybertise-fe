import axios, { AxiosResponse } from "axios";
import { postLoginAPIURL } from "@/core/routes/auth/login";
import { BASE_URL } from "@/utils/config";
import { FormLoginSchema } from "@/types/auth/sign-in";
import { I_GetLoginSuccessResponse } from "@/core/models/auth/login";
import { I_GetErrorResponse } from "@/core/models/common";

export const fetchPostLogin = async (payload: FormLoginSchema) => {
  const url = BASE_URL + postLoginAPIURL();
  return await axios
    .post(url, payload)
    .then((res: AxiosResponse<I_GetLoginSuccessResponse["data"]>) => {
      return res;
    })
    .catch((err) => {
      const errors: I_GetErrorResponse = {
        status: err?.response?.status,
        message: err?.response?.data?.message,
      };
      throw errors;
    });
};
