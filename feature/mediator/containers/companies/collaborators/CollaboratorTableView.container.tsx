"use client";
import { cn } from "@/core/lib/utils";
import { I_GetCollaboratorSuccessResponse } from "@/core/models/mediator/collaborators";
import {
  AssetTypeTooltip,
  Avatar,
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
import ActionDropDown from "@/feature/mediator/components/companies/details/_dropdown/ActionDropdown.component";
import { I_TableColumns } from "@/interfaces";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface I_TableProps {
  columns: I_TableColumns[];
  data: I_GetCollaboratorSuccessResponse["data"];
  isLoading: boolean;
  onClickDeleteCollaborator: (ids: string[]) => void;
  onChangeCheckbox: (id: string, checked: boolean) => void;
  selectedIds: string[];
}

export default function Table({
  data,
  columns,
  isLoading,
  onChangeCheckbox,
  selectedIds,
}: I_TableProps) {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  const [boolArray, setBoolArray] = useState<boolean[]>([false]);
  const [boolSuccessArray, setBoolSuccessArray] = useState<boolean[]>([false]);

  const toggleBoolean = (index: number): void => {
    setBoolArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

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
                <Checkbox
                  disabled={boolSuccessArray[index]}
                  checked={selectedIds.includes(item.id as string)}
                  variant="mediator"
                  onCheckedChange={(checked: boolean) => {
                    item.id && onChangeCheckbox(item.id, checked);
                  }}
                />
              </TableData>
              <TableData
                className={cn(columns[1].width, `text-${columns[1].align}`)}
              >
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <Avatar
                    className={cn("size-6")}
                    image={item.user.avatar || ""}
                  />
                  <Typography
                    variant="p"
                    affects="small"
                    weight="semibold"
                    align={columns[1].align}
                  >
                    {item.user.name}
                  </Typography>
                </div>
              </TableData>
              <TableData
                className={cn(columns[2].width, `text-${columns[2].align}`)}
              >
                <Typography
                  variant="p"
                  affects="normal"
                  align={columns[2].align}
                >
                  {`${item.user.valid_report} ${t("ticket")}${item.user.valid_report > 1 ? "s" : ""}`}
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
                      {`${item.user.asset_types.length} ${t("asset_type")}${item.user.asset_types.length > 1 ? "s" : ""}`}
                    </Typography>
                  </AssetTypeTooltip>
                ) : (
                  <Typography
                    variant="p"
                    affects="normal"
                    align={columns[3].align}
                  >
                    {`${item.user.asset_types.length} ${t("asset_type")}${item.user.asset_types.length > 1 ? "s" : ""}`}
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
                <ActionDropDown
                  open={boolArray[index]}
                  onOpenChange={() => toggleBoolean(index)}
                  companyTicketId={item.id as string}
                  onSuccess={(id) => {
                    setBoolSuccessArray((prevArray) => {
                      const newArray = [...prevArray];
                      newArray[index] = !newArray[index];
                      return newArray;
                    });
                    toggleBoolean(index);
                    onChangeCheckbox(id, false);
                  }}
                />
              </TableData>
            </TableRow>
          </TableBodyRow>
        ))}
      </TableBody>
    </BaseTable>
  );
}
