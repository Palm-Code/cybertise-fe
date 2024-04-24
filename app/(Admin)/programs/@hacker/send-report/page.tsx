import { SendReportFragment } from "@/feature/hacker/fragments";

const SendReportPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { programs } = searchParams ?? { programs: "" };
  return <SendReportFragment id={programs as string} />;
};
export default SendReportPage;
