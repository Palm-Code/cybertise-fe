import { useCommonStore } from "@/core/zustands/asset-type/store";
import dynamic from "next/dynamic";

const Programs = dynamic(
  () => import("@/feature/hacker/components/programs/Programs.component")
);

const ProgramsFragment = () => {
  const { data: assetTypes } = useCommonStore.getState();
  return <Programs assetTypes={assetTypes} />;
};
export default ProgramsFragment;
