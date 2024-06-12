"use client";
import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import {
  Badge,
  badgeVariants,
  BaseTable,
  Indicator,
  TableBody,
  TableBodyRow,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import { TableLoadingList } from "@/core/ui/container";
import { Hacker } from "@/core/ui/icons";
import { AnimationWrapper, TableLoader } from "@/core/ui/layout";
import { I_TableColumns } from "@/interfaces";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { Building2 } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

interface I_TableProps {
  columns: I_TableColumns[];
  data?: I_GetChatListSuccessResponse["data"];
  isLoading?: boolean;
}

export default function Table({
  data,
  columns,
  isLoading = false,
}: I_TableProps) {
  if (data)
    return (
      <AnimationWrapper>
        {isLoading ? (
          <TableLoadingList columns={columns} />
        ) : (
          <BaseTable>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead
                    className={column.width}
                    key={`table-head-${index}`}
                    align={column.align}
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
                    isClickable
                    href={`/reports/${item.id}`}
                    hasNotification={!!item.has_new_mediator}
                  >
                    <TableRow>
                      <TableData
                        className={cn(
                          columns[0].width,
                          `text-${columns[0].align}`
                        )}
                      >
                        <div className="_flexbox__col__start__start gap-4">
                          <div className="itemas-center grid grid-cols-[auto_1fr] gap-1">
                            <div className="relative h-6 w-6 overflow-hidden rounded-full">
                              <Image
                                src={item.company?.logo as string}
                                alt={`${item.title} logo`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Typography
                              variant="p"
                              affects="small"
                              weight="semibold"
                            >
                              #{item.code} - {item.title}
                            </Typography>
                          </div>
                          <div className="_flexbox__row__center__start gap-4">
                            <Badge variant={"default"}>
                              {item.program?.type}
                            </Badge>
                            <Typography
                              variant="p"
                              affects="small"
                              weight="normal"
                            >
                              reported {formatDateToAgo(item?.created_at ?? "")}{" "}
                              ago
                            </Typography>
                          </div>
                        </div>
                      </TableData>
                      <TableData
                        className={cn(
                          columns[1].width,
                          `text-${columns[1].align}`
                        )}
                      >
                        <Badge
                          variant={
                            item.risk_level_category.toLowerCase() as any
                          }
                          className="min-w-19"
                        >
                          {`${item.risk_level && item.risk_level} | ${item.risk_level_category}`}
                        </Badge>
                      </TableData>
                      <TableData
                        className={cn(
                          columns[2].width,
                          `text-${columns[2].align}`
                        )}
                      >
                        {item.vulnerabiity_type?.label}
                      </TableData>
                      <TableData
                        className={cn(
                          columns[3].width,
                          `text-${columns[3].align}`
                        )}
                      >
                        {item.bounty
                          ? currencyFormatters.NumberToEUR(item.bounty)
                          : currencyFormatters.NumberToEUR(0)}
                      </TableData>
                      <TableData
                        className={cn(
                          columns[4].width,
                          `text-${columns[4].align}`
                        )}
                      >
                        <Indicator
                          variant={
                            item.status.toLowerCase() as keyof typeof indicatorVariants
                          }
                        >
                          {item.status}
                        </Indicator>
                      </TableData>
                      <TableData
                        className={cn(columns[5].width)}
                        align={columns[5].align}
                      >
                        <Tooltip content={item.ticket_type}>
                          <div className="h-8 w-8 rounded-full bg-neutral-light-90 p-2 dark:bg-neutral-dark-90">
                            {item.ticket_type === "Hacker" ? (
                              <Hacker className="mx-auto h-full w-full text-lime-normal-light dark:text-lime-normal-dark" />
                            ) : (
                              <Building2 className="mx-auto h-full w-full text-sky-normal dark:text-sky-normal" />
                            )}
                          </div>
                        </Tooltip>
                      </TableData>
                      <TableData
                        className={cn(
                          columns[6].width,
                          `text-${columns[6].align}`
                        )}
                      >
                        {item?.updated_at
                          ? formatDateToAgo(item.updated_at)
                          : "-"}
                      </TableData>
                    </TableRow>
                  </TableBodyRow>
                ))}
              </Suspense>
            </TableBody>
          </BaseTable>
        )}
      </AnimationWrapper>
    );
}
