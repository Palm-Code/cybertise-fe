import { I_Company, I_Meta } from "../../common";
import { I_AssetType, I_TargetAsset } from "../../hacker/programs";

interface I_GetCompaniesResponse extends I_Company {
  asset_types?: I_AssetType[];
  target_assets: I_TargetAsset[];
}

export interface I_GetCompaniesSuccessResponse {
  data: I_GetCompaniesResponse[];
  meta: I_Meta;
}
