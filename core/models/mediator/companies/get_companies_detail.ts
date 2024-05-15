import { I_Company, I_Program } from "../../common";

interface I_GetCompanyDetailsSuccessResponseData extends I_Company {
  programs: I_Program[];
}

export interface I_GetCompanyDetailsSuccessResponse {
  data: I_GetCompanyDetailsSuccessResponseData;
}
