import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { postUpdateTicketAPIURL } from "@/core/models/mediator/reports";

export const fetchPostUpdateTicket = async (id: string, payload: string) => {
  const url = postUpdateTicketAPIURL(id);
  return await axiosInterceptorInstance
    .post(`${url}&${payload}`)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
