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
import { buttonVariants } from "@/core/ui/components/button/base-button";
import { I_TableColumns } from "@/interfaces";
import { ProgramCardType } from "@/types/admin/programs";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import Image from "next/image";
import Link from "next/link";
import { AnimationWrapper } from "@/core/ui/layout";

interface I_TableProps {
  columns: I_TableColumns[];
  data: ProgramCardType[];
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
              href={`/programs/${item.company_id}`}
            >
              <TableRow>
                <TableData
                  className={cn(columns[0].width, `text-${columns[0].align}`)}
                >
                  <div className="_flexbox__row__center__start gap-4">
                    <Image
                      src={item.logo}
                      alt={`${item.company_name} logo`}
                      width={32}
                      height={32}
                    />
                    <Typography variant="p" affects="small" weight="semibold">
                      {item.company_name}
                    </Typography>
                  </div>
                </TableData>
                <TableData
                  className={cn(columns[1].width)}
                  align={columns[1].align}
                >
                  <Badge variant="default">{item.domain}</Badge>
                </TableData>
                <TableData
                  className={cn(columns[2].width, `text-${columns[2].align}`)}
                >
                  <div className="_flexbox__row__center__start flex-wrap gap-3">
                    {item.asset_type.map((type, index) => (
                      <Badge key={`badge-${index}`} variant={type.value}>
                        {type.label}
                      </Badge>
                    ))}
                  </div>
                </TableData>
                <TableData
                  className={cn(columns[3].width, `text-${columns[3].align}`)}
                >
                  <Typography
                    variant="p"
                    affects="normal"
                    className="whitespace-nowrap text-nowrap"
                  >
                    {currencyFormatters.NumberToEUR(item.min_bounty ?? 0)} -{" "}
                    {currencyFormatters.NumberToEUR(item.max_bounty ?? 0)}
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
