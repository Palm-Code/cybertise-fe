import { ProgramDetailsFragment } from "@/feature/hacker/fragments";

export default async function ProgramsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProgramDetailsFragment id={slug} />;
}
