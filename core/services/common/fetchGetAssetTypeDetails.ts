import { AxiosResponse } from "axios";
import { getAssetTypeDetailAPIURL } from "@/core/routes/common";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";

export const fetchGetAssetTypeDetails = async (id: string) => {
  const params = {
    fields: {
      append: "label",
    },
  };
  const url = getAssetTypeDetailAPIURL(id);
  return await axiosInterceptorInstance
    .get(url, {
      params: params?.fields,
    })
    .then((res: AxiosResponse<any>) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
