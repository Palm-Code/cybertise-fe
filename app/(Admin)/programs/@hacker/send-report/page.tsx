import { SendReportFragment } from "@/feature/hacker/fragments";

const SendReportPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { programs } = (await searchParams) ?? { programs: "" };
  return <SendReportFragment id={programs as string} />;
};
export default SendReportPage;
