import { cn } from "@/core/lib/utils";
import { Search } from "lucide-react";
import Button from "../button/button";
import { Desktop, Mobile } from "../../layout";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "hacker" | "company" | "mediator";
}

const SearchInput = ({ variant, ...props }: SearchInputProps) => {
  return (
    <>
      <Mobile className="w-fit">
        <button type="button" title="search" className="_flexbox__row__center">
          <Search />
        </button>
        {/* <div
          className={cn(
            "_flexbox__row__center w-full gap-2.5 rounded-full",
            "border border-neutral-dark-90 p-2 pl-6 dark:border-white"
          )}
        >
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            {...props}
          />
          <Button variant={`primary-${variant}`}>Search</Button>
        </div> */}
      </Mobile>
      <Desktop>
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
      </Desktop>
    </>
  );
};
export default SearchInput;
