"use client";
import { cn } from "@/core/lib/utils";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { Badge, Button, Card, Input, Typography } from "@/core/ui/components";
import AssetType from "@/feature/mediator/components/vrp-launcpad/_dropdown/AssetType.component";
import { SortFilterType } from "@/types/admin/dashboard";
import { Check, FilePenLine, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

interface I_TargetAssetListCard<T extends boolean> {
  isCompany?: T;
  onClickNext?: T extends true ? () => void : undefined;
  onClickPrev?: T extends true ? () => void : undefined;
  options: SortFilterType[];
}

const initialValues: CreateVrpType["target_assets"][0] = {
  content: "",
  asset_type_id: "",
};

const TargetAssetListCard = ({
  isCompany = false,
  onClickNext,
  onClickPrev,
  options,
}: I_TargetAssetListCard<boolean>) => {
  const t = useTranslations("VRPLaunchpad.phase.vrp_details.target_assets");
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateVrpType>();
  const forms = watch();
  const [isEditingList, setIsEditingList] = useState<boolean[]>(
    Array(forms.target_assets.length).fill(false)
  );

  const handleEditClick = (index: number) => {
    setIsEditingList((prevEditingList) => {
      const newList = [...prevEditingList];
      newList[index] = !newList[index];
      return newList;
    });
  };

  const handleAddAsset = () => {
    const oldTeargetAssets = forms.target_assets;
    setValue("target_assets", [...oldTeargetAssets, { ...initialValues }]);
    handleEditClick(oldTeargetAssets.length);
  };

  const disabledButton =
    forms.target_assets.length < 1 ||
    forms.target_assets.some(
      (v) => v.asset_type_id === "" || v.content === ""
    ) ||
    isEditingList.some((v) => v);

  const disabledSave = useMemo(() => {
    if (forms.target_assets.length < 1) return true;
    return forms.target_assets.some(
      (v) => v.asset_type_id === "" || v.content === ""
    );
  }, [forms]);

  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <Typography
        variant="h5"
        weight="bold"
      >
        {t("header_title")}
      </Typography>
      <Typography
        variant="p"
        affects="small"
      >
        {t("description")}
      </Typography>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-background-page-light dark:bg-background-page-dark",
          "xl:p-7.5"
        )}
      >
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("header_title")}
        </Typography>
        {forms.target_assets.map((v, index) =>
          isEditingList[index] ? (
            <Card
              className={cn(
                "grid w-full grid-cols-3 gap-2 rounded-md xl:px-4 xl:py-3.5",
                "border border-transparent transition-colors duration-100",
                "bg-neutral-light-100 dark:bg-neutral-dark-100",
                !!errors?.target_assets?.[index]?.content ||
                  !!errors?.target_assets?.[index]?.asset_type_id
                  ? "border border-red-normal"
                  : ""
              )}
              key={`list-make-changes-target-assets-${index}`}
            >
              <Input
                label={`${t("asset")} ${index + 1}`}
                disabled={!isEditingList[index]}
                autoFocus
                placeholderText={t("hostname")}
                value={v.content ?? t("hostname")}
                className="w-full bg-transparent"
                onChange={(e) =>
                  setValue(
                    "target_assets",
                    forms.target_assets.map((v, i) =>
                      i === index ? { ...v, content: e.target.value } : v
                    ),
                    { shouldValidate: true }
                  )
                }
                transparentBg
              />
              <AssetType
                label={t("asset_type")}
                value={forms.target_assets[index].asset_type_id}
                onValueChange={(e) => {
                  const newAssetTypeValue = options.find(
                    (v) => v.id === e
                  ) as I_GetAssetTypeSuccessResponse["data"][0];
                  setValue(
                    "target_assets",
                    forms.target_assets.map((v, i) =>
                      i === index
                        ? {
                            ...v,
                            asset_type_id: e,
                            asset_type: {
                              ...v.asset_type,
                              label: newAssetTypeValue.value,
                              value: newAssetTypeValue.label,
                            },
                          }
                        : v
                    ),
                    { shouldValidate: true }
                  );
                }}
                options={options}
              />
              <div className="_flexbox__row__center ml-auto gap-4">
                <Button
                  variant={`tertiary-${isCompany ? "company" : "mediator"}`}
                  prefixIcon={<X />}
                  className="p-0"
                  onClick={() => {
                    setValue(
                      "asset_types_values",
                      forms.asset_types_values
                        .slice(0, index)
                        .concat(forms.asset_types_values.slice(index + 1)),
                      { shouldValidate: true }
                    );
                    setValue(
                      "target_assets",
                      forms.target_assets
                        .slice(0, index)
                        .concat(forms.target_assets.slice(index + 1)),
                      { shouldValidate: true }
                    );
                    handleEditClick(index);
                  }}
                >
                  {t("delete_button")}
                </Button>
                <Button
                  variant={`tertiary-${isCompany ? "company" : "mediator"}`}
                  prefixIcon={<Check />}
                  className="p-0"
                  onClick={() => handleEditClick(index)}
                  disabled={disabledSave}
                >
                  {t("save_button")}
                </Button>
              </div>
            </Card>
          ) : (
            <Card
              className={cn(
                "grid w-full grid-cols-3 gap-2 rounded-md xl:px-4 xl:py-3.5",
                "border border-transparent transition-colors duration-100",
                "bg-neutral-light-80 dark:bg-neutral-dark-80"
              )}
              key={`target-assets-${index}`}
            >
              <Input
                label={`${t("asset")} ${index + 1}`}
                disabled
                autoFocus
                placeholderText={t("hostname")}
                value={v.content ?? t("hostname")}
                className="w-full bg-transparent"
                transparentBg
              />
              <Badge
                variant={v.asset_type?.label as any}
                className="m-auto h-fit w-fit"
              >
                {v.asset_type?.value}
              </Badge>
              <Button
                type="button"
                variant={`tertiary-${isCompany ? "company" : "mediator"}`}
                onClick={() => handleEditClick(index)}
                className="ml-auto p-0"
                prefixIcon={<FilePenLine />}
              />
            </Card>
          )
        )}
        <button
          title="Add"
          type="button"
          className={cn(
            "w-full rounded-md border",
            "border-neutral-light-0 px-4 py-4.5 dark:border-neutral-dark-0"
          )}
          onClick={() => handleAddAsset()}
        >
          {t("button_add_new")}
        </button>
        {isEditingList.some((v) => v) && (
          <Typography
            variant="p"
            affects="tiny"
            className="text-semantic-light-critical dark:text-semantic-dark-critical"
          >
            {t("alert")}
          </Typography>
        )}
      </Card>
      <div className="_flexbox__row__center gap-8">
        <Button
          variant={`secondary-${isCompany ? "company" : "mediator"}`}
          onClick={onClickPrev}
        >
          {t("button_previous")}
        </Button>
        <Button
          variant={`primary-${isCompany ? "company" : "mediator"}`}
          disabled={disabledButton}
          onClick={onClickNext}
        >
          {t("button_next")}
        </Button>
      </div>
    </div>
  );
};
export default TargetAssetListCard;
