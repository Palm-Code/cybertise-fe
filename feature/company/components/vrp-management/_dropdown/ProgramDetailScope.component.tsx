import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";

interface IProgramDetailScopeDropdownProps {
  variant?: "hacker" | "company" | "mediator";
}

const ProgramDetailScopeDropdown = ({
  variant = "hacker",
}: IProgramDetailScopeDropdownProps) => {
  return (
    <div className="_flexbox__row__center__start w-full gap-4 rounded-lg">
      <BaseDropdown
        label="Asset type"
        value="All Asset type"
        options={filterItems.asset_type}
        onValueChange={() => {}}
      />
    </div>
  );
};
export default ProgramDetailScopeDropdown;
