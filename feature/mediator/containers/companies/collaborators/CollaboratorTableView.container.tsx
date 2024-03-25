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
import { I_TableColumns } from "@/interfaces";
import { AnimationWrapper } from "@/core/ui/layout";
import {
  CollaboratorCardDataType,
  VRPCardType,
} from "@/types/admin/vrp-launchpad";

interface I_TableProps {
  columns: I_TableColumns[];
  data: CollaboratorCardDataType[];
}

export default function Table({ data, columns }: I_TableProps) {
  return (
    <AnimationWrapper>
      <BaseTable>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                className={cn(column.width)}
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
                  className={cn(columns[0].width, `text-${columns[0].align}`)}
                >
                  <Typography
                    variant="p"
                    affects="small"
                    weight="semibold"
                    align={columns[0].align}
                  >
                    {item.name}
                  </Typography>
                </TableData>
                <TableData
                  className={cn(columns[1].width, `text-${columns[1].align}`)}
                >
                  <Typography
                    variant="p"
                    affects="normal"
                    align={columns[1].align}
                  >
                    {item.location}
                  </Typography>
                </TableData>
              </TableRow>
            </TableBodyRow>
          ))}
        </TableBody>
      </BaseTable>
    </AnimationWrapper>
  );
}
