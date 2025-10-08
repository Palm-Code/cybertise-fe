"use client";
import { I_Meta } from "@/core/models/common";
import Showing from "../showing/showing";
import Typography from "../typography/typography";
import {
  BasePagination,
  I_PaginationProps,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./base-pagination";
import { useState } from "react";
import { useTranslations } from "next-intl";

type PaginationProps = I_PaginationProps & {
  active?: number;
  onClickShow?: (v: number) => void;
  activePage?: number;
  meta?: I_Meta;
  setActivePage?: (v: number) => void;
  onClickNext?: () => void;
  onClickPrevious?: () => void;
};

const Pagination = ({
  variant,
  active,
  onClickShow,
  activePage = 1,
  meta,
  onClickNext = () => {},
  onClickPrevious = () => {},
  setActivePage = () => {},
}: PaginationProps) => {
  const t = useTranslations("Pagination");
  const [slicePage, setSlicePage] = useState(3);
  //split meta.last_page into array of number
  const pageNumbers = meta
    ? Array.from({ length: meta.last_page }, (_, i) => i + 1)
    : [1];
  return (
    <BasePagination className="_flexbox__row__center__between w-full gap-2">
      <Showing
        active={active}
        variant={variant}
        onClickShow={onClickShow}
      />
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="small"
        >
          {t("page")}
        </Typography>
        <PaginationContent>
          {meta && meta?.last_page > 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious
                  variant={variant}
                  disabled={activePage === 1}
                  onClick={() => {
                    if (slicePage - activePage === 2) {
                      setSlicePage(slicePage - 3);
                    }
                    onClickPrevious();
                  }}
                />
              </PaginationItem>
              {slicePage > 3 && (
                <PaginationItem>
                  <PaginationLink
                    variant={variant}
                    onClick={() => setSlicePage(slicePage - 3)}
                  >
                    <PaginationEllipsis />
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          )}
          {pageNumbers.slice(slicePage - 3, slicePage).map((item) => (
            <PaginationItem key={item}>
              <PaginationLink
                variant={variant}
                isActive={activePage === item}
                onClick={() => setActivePage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}
          {meta && meta?.last_page > 1 && (
            <>
              {slicePage < pageNumbers.length && (
                <PaginationItem>
                  <PaginationLink
                    variant={variant}
                    onClick={() => setSlicePage(slicePage + 3)}
                  >
                    <PaginationEllipsis />
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  variant={variant}
                  disabled={meta?.last_page === activePage}
                  onClick={() => {
                    if (activePage - slicePage === 0) {
                      setSlicePage(slicePage + 3);
                    }
                    onClickNext();
                  }}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </div>
    </BasePagination>
  );
};
export default Pagination;
