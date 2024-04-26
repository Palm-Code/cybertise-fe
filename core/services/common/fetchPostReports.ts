import { BASE_URL } from "@/utils/config";
import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { SendReportRequestType } from "@/core/models/hacker/programs/post_send_report";
import { postSendReportAPIURL } from "@/core/routes/hacker/programs/send_report";

export const fetchPostReports = async (payload: SendReportRequestType) => {
  const url = BASE_URL + postSendReportAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
