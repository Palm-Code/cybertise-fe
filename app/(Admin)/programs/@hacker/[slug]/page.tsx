import { ProgramDetailsFragment } from "@/feature/hacker/fragments";

export default function ProgramsDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <ProgramDetailsFragment id={slug} />;
}
