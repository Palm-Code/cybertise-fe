import { I_GetParamsPayload } from "@/core/models/common";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { SortFilterType } from "@/types/admin/dashboard";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Filter");
  return (
    <div className="_flexbox__row__center__start w-full gap-4 rounded-lg">
      <BaseDropdown
        label={t("asset_type")}
        value={
          payload?.params?.filter?.asset_type_id
            ? (options.find(
                (v) => v.id === payload?.params?.filter?.asset_type_id
              )?.value as string)
            : "all"
        }
        options={options}
        onValueChange={onValueChange}
      />
    </div>
  );
};
export default ProgramDetailScopeDropdown;
