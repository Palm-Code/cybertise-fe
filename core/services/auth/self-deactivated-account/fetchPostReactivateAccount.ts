import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "@/utils/config";
import { postReActivateAccountAPIURL } from "@/core/routes/auth/self-deactivated-account";
import { I_GetLoginSuccessResponse } from "@/core/models/auth/login";

export const fetchPostReactivateAccount = async (payload: string) => {
  const url = BASE_URL + postReActivateAccountAPIURL();
  return await axios
    .post(url, {
      code: payload,
    })
    .then((res: AxiosResponse<I_GetLoginSuccessResponse["data"]>) => {
      return res;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
