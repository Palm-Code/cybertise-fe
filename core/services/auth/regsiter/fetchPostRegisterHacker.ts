import axios, { AxiosResponse } from "axios";
import { postRegisterHackerAPIURL } from "@/core/routes/auth/register/register";
import { SignupHackerFormType } from "@/core/models/auth/register";
import { BASE_URL } from "@/utils/config";

export const fetchPostRegisterHacker = async (
  payload: SignupHackerFormType
) => {
  const url = BASE_URL + postRegisterHackerAPIURL();
  return await axios
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
