import { ReportDetailsFragment } from "@/feature/hacker/fragments";

export default async function ReportDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ReportDetailsFragment id={slug} />;
}
