import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { I_PostSendReportRequest } from "@/core/models/common/post_send_report";
import { postSendReportAPIURL } from "@/core/routes/hacker/programs/send_report";

export const postSendReport = async (
  payload?: I_PostSendReportRequest["payload"]
) => {
  const res = await axiosInterceptorInstance
    .post(postSendReportAPIURL(), payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
