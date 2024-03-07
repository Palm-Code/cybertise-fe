import { SendReportFragment } from "@/feature/hacker/fragments";

const SendReportPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { company } = searchParams ?? { company: "" };
  return <SendReportFragment id={company as string} />;
};
export default SendReportPage;
