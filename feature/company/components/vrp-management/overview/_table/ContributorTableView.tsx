"use client";
import { cn } from "@/core/lib/utils";
import { I_GetContributorsSuccessResponse } from "@/core/models/common/contributors";
import { I_GetCollaboratorSuccessResponse } from "@/core/models/mediator/collaborators";
import {
  AssetTypeTooltip,
  Avatar,
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
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { useTranslations } from "next-intl";

interface I_TableProps {
  columns: I_TableColumns[];
  data: I_GetContributorsSuccessResponse["data"];
}

export function ContributorTableView({ data, columns }: I_TableProps) {
  const t = useTranslations("CompanyDetailsMediator.collaborators");

  return (
    <BaseTable>
      <div
        className={cn(
          "w-full",
          "bg-background-page-light dark:bg-background-page-dark"
        )}
      >
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
      </div>
      <TableBody>
        {data.map((item, index) => (
          <TableBodyRow key={`table-row-${index}`}>
            <TableRow>
              <TableData
                className={cn(columns[0].width, `text-${columns[0].align}`)}
              >
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <Avatar
                    className={cn("size-6")}
                    image={item.user.avatar || ""}
                  />
                  <Typography variant="p" affects="small" weight="semibold">
                    {item.user.name}
                  </Typography>
                </div>
              </TableData>
              <TableData
                className={cn(columns[1].width, `text-${columns[1].align}`)}
              >
                <Typography
                  variant="p"
                  affects="normal"
                  align={columns[1].align}
                >
                  {`${item.user.valid_report} ${t("ticket")}${item.user.valid_report > 1 ? "s" : ""}`}
                </Typography>
              </TableData>
              <TableData
                className={cn(columns[2].width, `text-${columns[2].align}`)}
              >
                {item.user.asset_types.length > 0 ? (
                  <AssetTypeTooltip assetTypes={item.user.asset_types}>
                    <Typography
                      variant="p"
                      affects="normal"
                      align={columns[2].align}
                    >
                      {`${item.user.asset_types.length} ${t("asset_type")}${item.user.asset_types.length > 1 ? "s" : ""}`}
                    </Typography>
                  </AssetTypeTooltip>
                ) : (
                  <Typography
                    variant="p"
                    affects="normal"
                    align={columns[2].align}
                  >
                    {`${item.user.asset_types.length} ${t("asset_type")}${item.user.asset_types.length > 1 ? "s" : ""}`}
                  </Typography>
                )}
              </TableData>
              <TableData
                className={cn(columns[3].width, `text-${columns[3].align}`)}
              >
                <Typography
                  variant="p"
                  affects="normal"
                  align={columns[3].align}
                >
                  {item.user.last_active
                    ? formatDateToAgo(item.user.last_active)
                    : "-"}{" "}
                  {t("ago")}
                </Typography>
              </TableData>
            </TableRow>
          </TableBodyRow>
        ))}
      </TableBody>
    </BaseTable>
  );
}
