import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import {
  Avatar,
  Badge,
  BaseTable,
  Indicator,
  TableBody,
  TableBodyRow,
  TableData,
  TableRow,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, TableLoader } from "@/core/ui/layout";
import { I_TableColumns } from "@/interfaces";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const CardView = ({
  data,
  columns,
}: {
  data?: I_GetChatListSuccessResponse["data"];
  isLoading?: boolean;
  columns: I_TableColumns[];
}) => {
  if (data)
    return (
      <AnimationWrapper>
        <BaseTable>
          <TableBody>
            <Suspense fallback={<TableLoader />}>
              {data.map((item, index) => (
                <TableBodyRow
                  key={`table-row-${index}`}
                  isClickable
                  href={`/reports/${item.id}`}
                  hasNotification={!!item.has_new}
                  className={cn(
                    "border border-neutral-light-50/30 bg-background-page-light/80 backdrop-blur-[7.5px] dark:border-neutral-dark-50/30 dark:bg-background-page-dark/80"
                  )}
                >
                  <TableRow>
                    <TableData
                      className={cn(
                        columns[0].width,
                        `text-${columns[0].align}`
                      )}
                    >
                      <div className="_flexbox__col__start__start gap-4">
                        <div className="_flexbox__row__center__start gap-1">
                          <div className="relative aspect-square w-8 overflow-hidden rounded-full">
                            <Image
                              src={item.company?.logo as string}
                              alt={`${item.id} logo`}
                              fill
                              sizes="100%"
                            />
                          </div>
                          <Typography
                            variant="p"
                            affects="small"
                            weight="semibold"
                            className="w-[calc(100%-36px)]"
                          >
                            #{item.code} - {item.title}
                          </Typography>
                        </div>
                        <div className="_flexbox__row__center__start gap-4">
                          <Badge variant="default">{item.program?.type}</Badge>
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
                        variant={item.risk_level_category.toLowerCase() as any}
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
                          item.status && (item.status.toLowerCase() as any)
                        }
                      >
                        {item.status}
                      </Indicator>
                    </TableData>
                    <TableData
                      className={cn(
                        columns[5].width,
                        `text-${columns[5].align}`
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
      </AnimationWrapper>
    );
};

export default CardView;
