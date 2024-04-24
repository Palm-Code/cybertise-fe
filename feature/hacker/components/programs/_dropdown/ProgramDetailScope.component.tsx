import { I_GetParamsPayload } from "@/core/models/common";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import { SortFilterType } from "@/types/admin/dashboard";

interface IProgramDetailScopeDropdownProps {
  variant?: "hacker" | "company" | "mediator";
  options?: SortFilterType[];
  payload?: I_GetParamsPayload;
  onValueChange?: (value: string) => void;
}

const ProgramDetailScopeDropdown = ({
  variant = "hacker",
  payload = {},
  options = [],
  onValueChange = () => {},
}: IProgramDetailScopeDropdownProps) => {
  return (
    <div className="_flexbox__row__center__start w-full gap-4 rounded-lg">
      <BaseDropdown
        label="Asset type"
        value={payload?.params?.filter?.asset_type_id || "all"}
        options={options}
        onValueChange={onValueChange}
      />
    </div>
  );
};
export default ProgramDetailScopeDropdown;
