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
import { I_TableColumns } from "@/interfaces";
import Image from "next/image";
import { AnimationWrapper } from "@/core/ui/layout";
import { VRPCardType } from "@/types/admin/vrp-launchpad";

interface I_TableProps {
  columns: I_TableColumns[];
  data: VRPCardType[];
}

export default function Table({ data, columns }: I_TableProps) {
  return (
    <AnimationWrapper>
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
            <TableBodyRow
              key={`table-row-${index}`}
              isClickable
              href={`/reports/${item.company_id}`}
            >
              <TableRow>
                <TableData
                  className={cn(columns[0].width, `text-${columns[0].align}`)}
                >
                  <div className="_flexbox__row__start__start gap-4">
                    <Image
                      src={item.logo}
                      alt={`${item.company_name} logo`}
                      width={24}
                      height={24}
                    />
                    <Typography variant="p" affects="small" weight="semibold">
                      {item.company_name}
                    </Typography>
                  </div>
                </TableData>
                <TableData
                  className={cn(columns[1].width, `text-${columns[1].align}`)}
                >
                  <Badge variant="default">{item.domain}</Badge>
                </TableData>
                <TableData
                  className={cn(columns[2].width, `text-${columns[2].align}`)}
                >
                  <div className="_flexbox__row__center__start flex-wrap gap-3">
                    {item.asset_type.map((type, index) => (
                      <Badge key={`badge-${index}`} variant={type.value as any}>
                        {type.label}
                      </Badge>
                    ))}
                  </div>
                </TableData>
                <TableData
                  className={cn(columns[3].width, `text-${columns[3].align}`)}
                >
                  <Indicator
                    variant={item.status === "active" ? "warning" : "clear"}
                  >
                    {item.status}
                  </Indicator>
                </TableData>
              </TableRow>
            </TableBodyRow>
          ))}
        </TableBody>
      </BaseTable>
    </AnimationWrapper>
  );
}
