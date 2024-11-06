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
import { usePostAddCollaborators } from "@/feature/mediator/query/client/usePostAddCollaborators";
import { I_TableColumns } from "@/interfaces";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface I_TableProps {
  columns: I_TableColumns[];
  data: I_GetCollaboratorSuccessResponse["data"];
  isLoading: boolean;
  onChangeCheckbox: (id: string, checked: boolean) => void;
  id: string;
  selectedIds: string[];
}

export default function Table({
  id,
  data,
  columns,
  isLoading,
  selectedIds,
  onChangeCheckbox,
}: I_TableProps) {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  const [boolArray, setBoolArray] = useState<boolean[]>([false]);
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
                className={cn(
                  columns[0].width,
                  `text-${columns[0].align}`,
                  "mt-auto"
                )}
              >
                <Checkbox
                  checked={selectedIds.includes(item.user.id as string)}
                  disabled={boolArray[index]}
                  variant="mediator"
                  onCheckedChange={(checked: boolean) => {
                    onChangeCheckbox(item.user.id, checked);
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
                className={cn(
                  columns[5].width,
                  `text-${columns[5].align}`,
                  "leading-[0px]"
                )}
              >
                <AddCollaboratorButton
                  program_id={id}
                  user_id={item.user.id as string}
                  onSuccess={(id) => {
                    setBoolArray((prevArray) => {
                      const newArray = [...prevArray];
                      newArray[index] = !newArray[index];
                      return newArray;
                    });
                    onChangeCheckbox(item.user.id, false);
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

const AddCollaboratorButton = ({
  program_id,
  user_id,
  onSuccess = () => {},
}: {
  program_id: string;
  user_id: string;
  onSuccess?: (id: string) => void;
}) => {
  const {
    mutateAsync: postAddCollaborators,
    isPending: isPendingPostAddCollaborators,
    isSuccess: isSuccessPostAddCollaborators,
  } = usePostAddCollaborators();

  const onClickInviteCollaborators = (ids: string[]) => {
    postAddCollaborators({
      user_ids: ids,
      program_id: program_id,
    }).then((res) => {
      if (res) {
        onSuccess(user_id);
      }
    });
  };
  return (
    <Button
      disabled={isPendingPostAddCollaborators || isSuccessPostAddCollaborators}
      isLoading={isPendingPostAddCollaborators}
      variant="tertiary-mediator"
      size="ghost"
      onClick={() => onClickInviteCollaborators([user_id])}
    >
      <UserPlus />
    </Button>
  );
};
