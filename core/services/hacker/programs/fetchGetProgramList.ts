import { I_GetProgramListPayload } from "@/core/models/hacker/programs";
import { getProgramListAPIURL } from "@/core/routes/hacker/programs";
import { BASE_URL } from "@/utils/config";
import axiosInterceptor from "../../interceptor/axiosInterceptor";
import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";

export const fetchGetProgramList = async (
  payload?: I_GetProgramListPayload
) => {
  const url = BASE_URL + getProgramListAPIURL();
  const cookies = new Cookies();
  const token = cookies.get("token");
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      },
      params: payload?.params,
    })
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
