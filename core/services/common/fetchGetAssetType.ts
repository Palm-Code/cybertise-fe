import { BASE_URL } from "@/utils/config";
import axios, { AxiosResponse } from "axios";
import { getAssetTypeAPIURL } from "@/core/routes/common";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";

export const fetchGetAssetType = async (token: string) => {
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
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      },
      params: params?.fields,
    })
    .then((res: AxiosResponse<I_GetAssetTypeSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
