import { useGetCountryList } from "../react-query/client";
import { OptionsType } from "@/types/auth/sign-up";

export const useGetCountry = () => {
  const { data, isError } = useGetCountryList();
  if (data) {
    const dataList: OptionsType[] = data.data.map((item) => {
      return {
        label: item.name,
        value: item.code,
        icon: item.flag_url,
      };
    });

    return { data: dataList };
  }
  if (isError) {
    return { data: [] };
  }
};
