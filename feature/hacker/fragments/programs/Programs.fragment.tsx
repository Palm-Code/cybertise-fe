import dynamic from "next/dynamic";
import { useParamStore } from "../../zustand/store/programs/params";
import { useProgramStore } from "../../zustand/store/program-list";

const Programs = dynamic(
  () => import("@/feature/hacker/components/programs/Programs.component"),
  {
    ssr: false,
  }
);

const ProgramsFragment = () => {
  return <Programs />;
};
export default ProgramsFragment;
