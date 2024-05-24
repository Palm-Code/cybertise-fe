import axios, { AxiosResponse } from "axios";
import { getAccessTokenAPIURL } from "@/core/routes/auth/login";
import {
  I_GetAccessTokenPayload,
  I_GetAccessTokenSuccessResponse,
} from "@/core/models/auth/login/get_access_token";
import { BASE_URL } from "@/utils/config";

export const fetchGetAccessToken = async (payload: I_GetAccessTokenPayload) => {
  const url = BASE_URL + getAccessTokenAPIURL(payload.code);
  return await axios
    .post(url, payload)
    .then((res: AxiosResponse<I_GetAccessTokenSuccessResponse["data"]>) => {
      return res;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
