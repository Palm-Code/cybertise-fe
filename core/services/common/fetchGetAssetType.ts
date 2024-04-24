import { BASE_URL } from "@/utils/config";
import { AxiosResponse } from "axios";
import { getAssetTypeAPIURL } from "@/core/routes/common";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";

export const fetchGetAssetType = async () => {
  const params = {
    fields: {
      asset_types: "id,value",
      page: {
        number: 1,
        size: 10,
      },
    },
  };
  const url = BASE_URL + getAssetTypeAPIURL();
  return await axiosInterceptorInstance
    .get(url, {
      params: params?.fields,
    })
    .then((res: AxiosResponse<I_GetAssetTypeSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
