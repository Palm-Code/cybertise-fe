import { getCollaboratorListAPIURL } from "@/core/routes/mediator/collaborators";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { AxiosError, AxiosResponse } from "axios";

export const fetchPostAddCollaborators = async (payload?: {
  user_ids: string[];
  program_id: string;
}) => {
  const res = await axiosInterceptorInstance
    .post(getCollaboratorListAPIURL(), payload)
    .then((res: AxiosResponse<any>) => res.data)
    .catch((err: AxiosError) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
