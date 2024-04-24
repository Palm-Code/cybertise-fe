import { AxiosResponse } from "axios";
import { I_GetParamsPayload } from "@/core/models/common";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getTargetAssetAPIURL } from "@/core/routes/common";
import { I_GetTargetAssetSuccessResponse } from "@/core/models/common/get_target_asset";

export const fetchGetTargetAsset = async (payload?: I_GetParamsPayload) => {
  const res = await axiosInterceptorInstance
    .get(getTargetAssetAPIURL(), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetTargetAssetSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
