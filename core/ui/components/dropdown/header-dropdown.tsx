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
  avatar = "/favicon.png",
}: I_HeaderDropdownProps) => {
  const pathname = usePathname();

  return (
    <Desktop className="w-fit">
      <Select onValueChange={onValueChange} defaultValue={pathname.slice(1)}>
        <SelectTrigger className="!w-fit !justify-start gap-4 whitespace-nowrap text-nowrap !bg-transparent xl:p-0">
          <Avatar image={avatar} />
        </SelectTrigger>
        <SelectContent className="!bg-white dark:!bg-neutral-dark-100">
          {options.length! ? (
            options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value as string}
                className="flex items-center gap-3"
              >
                {option.icon && option.icon}
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no items" disabled>
              No options
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </Desktop>
  );
};
export default HeaderDropdown;
