import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { postCreateCompanyTicketAPIURL } from "@/core/routes/mediator/reports";
import { SendReportRequestType } from "@/core/models/common";

export const fetchPostCreateCompanyTicket = async (
  payload: SendReportRequestType,
  id: string
) => {
  const url = postCreateCompanyTicketAPIURL(id);
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
