"use client";
import { cn } from "@/core/lib/utils";
import {
  AssetTypeTooltip,
  Avatar,
  Badge,
  badgeVariants,
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
import { I_TableColumns } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { AnimationWrapper } from "@/core/ui/layout";
import { VRPCardType } from "@/types/admin/vrp-launchpad";
import { I_GetCompaniesSuccessResponse } from "@/core/models/mediator/companies/get_companies";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import { TableLoadingList } from "@/core/ui/container";

interface I_TableProps {
  columns: I_TableColumns[];
  data?: I_GetCompaniesSuccessResponse["data"];
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
                  href={`/companies/${item.id}`}
                >
                  <TableRow>
                    <TableData
                      className={cn(
                        columns[0].width,
                        `text-${columns[0].align}`
                      )}
                    >
                      <div className="_flexbox__row__start__start gap-4">
                        <Avatar
                          className="h-6 w-6"
                          image={item.logo}
                          initials="C"
                        />
                        <div className="_flexbox__col__start__start gap-4">
                          <Typography
                            variant="p"
                            affects="small"
                            weight="semibold"
                          >
                            {item.name}
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
                      <div className="_flexbox__row__center__start flex-wrap gap-3">
                        {item.asset_types &&
                          item.asset_types.slice(0, 3).map((type, index) => (
                            <Badge
                              key={`badge-${index}`}
                              variant={type.label as keyof typeof badgeVariants}
                            >
                              {type.value}
                            </Badge>
                          ))}
                        {item.asset_types && item.asset_types.length > 3 && (
                          <AssetTypeTooltip
                            assetTypes={item.asset_types.slice(3)}
                          >
                            <Badge variant="default">
                              {`+${item.asset_types.length - 3}`} more
                            </Badge>
                          </AssetTypeTooltip>
                        )}
                      </div>
                    </TableData>
                    <TableData
                      className={cn(
                        columns[2].width,
                        `text-${columns[2].align}`
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
                  </TableRow>
                </TableBodyRow>
              ))}
            </TableBody>
          </BaseTable>
        )}
      </AnimationWrapper>
    );
}
