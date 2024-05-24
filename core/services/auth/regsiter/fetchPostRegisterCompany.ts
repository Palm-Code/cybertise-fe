import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { postRegisterCompanyAPIURL } from "@/core/routes/auth/register/register";
import { SignupCompanyFormType } from "@/core/models/auth/register";

export const fetchPostRegisterCompany = async (
  payload: SignupCompanyFormType
) => {
  const url = postRegisterCompanyAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
