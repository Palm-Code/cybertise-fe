import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getTargetAssetDetailAPIURL } from "@/core/routes/common";

export const fetchGetTargetAssetDetails = async (id: string) => {
  const res = await axiosInterceptorInstance
    .get(getTargetAssetDetailAPIURL(id as string), {
      params: {
        include: "assetType",
      },
    })
    .then((res: AxiosResponse<any>) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
