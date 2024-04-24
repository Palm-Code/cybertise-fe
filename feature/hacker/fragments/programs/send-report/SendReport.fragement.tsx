"use client";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { useGetAssetType } from "@/core/react-query/client/useGetAssetType";
import { SendReport } from "@/feature/hacker/components";

interface I_SendReportProps {
  id: string;
}

const SendReportFragment = ({ id }: I_SendReportProps) => {
  const { data: assetType } = useGetAssetType();
  return (
    <SendReport
      id={id}
      defaultData={{
        assetType: assetType ?? [],
      }}
    />
  );
};
export default SendReportFragment;
