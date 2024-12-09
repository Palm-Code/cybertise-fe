import axios, { AxiosResponse } from "axios";
import { getCountryListAPIURL } from "@/core/routes/common";
import { I_GetCountryListSuccessResponse } from "@/core/models/common";

export const fetchGetCountryList = async () => {
  const res = await axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + getCountryListAPIURL())
    .then((res: AxiosResponse<I_GetCountryListSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
