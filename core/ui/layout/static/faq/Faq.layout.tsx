"use client";
import { cn } from "@/core/lib/utils";
import { SearchInput, Typography } from "@/core/ui/components";
import { format } from "date-fns";
import React from "react";
import { Navbar } from "../../navbar";
import Image from "next/image";
import { AccordionList } from "./Accordion";

export const FaqLayout = ({
  data,
}: {
  data: {
    title: string;
    date_published: Date;
    content: {
      question: string;
      answer: string;
    }[];
  };
}) => {
  return (
    <>
      <Navbar />
      <main className={cn("flex w-full flex-col rounded-2xl")}>
        <div className="relative mx-auto flex aspect-[1563/400] w-full items-center justify-center gap-2 md:aspect-[1440/238]">
          <div className="absolute top-0 z-10 h-full w-full">
            <Image
              src="/images/gradient-bg.svg"
              alt="gradient"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-20 my-auto flex flex-col gap-2">
            <Typography
              variant="h1"
              align="center"
              weight="bold"
              className="!text-white"
            >
              {data.title}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              align="center"
              className="text-neutral-light-50 dark:text-neutral-dark-50"
            >
              Last Update: {format(data.date_published, "MMMM, dd yyyy")}
            </Typography>
          </div>
        </div>
        <div className="mx-auto my-6 w-full max-w-[804px] space-y-6 p-6">
          <div className="w-full py-8">
            <SearchInput
              variant="hacker"
              placeholder="Search your question"
            />
          </div>
          <AccordionList data={data.content} />
        </div>
      </main>
    </>
  );
};
