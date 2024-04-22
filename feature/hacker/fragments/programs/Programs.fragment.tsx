import dynamic from "next/dynamic";

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
