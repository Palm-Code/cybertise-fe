"use client";
import { cn } from "@/core/lib/utils";
import { Search } from "lucide-react";
import Button from "../button/button";
import { useState } from "react";
import BaseModal from "../modal/modal";
import { useTranslations } from "next-intl";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "hacker" | "company" | "mediator";
  onSubmitSearch?: () => void;
  disabledButton?: boolean;
  loadingSubmit?: boolean;
  id?: string;
  isMobile?: boolean;
  buttonVariant?: "primary" | "secondary" | "tertiary";
}

const ModalSearch = ({
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string | number | readonly string[];
  variant?: "hacker" | "company" | "mediator";
  placeholder?: string;
  id?: string;
  buttonVariant?: "primary" | "secondary" | "tertiary";
}) => {
  return (
    <BaseModal
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      closeable
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
          id={`${props.id}-mobile`}
          title="search"
          type="text"
          placeholder={props.placeholder}
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
  id,
  isMobile = false,
  buttonVariant = "primary",
  ...props
}: SearchInputProps) => {
  const t = useTranslations("Common");
  const [open, setOpen] = useState(false);
  if (isMobile)
    return (
      <>
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
          id={id!!}
          isOpen={open}
          onClose={() => setOpen(false)}
          onChange={onChange}
          placeholder={props.placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setOpen(false);
              onSubmitSearch();
            }
          }}
        />
      </>
    );
  return (
    <>
      <div
        className={cn(
          "_flexbox__row__center w-full gap-2.5 rounded-full",
          "border border-neutral-dark-90 p-2 pl-6 dark:border-white"
        )}
      >
        <Search />
        <input
          value={value}
          id={id}
          type="text"
          className="h-full w-full bg-transparent outline-none"
          onKeyDown={(e) => e.key === "Enter" && onSubmitSearch()}
          onChange={onChange}
          {...props}
        />
        <Button
          variant={`${buttonVariant}-${variant}`}
          onClick={onSubmitSearch}
          disabled={disabledButton}
          isLoading={loadingSubmit}
        >
          {t("submit_search")}
        </Button>
      </div>
    </>
  );
};
export default SearchInput;
