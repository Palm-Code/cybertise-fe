import { CollaboratorsFragment } from "@/feature/mediator/fragments/companies/details/collaborators/Collaborators.fragment";

export default async function Collaborators({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const programId = (await searchParams).program;
  return <CollaboratorsFragment id={programId as string} />;
}
