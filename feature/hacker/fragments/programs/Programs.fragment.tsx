import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import dynamic from "next/dynamic";

const Programs = dynamic(
  () => import("@/feature/hacker/components/programs/Programs.component")
);

const ProgramsFragment = async ({
  data,
}: {
  data: I_GetAssetTypeSuccessResponse["data"];
}) => {
  return <Programs assetTypes={data} />;
};
export default ProgramsFragment;
