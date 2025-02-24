"use client";
import dynamic from "next/dynamic";

const ProgramDetails = dynamic(
  () =>
    import(
      "@/feature/hacker/components/programs/details/ProgramDetails.component"
    ),
  {
    ssr: false,
  }
);

const ProgramDetailsFragment = ({ id }: { id: string }) => {
  return <ProgramDetails id={id} />;
};
export default ProgramDetailsFragment;
