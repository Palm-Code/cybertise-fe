import { usePathname } from "next/navigation";
import { Desktop } from "../../layout";
import Avatar from "../avatar/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../select/select";
import Typography from "../typography/typography";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";

interface I_HeaderDropdownProps {
  options: {
    label: string;
    value: string;
    icon?: JSX.Element;
  }[];
  onValueChange: (value: string) => void;
  avatar?: string;
}

const HeaderDropdown = ({
  options,
  onValueChange,
  avatar = "",
}: I_HeaderDropdownProps) => {
  const pathname = usePathname();

  return (
    <Desktop className="w-fit">
      <Select
        name="header-options"
        onValueChange={onValueChange}
        defaultValue={pathname.slice(1)}
      >
        <SelectTrigger
          name="header-options-trigger"
          className="!w-fit !justify-start gap-1.5 whitespace-nowrap text-nowrap !bg-transparent xl:p-0"
        >
          <Avatar
            image={avatar}
            initials={""}
          />
          <ChevronDown />
        </SelectTrigger>
        <SelectContent
          sideOffset={8}
          className="!bg-white dark:!bg-neutral-dark-100"
        >
          {options.length! ? (
            options.map((option) =>
              option.value === "settings" ? (
                <Link
                  key={option.value}
                  href={`/${option.value}`}
                  className="flex items-center gap-3 rounded py-1.5 pl-2 hover:bg-neutral-100 hover:dark:bg-neutral-800"
                >
                  {option.icon}
                  {option.label}
                  {pathname === `/settings` && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </Link>
              ) : (
                <SelectItem
                  key={option.value}
                  value={option.value as string}
                  className="flex items-center gap-3"
                >
                  {option.icon && option.icon}
                  {option.label}
                </SelectItem>
              )
            )
          ) : (
            <SelectItem
              value="no items"
              disabled
            >
              No options
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </Desktop>
  );
};
export default HeaderDropdown;
