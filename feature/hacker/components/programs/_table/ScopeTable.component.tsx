"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  BaseTable,
  Pagination,
  TableBody,
  TableBodyRow,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/core/ui/components";
import { I_TableColumns } from "@/interfaces";
import { ProgramDetailScope } from "@/types/admin/programs";
import { AnimationWrapper } from "@/core/ui/layout";

interface I_TableProps {
  columns: I_TableColumns[];
  data: ProgramDetailScope[];
}

export default function ScopeTable({ data, columns }: I_TableProps) {
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
          {data.map((item, index) => (
            <TableBodyRow key={`table-row-${index}`}>
              <TableRow>
                <TableData
                  className={cn(columns[0].width, `text-${columns[0].align}`)}
                >
                  <div className="_flexbox__row__center__start gap-1">
                    <Typography variant="p" affects="small" weight="semibold">
                      {item.asset_name}
                    </Typography>
                  </div>
                </TableData>
                <TableData
                  className={cn(columns[1].width, `text-${columns[1].align}`)}
                >
                  <div className="_flexbox__row__center__start gap-4">
                    <Badge className="!min-w-24" variant={item.asset_type}>
                      {item.asset_type}
                    </Badge>
                  </div>
                </TableData>
                <TableData
                  className={cn(columns[2].width, `text-${columns[2].align}`)}
                >
                  <Typography
                    variant="p"
                    affects="normal"
                    className="text-nowrap"
                  >
                    {(item.update && item.update.toString().split("T")[0]) ||
                      "-"}
                  </Typography>
                </TableData>
              </TableRow>
            </TableBodyRow>
          ))}
        </TableBody>
      </BaseTable>
      <Pagination variant="hacker" />
    </AnimationWrapper>
  );
}
