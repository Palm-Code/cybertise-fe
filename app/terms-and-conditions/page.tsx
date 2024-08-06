import { termsandconditions } from "@/core/constants/common";
import { Legal } from "@/core/ui/layout/static/legal";

export default function StaticPages() {
  return <Legal data={termsandconditions} />;
}
