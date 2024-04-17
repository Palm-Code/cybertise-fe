"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  BaseTable,
  Indicator,
  Pagination,
  TableBody,
  TableBodyRow,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, TableLoader } from "@/core/ui/layout";
import { I_TableColumns, I_TableReportTicketData } from "@/interfaces";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

interface I_TableProps {
  columns: I_TableColumns[];
  data: I_TableReportTicketData[];
}

export default function Table({ data, columns }: I_TableProps) {
  return (
    <AnimationWrapper>
      <BaseTable>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                className={cn(column.width, "whitespace-nowrap text-nowrap")}
                key={`table-head-${index}`}
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<TableLoader />}>
            {data.map((item, index) => (
              <TableBodyRow
                key={`table-row-${index}`}
                hasNotification={item.is_new_notification}
              >
                <TableRow>
                  <TableData
                    className={cn(columns[0].width, `text-${columns[0].align}`)}
                  >
                    <div className="_flexbox__col__start__start gap-4">
                      <div className="_flexbox__row__center__start gap-1">
                        <Image
                          src={item.logo}
                          alt={`${item.title} logo`}
                          width={24}
                          height={24}
                        />
                        <Typography variant="p" affects="small" weight="normal">
                          #{item.ticket_number} - {item.title}
                        </Typography>
                      </div>
                      <Typography variant="p" affects="small" weight="semibold">
                        {item.company_name}
                      </Typography>
                    </div>
                  </TableData>
                  <TableData
                    className={cn(columns[1].width, `text-${columns[1].align}`)}
                  >
                    <Badge variant={item.risk_level} className="w-19">
                      {item.risk_level}
                    </Badge>
                  </TableData>
                  <TableData
                    className={cn(columns[2].width, `text-${columns[2].align}`)}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitize(item.description),
                      }}
                    ></div>
                  </TableData>
                  <TableData
                    className={cn(columns[3].width, `text-${columns[3].align}`)}
                  >
                    <div className="_flexbox__row__center__start gap-3">
                      <Indicator
                        variant={item.status === "Open" ? "warning" : "clear"}
                      >
                        {item.status}
                      </Indicator>
                    </div>
                  </TableData>
                  <TableData
                    className={cn(
                      columns[4].width,
                      `text-${columns[4].align} _flexbox__row__center__between gap-2`
                    )}
                  >
                    {item.update ? formatDateToAgo(item.update) : "-"}
                    <ChevronRight />
                  </TableData>
                </TableRow>
              </TableBodyRow>
            ))}
          </Suspense>
        </TableBody>
      </BaseTable>
    </AnimationWrapper>
  );
}
