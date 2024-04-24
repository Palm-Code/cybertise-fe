import { I_TargetAsset } from "../hacker/programs";
import { I_Meta } from "./get_included_data";

export interface I_GetTargetAssetSuccessResponse {
  data: I_TargetAsset[];
  meta?: I_Meta;
}
