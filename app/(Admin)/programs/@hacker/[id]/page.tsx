import { ProgramDetailsFragment } from "@/feature/hacker/fragments";

export default function ProgramsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProgramDetailsFragment id={params.id} />;
}
