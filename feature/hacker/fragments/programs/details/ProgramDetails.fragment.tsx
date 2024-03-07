import { ProgramDetails } from "@/feature/hacker/components";

interface I_ProgramDetailsProps {
  id: string;
}

const ProgramDetailsFragment = ({ id }: I_ProgramDetailsProps) => {
  return <ProgramDetails id={id} />;
};
export default ProgramDetailsFragment;
