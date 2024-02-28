import dynamic from "next/dynamic";
import { programsCardData } from "../../constants/programs";

const Programs = dynamic(
  () => import("@/feature/hacker/components/programs/Programs.component"),
  {
    ssr: false,
  }
);

const ProgramsFragment = () => {
  return <Programs data={programsCardData} />;
};
export default ProgramsFragment;
