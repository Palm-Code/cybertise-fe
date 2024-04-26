"use client";
import { SendReportRequestType } from "@/core/models/hacker/programs/post_send_report";
import BugTargetCard from "./_card/review/BugTarget";
import ProblemCausesCard from "./_card/review/ProblemCauses";
import ReportDescriptionCard from "./_card/review/ReportDescription";
import {
  I_GetAssetTypeSuccessResponse,
  I_GetVulnerabilityTypeSuccessResponse,
} from "@/core/models/common";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";

interface I_ReviewProps {
  defaultData?: {
    assetType?: I_GetAssetTypeSuccessResponse["data"];
    targetAssets?: I_GetProgramDetailsSuccessResponse["data"]["target_assets"];
    vulnerabilityType?: I_GetVulnerabilityTypeSuccessResponse["data"];
  };
  data?: SendReportRequestType;
}

const Review = ({ data, defaultData }: I_ReviewProps) => {
  if (data)
    return (
      <div className="_flexbox__col__start__start w-full gap-6 bg-transparent">
        <BugTargetCard
          target_assets={
            defaultData?.targetAssets?.find(
              (item) => item.id === data?.target_asset_id
            )?.asset_type_name as string
          }
          vulnerability_type={
            defaultData?.vulnerabilityType?.find(
              (item) => item.id === data?.vulnerabiity_type_id
            )?.label as string
          }
          risk_level={data?.risk_level}
        />
        <ReportDescriptionCard
          title={data.title}
          description={data.description}
        />
        <ProblemCausesCard summary={data.impact} proof_of_concept={data.poc} />
      </div>
    );
};
export default Review;
