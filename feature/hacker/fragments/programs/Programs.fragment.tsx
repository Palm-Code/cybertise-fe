"use client";
import { useGetAssetType } from "@/core/react-query/client/useGetAssetType";
import dynamic from "next/dynamic";

const Programs = dynamic(
  () => import("@/feature/hacker/components/programs/Programs.component")
);

const ProgramsFragment = () => {
  const { data: assetType } = useGetAssetType();
  return <Programs assetTypes={assetType ?? []} />;
};
export default ProgramsFragment;
