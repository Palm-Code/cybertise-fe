"use client";
import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
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
import { TableLoadingList } from "@/core/ui/container";
import { AnimationWrapper, TableLoader } from "@/core/ui/layout";
import { I_TableColumns } from "@/interfaces";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import Image from "next/image";
import { Suspense, useState } from "react";
import TicketDropDown from "../../components/reports/_dropdown/TicketDropdown";

interface I_TableProps {
  columns: I_TableColumns[];
  data?: I_GetChatListSuccessResponse["data"];
  isLoading?: boolean;
}

export default function Table({ data, columns, isLoading }: I_TableProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
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
                    className={cn(
                      column.width,
                      "whitespace-nowrap text-nowrap"
                    )}
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
                    hasNotification={!!item.has_new}
                    isButton
                    onClick={() => setOpenDropdown(!openDropdown)}
                  >
                    <TableRow>
                      <TableData
                        className={cn(
                          columns[0].width,
                          `text-${columns[0].align}`
                        )}
                      >
                        <div className="_flexbox__col__start__start gap-4">
                          <div className="grid grid-cols-[auto_1fr] gap-1">
                            <div className="relative aspect-square w-8 overflow-hidden rounded-full">
                              <Image
                                src={item.company?.logo as string}
                                alt={`${item.id} logo`}
                                fill
                              />
                            </div>
                            <Typography
                              variant="p"
                              affects="small"
                              weight="normal"
                            >
                              #{item.code} - {item.title}
                            </Typography>
                          </div>
                          <Typography
                            variant="p"
                            affects="small"
                            weight="semibold"
                          >
                            {item.company?.name}
                          </Typography>
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
                            item.risk_level_category &&
                            (item.risk_level_category.toLowerCase() as any)
                          }
                          className="min-w-19"
                        >
                          {`${item.risk_level} | ${item.risk_level_category}`}
                        </Badge>
                      </TableData>
                      <TableData
                        className={cn(
                          columns[2].width,
                          `text-${columns[2].align}`
                        )}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: sanitize(
                              item.last_message.length > 50
                                ? item.last_message.substring(0, 50) + "..."
                                : item.last_message
                            ),
                          }}
                        ></div>
                      </TableData>
                      <TableData
                        className={cn(
                          columns[3].width,
                          `text-${columns[3].align}`
                        )}
                      >
                        <div className="_flexbox__row__center__start gap-3">
                          <Indicator
                            variant={
                              item.status === "Open" ? "warning" : "clear"
                            }
                          >
                            {item.status}
                          </Indicator>
                        </div>
                      </TableData>
                      <TableData
                        className={cn(
                          columns[4].width,
                          `text-${columns[4].align} _flexbox__row__end__end gap-4`
                        )}
                        align={columns[4].align}
                      >
                        {item.program?.updated_at
                          ? formatDateToAgo(item.program?.updated_at)
                          : "-"}
                        <TicketDropDown
                          open={openDropdown}
                          onOpenChange={setOpenDropdown}
                          hackerId={
                            item.ticket_type === "Hacker"
                              ? item.id
                              : (item.related_ticket_id as string)
                          }
                          companyTicketId={
                            item.ticket_type === "Company"
                              ? item.id
                              : (item.related_ticket_id as string)
                          }
                        />
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
