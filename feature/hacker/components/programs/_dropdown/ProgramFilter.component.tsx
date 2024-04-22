"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import { SortFilterType } from "@/types/admin/dashboard";

interface IProgramsFilterDropdownProps {
  variant?: "hacker" | "company" | "mediator";
  refetch?: () => void;
  payload?: I_GetParamsPayload;
  assetTypeOptions?: SortFilterType[];
  onValueChangeType?: (value: string) => void;
  onValueChangeAssetType?: (value: string) => void;
}

const ProgramsFilterDropdown = ({
  variant = "hacker",
  payload = {},
  assetTypeOptions = [],
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
        value={
          assetTypeOptions?.find(
            (item) => item.id === payload?.params?.filter?.has_asset_type
          )?.value as string
        }
        options={assetTypeOptions}
        onValueChange={onValueChangeAssetType}
      />
    </div>
  );
};
export default ProgramsFilterDropdown;
