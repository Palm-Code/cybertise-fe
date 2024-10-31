"use client";
import { cn } from "@/core/lib/utils";
import { I_GetCollaboratorSuccessResponse } from "@/core/models/mediator/collaborators";
import {
  AssetTypeTooltip,
  BaseTable,
  Button,
  Checkbox,
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
  data: I_GetCollaboratorSuccessResponse["data"];
  isLoading: boolean;
  onClickDeleteCollaborator: (ids: string[]) => void;
  onChangeCheckbox: (id: string, checked: boolean) => void;
}

export default function Table({
  data,
  columns,
  isLoading,
  onClickDeleteCollaborator,
  onChangeCheckbox,
}: I_TableProps) {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  return (
    <BaseTable>
      <div
        className={cn(
          "sticky top-0 z-10 h-full w-full",
          "bg-background-main-light dark:bg-background-main-dark"
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
          <TableBodyRow
            key={`table-row-${index}`}
            className={cn(
              index % 2 &&
                "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <TableRow>
              <TableData
                className={cn(columns[0].width, `text-${columns[0].align}`)}
              >
                <Checkbox
                  variant="mediator"
                  onCheckedChange={(checked: boolean) => {
                    item.id && onChangeCheckbox(item.id, checked);
                  }}
                />
              </TableData>
              <TableData
                className={cn(columns[1].width, `text-${columns[1].align}`)}
              >
                <Typography
                  variant="p"
                  affects="small"
                  weight="semibold"
                  align={columns[1].align}
                >
                  {item.user.name}
                </Typography>
              </TableData>
              <TableData
                className={cn(columns[2].width, `text-${columns[2].align}`)}
              >
                <Typography
                  variant="p"
                  affects="normal"
                  align={columns[2].align}
                >
                  {`${item.user.valid_report} ticket${item.user.valid_report > 1 ? "s" : ""}`}
                </Typography>
              </TableData>
              <TableData
                className={cn(columns[3].width, `text-${columns[3].align}`)}
              >
                {item.user.asset_types.length > 0 ? (
                  <AssetTypeTooltip assetTypes={item.user.asset_types}>
                    <Typography
                      variant="p"
                      affects="normal"
                      align={columns[3].align}
                    >
                      {`${item.user.asset_types.length} asset type${item.user.asset_types.length > 1 ? "s" : ""}`}
                    </Typography>
                  </AssetTypeTooltip>
                ) : (
                  <Typography
                    variant="p"
                    affects="normal"
                    align={columns[3].align}
                  >
                    {`${item.user.asset_types.length} asset type${item.user.asset_types.length > 1 ? "s" : ""}`}
                  </Typography>
                )}
              </TableData>
              <TableData
                className={cn(columns[4].width, `text-${columns[4].align}`)}
              >
                <Typography
                  variant="p"
                  affects="normal"
                  align={columns[4].align}
                >
                  {item.user.last_active
                    ? formatDateToAgo(item.user.last_active)
                    : "-"}{" "}
                  {t("ago")}
                </Typography>
              </TableData>
              <TableData
                className={cn(columns[5].width, `text-${columns[5].align}`)}
              >
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  variant="tertirary-alert"
                  size="ghost"
                  onClick={() =>
                    item.id && onClickDeleteCollaborator([item.id])
                  }
                >
                  {t("button_delete")}
                </Button>
              </TableData>
            </TableRow>
          </TableBodyRow>
        ))}
      </TableBody>
    </BaseTable>
  );
}
