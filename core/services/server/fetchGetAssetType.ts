import axios, { AxiosResponse } from "axios";
import { getAssetTypeAPIURL } from "@/core/routes/common";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { getSession } from "@/service/server/session";
import { cookies } from "next/headers";

export const fetchGetAssetType = async () => {
  const params = {
    fields: {
      asset_types: "id,value",
      page: {
        number: 1,
        size: 30,
      },
    },
  };
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${getAssetTypeAPIURL()}`;
  const session = await getSession();
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
      params: params?.fields,
    })
    .then((res: AxiosResponse<I_GetAssetTypeSuccessResponse>) => {
      return res.data;
    })
    .catch(async (err) => {
      if (err.status === 401) {
        const cookiesData = await cookies();
        cookiesData.delete("session");
        cookiesData.delete("token");
      }
      throw err?.response?.data || err?.response;
    });
};
