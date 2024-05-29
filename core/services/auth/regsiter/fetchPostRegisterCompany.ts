import axios, { AxiosResponse } from "axios";
import { postRegisterCompanyAPIURL } from "@/core/routes/auth/register/register";
import { SignupCompanyFormType } from "@/core/models/auth/register";
import { BASE_URL } from "@/utils/config";

export const fetchPostRegisterCompany = async (
  payload: SignupCompanyFormType
) => {
  const url = BASE_URL + postRegisterCompanyAPIURL();
  return await axios
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
