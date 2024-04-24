import { I_GetProgramListSuccessResponse } from "./get_programs_list";

export interface I_GetProgramDetailsSuccessResponse {
  data: I_GetProgramListSuccessResponse["data"][0];
}
