import { cn } from "@/core/lib/utils";
import {
  AssetTypeTooltip,
  Badge,
  BaseTable,
  TableBody,
  TableBodyRow,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { I_TableColumns } from "@/interfaces";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import Image from "next/image";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import { TableLoadingList } from "@/core/ui/container";
import { ShieldCheck } from "@/core/ui/icons";

interface I_TableProps {
  columns: I_TableColumns[];
  isLoading?: boolean;
  data?: I_GetProgramListSuccessResponse["data"];
}

export default function Table({ data, columns, isLoading }: I_TableProps) {
  if (isLoading) return <TableLoadingList columns={columns} />;

  if (data)
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
                href={`/programs/${item.id}`}
              >
                <TableRow>
                  <TableData
                    className={cn(columns[0].width, `text-${columns[0].align}`)}
                  >
                    <div className="_flexbox__row__center__start gap-4">
                      <div className="relative aspect-square w-8 overflow-hidden rounded-full">
                        <Image
                          src={item.company?.logo as string}
                          alt={`${item.title} logo`}
                          fill
                          sizes="100%"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Typography
                          variant="p"
                          affects="small"
                          weight="semibold"
                        >
                          {item.company?.name}
                        </Typography>
                        <Badge variant="default" className="w-fit">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </TableData>
                  <TableData
                    className={cn(columns[1].width)}
                    align={columns[1].align}
                  >
                    <Tooltip content={item.title}>
                      <Typography variant="p" affects="small" weight="semibold">
                        {item.title.length > 20
                          ? `${item.title.substring(0, 20)}...`
                          : item.title}
                      </Typography>
                    </Tooltip>
                  </TableData>
                  <TableData
                    className={cn(columns[2].width, `text-${columns[2].align}`)}
                  >
                    <div className="_flexbox__row__center__start flex-wrap gap-3">
                      {item.asset_types?.slice(0, 3).map((type, index) => (
                        <Badge
                          key={`badge-${index}`}
                          variant={type.label as any}
                        >
                          {type.value}
                        </Badge>
                      ))}
                      {item.asset_types && item.asset_types?.length > 3 && (
                        <AssetTypeTooltip
                          assetTypes={item.asset_types.slice(3)}
                        >
                          <Badge variant="default">
                            +{item.asset_types?.length - 3} More
                          </Badge>
                        </AssetTypeTooltip>
                      )}
                    </div>
                  </TableData>
                  <TableData
                    className={cn(columns[3].width, `text-${columns[3].align}`)}
                  >
                    <div className="grid grid-cols-[18px_1fr] gap-4">
                      <Tooltip
                        content={item.monetary_awards_level.split("-")[0]}
                      >
                        <ShieldCheck
                          category={item.monetary_awards_level.split("-")[0]}
                        />
                      </Tooltip>
                      <Typography
                        variant="p"
                        affects="normal"
                        className="whitespace-nowrap text-nowrap"
                      >
                        {currencyFormatters.NumberToEUR(
                          item.company?.lowest_bounty ?? 0
                        )}{" "}
                        -{" "}
                        {currencyFormatters.NumberToEUR(
                          item.company?.highest_bounty ?? 0
                        )}
                      </Typography>
                    </div>
                  </TableData>
                </TableRow>
              </TableBodyRow>
            ))}
          </TableBody>
        </BaseTable>
      </AnimationWrapper>
    );
}
