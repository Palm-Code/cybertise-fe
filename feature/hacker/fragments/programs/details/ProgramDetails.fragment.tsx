import { useCommonStore } from "@/core/zustands/asset-type/store";
import { ProgramDetails } from "@/feature/hacker/components";

interface I_ProgramDetailsProps {
  id: string;
}

const ProgramDetailsFragment = ({ id }: I_ProgramDetailsProps) => {
  const { data } = useCommonStore.getState();
  return <ProgramDetails id={id} assetTypes={data} />;
};
export default ProgramDetailsFragment;
