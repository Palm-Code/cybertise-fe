"use client";
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
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/core/ui/components";
import { TableLoadingList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_TableColumns } from "@/interfaces";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";

interface I_TableProps {
  columns: I_TableColumns[];
  data?: I_GetChatListSuccessResponse["data"];
  isLoading?: boolean;
}

export default function Table({ data, columns, isLoading }: I_TableProps) {
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
                    align={column.align}
                    key={`table-head-${index}`}
                  >
                    {column.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableBodyRow
                  key={`table-row-${index}`}
                  isClickable
                  href={`/reports/${item.id}`}
                  hasNotification={!!item.has_new}
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
                          <Avatar
                            image={item.company?.logo as string}
                            className="h-8 w-8"
                          />
                          <Typography
                            variant="p"
                            affects="small"
                            weight="semibold"
                          >
                            {item.company?.name}
                          </Typography>
                        </div>
                        <Typography variant="p" affects="small" weight="normal">
                          #{item.code} - {item.title}
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
                            item.status && (item.status.toLowerCase() as any)
                          }
                        >
                          {item.status}
                        </Indicator>
                      </div>
                    </TableData>
                    <TableData
                      className={cn(
                        columns[4].width,
                        `text-${columns[4].align}`
                      )}
                    >
                      {item?.updated_at
                        ? formatDateToAgo(item?.updated_at)
                        : "-"}
                    </TableData>
                  </TableRow>
                </TableBodyRow>
              ))}
            </TableBody>
          </BaseTable>
        )}
      </AnimationWrapper>
    );
}
