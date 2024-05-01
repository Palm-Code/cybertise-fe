"use client";
import { cn } from "@/core/lib/utils";
import { Search } from "lucide-react";
import Button from "../button/button";
import { Desktop, Mobile } from "../../layout";
import { useState } from "react";
import BaseModal, { I_ModalProps } from "../modal/modal";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "hacker" | "company" | "mediator";
  onSubmitSearch?: () => void;
  disabledButton?: boolean;
  loadingSubmit?: boolean;
}

const ModalSearch = ({
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string | number | readonly string[];
}) => {
  return (
    <BaseModal
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      className="top-12 z-30 !justify-start bg-background-main-light p-6 dark:bg-background-main-dark"
    >
      <div
        className={cn(
          "_flexbox__row__center w-full gap-2.5 rounded-full",
          "border border-neutral-dark-90 p-2 pl-6 dark:border-white"
        )}
      >
        <Search />
        <input
          value={props.value}
          title="search"
          type="text"
          placeholder="Search"
          pattern=""
          enterKeyHint="search"
          className="w-full bg-transparent p-2 outline-none"
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
        />
      </div>
    </BaseModal>
  );
};

const SearchInput = ({
  variant,
  loadingSubmit,
  disabledButton,
  onSubmitSearch = () => {},
  onChange = () => {},
  value = "",
  ...props
}: SearchInputProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Mobile className="w-fit">
        <button
          type="button"
          title="search"
          className="_flexbox__row__center"
          onClick={() => setOpen(true)}
        >
          <Search />
        </button>
        <ModalSearch
          value={value}
          isOpen={open}
          onClose={() => setOpen(false)}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setOpen(false);
              onSubmitSearch();
            }
          }}
        />
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
            value={value}
            type="text"
            className="w-full bg-transparent outline-none"
            onKeyDown={(e) => e.key === "Enter" && onSubmitSearch()}
            onChange={onChange}
            {...props}
          />
          <Button
            variant={`primary-${variant}`}
            onClick={onSubmitSearch}
            disabled={disabledButton}
            isLoading={loadingSubmit}
          >
            Search
          </Button>
        </div>
      </Desktop>
    </>
  );
};
export default SearchInput;
