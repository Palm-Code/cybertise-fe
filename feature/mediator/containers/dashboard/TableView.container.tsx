"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  BaseTable,
  Indicator,
  TableBody,
  TableBodyRow,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, TableLoader } from "@/core/ui/layout";
import { I_TableColumns, I_TableTicketData } from "@/interfaces";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import Image from "next/image";
import { Suspense } from "react";

interface I_TableProps {
  columns: I_TableColumns[];
  data: I_TableTicketData[];
}

export default function Table({ data, columns }: I_TableProps) {
  return (
    <AnimationWrapper>
      <BaseTable>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead className={column.width} key={`table-head-${index}`}>
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
                isClickable
                href={`/reports/${item.ticket_number}`}
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
                        <Typography
                          variant="p"
                          affects="small"
                          weight="semibold"
                        >
                          #{item.ticket_number} - {item.title}
                        </Typography>
                      </div>
                      <div className="_flexbox__row__center__start gap-4">
                        <Badge variant="default">{item.domain}</Badge>
                        <Typography variant="p" affects="small" weight="normal">
                          {item.date_reported}
                        </Typography>
                      </div>
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
                    {item.vulnerability_type}
                  </TableData>
                  <TableData
                    className={cn(columns[3].width, `text-${columns[3].align}`)}
                  >
                    {item.rewards
                      ? currencyFormatters.NumberToEUR(item.rewards)
                      : currencyFormatters.NumberToEUR(item.rewards)}
                  </TableData>
                  <TableData
                    className={cn(columns[4].width, `text-${columns[4].align}`)}
                  >
                    <div className="_flexbox__row__center__start gap-3">
                      <Indicator
                        variant={item.status === "Open" ? "warning" : "clear"}
                      />
                      {item.status}
                    </div>
                  </TableData>
                  <TableData
                    className={cn(columns[5].width, `text-${columns[5].align}`)}
                  >
                    {item.update ? formatDateToAgo(item.update) : "-"}
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
