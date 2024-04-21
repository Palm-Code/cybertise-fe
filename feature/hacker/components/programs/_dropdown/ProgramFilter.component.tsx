"use client";
import { I_GetProgramListPayload } from "@/core/models/hacker/programs";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";

interface IProgramsFilterDropdownProps {
  variant?: "hacker" | "company" | "mediator";
  refetch?: () => void;
  payload?: I_GetProgramListPayload;
  onValueChangeType?: (value: string) => void;
  onValueChangeAssetType?: (value: string) => void;
}

const ProgramsFilterDropdown = ({
  variant = "hacker",
  payload = {},
  onValueChangeType = () => {},
  onValueChangeAssetType = () => {},
}: IProgramsFilterDropdownProps) => {
  return (
    <div className="_flexbox__row__center__start w-full gap-4 rounded-lg">
      <BaseDropdown
        label="Scope"
        value={payload?.params?.filter?.type}
        options={filterItems.type}
        onValueChange={onValueChangeType}
      />
      <BaseDropdown
        label="Asset type"
        value="All Asset"
        options={filterItems.asset_type}
        onValueChange={onValueChangeAssetType}
      />
    </div>
  );
};
export default ProgramsFilterDropdown;
