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
import { buttonVariants } from "@/core/ui/components/button/base-button";
import { I_TableColumns, I_TableTicketData } from "@/interfaces";
import { ProgramCardType } from "@/types/admin/programs";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import Image from "next/image";
import Link from "next/link";

interface I_TableProps {
  columns: I_TableColumns[];
  data: ProgramCardType[];
}

export default function Table({ data, columns }: I_TableProps) {
  return (
    <>
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
                  <div className="_flexbox__col__start__start gap-4">
                    <div className="_flexbox__row__center__start gap-1">
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
                    <div className="_flexbox__row__center__start gap-4">
                      <Badge variant="default">{item.domain}</Badge>
                    </div>
                  </div>
                </TableData>
                <TableData
                  className={cn(columns[1].width, `text-${columns[1].align}`)}
                >
                  <div className="_flexbox__row__center__start flex-wrap gap-3">
                    {item.asset_type.map((type, index) => (
                      <Badge key={`badge-${index}`} variant="default">
                        {type}
                      </Badge>
                    ))}
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
                    {currencyFormatters.NumberToUSD(item.min_bounty ?? 0)} -{" "}
                    {currencyFormatters.NumberToUSD(item.max_bounty ?? 0)}
                  </Typography>
                </TableData>
                <TableData
                  className={cn(columns[3].width, `text-${columns[3].align}`)}
                >
                  <Link
                    href={`/programs/${item.company_name}`}
                    className={cn(
                      buttonVariants({ variant: "primary-hacker" })
                    )}
                  >
                    See Details
                  </Link>
                </TableData>
              </TableRow>
            </TableBodyRow>
          ))}
        </TableBody>
      </BaseTable>
      <Pagination variant="hacker" />
    </>
  );
}
