"use client";
import { cn } from "@/core/lib/utils";
import {
  AssetTypeTooltip,
  Avatar,
  Badge,
  badgeVariants,
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
import { AnimationWrapper } from "@/core/ui/layout";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import { TableLoadingList } from "@/core/ui/container";

interface I_TableProps {
  columns: I_TableColumns[];
  data: I_GetProgramListSuccessResponse["data"];
  isLoading?: boolean;
}

export default function Table({
  data,
  columns,
  isLoading = false,
}: I_TableProps) {
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
              <TableBodyRow
                key={`table-row-${index}`}
                isClickable
                href={`/vrp-launchpad/${item.id}`}
              >
                <TableRow>
                  <TableData
                    className={cn(columns[0].width, `text-${columns[0].align}`)}
                    align={columns[0].align}
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-4">
                      <Avatar
                        image={item.company?.logo}
                        className="h-6 w-6"
                        initials="S"
                      />
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
                    className={cn(columns[1].width, `text-${columns[1].align}`)}
                    align={columns[1].align}
                  >
                    <Typography
                      variant="p"
                      affects="small"
                      weight="semibold"
                    >
                      {item.title}
                    </Typography>
                  </TableData>
                  <TableData
                    className={cn(columns[2].width, `text-${columns[2].align}`)}
                    align={columns[2].align}
                  >
                    <Badge variant={"default"}>{item.type}</Badge>
                  </TableData>
                  <TableData
                    className={cn(columns[3].width, `text-${columns[3].align}`)}
                    align={columns[3].align}
                  >
                    <div className="_flexbox__row__center flex-wrap gap-3">
                      {item.asset_types &&
                        item.asset_types.slice(0, 3).map((type, index) => (
                          <Badge
                            key={`badge-${index}`}
                            variant={
                              type.label.toLowerCase() as keyof typeof badgeVariants
                            }
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
                    className={cn(columns[4].width, `text-${columns[4].align}`)}
                    align={columns[4].align}
                  >
                    <div className="mx-auto w-fit">
                      <Indicator
                        variant={
                          item.status.toLowerCase().includes("phase")
                            ? "open"
                            : "clear"
                        }
                      >
                        {item.status}
                      </Indicator>
                    </div>
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
