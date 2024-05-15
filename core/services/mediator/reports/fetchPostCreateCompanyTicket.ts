import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { postCreateCompanyTicketAPIURL } from "@/core/routes/mediator/reports";

export const fetchPostCreateCompanyTicket = async (id: string) => {
  const url = postCreateCompanyTicketAPIURL(id);
  return await axiosInterceptorInstance
    .post(url)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
