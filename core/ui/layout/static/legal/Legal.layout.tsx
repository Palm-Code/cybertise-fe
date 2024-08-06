import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import { getCurrentDate } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import { format } from "date-fns";
import React from "react";

export const Legal = ({
  data,
}: {
  data: {
    title: string;
    date_published: Date;
    content: string;
  };
}) => {
  return (
    <main
      className={cn(
        "container flex w-full max-w-4xl flex-col rounded-2xl border border-white",
        "mt-24 flex flex-col gap-14 px-8 py-14",
        "bg-neutral-light-100 dark:bg-neutral-dark-100"
      )}
    >
      <div className="mx-auto flex flex-col gap-2">
        <Typography variant="h4" align="center">
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
      <article
        dangerouslySetInnerHTML={{ __html: sanitize(data.content) }}
        className="legal"
      ></article>
    </main>
  );
};
