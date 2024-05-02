import { ReportDetailsFragment } from "@/feature/company/fragments";

export default async function ReportDetails({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <ReportDetailsFragment id={slug} />;
}
