"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  BaseTable,
  TableBody,
  TableBodyRow,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/core/ui/components";
import { I_TableColumns } from "@/interfaces";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { TableLoadingList } from "@/core/ui/container";

interface I_TableProps {
  columns: I_TableColumns[];
  isLoading?: boolean;
  data: I_GetProgramDetailsSuccessResponse["data"]["target_assets"];
}

export default function ScopeTable({ data, columns, isLoading }: I_TableProps) {
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
              {data.map((item, index) => (
                <TableBodyRow key={`table-row-${index}`}>
                  <TableRow>
                    <TableData
                      className={cn(
                        columns[0].width,
                        `text-${columns[0].align}`
                      )}
                    >
                      <div className="_flexbox__row__center__start gap-1">
                        <Typography
                          variant="p"
                          affects="small"
                          weight="semibold"
                        >
                          {item.content}
                        </Typography>
                      </div>
                    </TableData>
                    <TableData
                      className={cn(
                        columns[1].width,
                        `text-${columns[1].align}`
                      )}
                      align={columns[1].align}
                    >
                      <Badge
                        className="!min-w-24"
                        variant={item.asset_type.label as any}
                      >
                        {item.asset_type.value}
                      </Badge>
                    </TableData>
                    <TableData
                      className={cn(
                        columns[2].width,
                        `text-${columns[2].align}`
                      )}
                    >
                      <Typography
                        variant="p"
                        affects="normal"
                        className="whitespace-nowrap text-nowrap"
                      >
                        {(item.updated_at &&
                          item.updated_at.toString().split("T")[0]) ||
                          "-"}
                      </Typography>
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
