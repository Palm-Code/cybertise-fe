"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/core/ui/components/select/select";
import { SortFilterType } from "@/types/admin/dashboard";
import { Badge, Typography, badgeVariants } from "@/core/ui/components";

interface I_AssetTypeProps {
  onValueChange?: (value: string) => void;
  options?: SortFilterType[];
  value: string;
  label?: string;
  disabled?: boolean;
}

const AssetType = ({
  onValueChange = () => {},
  options = [],
  value,
  label = "Sort By",
  disabled = false,
  ...props
}: I_AssetTypeProps) => {
  const inputValueLabel = options.find((option) => option.id === value)?.label;
  const badgeValue = options.find((option) => option.id === value)?.value;

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger
        disabled={disabled}
        withIcon
        className="mx-auto !w-fit !justify-start gap-2  whitespace-nowrap !bg-transparent !p-0"
      >
        {inputValueLabel ? (
          <Badge variant={badgeValue as keyof typeof badgeVariants}>
            {inputValueLabel}
          </Badge>
        ) : (
          <Typography
            variant="p"
            affects="small"
            className="mr-1 text-neutral-light-30 dark:text-neutral-dark-30"
          >
            {label}
          </Typography>
        )}
      </SelectTrigger>
      <SelectContent
        align="center"
        alignOffset={-12}
        className="!bg-background-main-light !p-6 !pr-11 dark:!bg-background-main-dark"
      >
        <Typography variant="p" affects="small">
          {label}
        </Typography>
        <div className="mt-4 flex w-fit max-w-[360px] flex-wrap gap-x-2 gap-y-4">
          {options.length! ? (
            options.map((option, idx) => (
              <SelectItem
                className="!w-fit rounded-full !p-0"
                value={option.id as string}
                key={`asset-type-${idx}`}
                noCheck
              >
                <Badge variant={option.value as keyof typeof badgeVariants}>
                  {option.label}
                </Badge>
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no items" disabled>
              No options
            </SelectItem>
          )}
        </div>
      </SelectContent>
    </Select>
  );
};
export default AssetType;
