import { cn } from "@/core/lib/utils";
import { Search } from "lucide-react";
import Button from "../button/button";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "hacker" | "company" | "mediator";
}

const SearchInput = ({ variant, ...props }: SearchInputProps) => {
  return (
    <div
      className={cn(
        "_flexbox__row__center w-full gap-2.5 rounded-full",
        "border border-neutral-dark-90 p-2 pl-6 dark:border-white"
      )}
    >
      <Search />
      <input
        type="text"
        className="w-full bg-transparent outline-none"
        {...props}
      />
      <Button variant={`primary-${variant}`}>Search</Button>
    </div>
  );
};
export default SearchInput;
