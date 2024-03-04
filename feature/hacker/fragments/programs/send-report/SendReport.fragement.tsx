import { SendReport } from "@/feature/hacker/components";

interface I_SendReportProps {
  id: string;
}

const SendReportFragment = ({ id }: I_SendReportProps) => {
  return <SendReport id={id} />;
};
export default SendReportFragment;
