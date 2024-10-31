import { getCollaboratorListAPIURL } from "@/core/routes/mediator/collaborators";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { AxiosError, AxiosResponse } from "axios";

export const fetchDeleteCollaborators = async (payload?: {
  collaborator_ids: string[];
}) => {
  const res = await axiosInterceptorInstance
    .delete(getCollaboratorListAPIURL(), {
      params: payload,
    })
    .then((res: AxiosResponse<any>) => res.data)
    .catch((err: AxiosError) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
