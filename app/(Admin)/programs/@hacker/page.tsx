import { useCommonStore } from "@/core/zustands/asset-type/store";
import ProgramsFragment from "@/feature/hacker/fragments/programs/Programs.fragment";

export default async function DashboardPage() {
  const { data } = useCommonStore.getState();
  return <ProgramsFragment data={data} />;
}
