"use client";
import { cn } from "@/core/lib/utils";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { useGetAssetType } from "@/core/react-query/client";
import { Badge, Button, Card, Input, Typography } from "@/core/ui/components";
import AssetType from "@/feature/mediator/components/vrp-launcpad/_dropdown/AssetType.component";
import { SortFilterType } from "@/types/admin/dashboard";
import { Check, FilePenLine, X } from "lucide-react";
import { useState } from "react";
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
  };

  const disabledButton =
    forms.target_assets.length < 1 ||
    forms.target_assets.some((v) => v.asset_type_id === "" || v.content === "");

  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <Typography variant="h5" weight="bold">
        Scope
      </Typography>
      <Typography variant="p" affects="small">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi
        tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi
        tristique senectus et netus et malesuada fames ac turpis.
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
          List of Target Assets
        </Typography>
        {forms.target_assets.map((v, index) =>
          isEditingList[index] ? (
            <Card
              className={cn(
                "grid w-full grid-cols-3 gap-2 rounded-md xl:p-0 xl:px-4",
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
                label={"Asset type " + (index + 1)}
                disabled={!isEditingList[index]}
                placeholderText="Hostname or IP Address"
                value={v.content ?? "Hostname or IP Address"}
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
                  onClick={() => handleEditClick(index)}
                >
                  Cancel
                </Button>
                <Button
                  variant={`tertiary-${isCompany ? "company" : "mediator"}`}
                  prefixIcon={<Check />}
                  className="p-0"
                  onClick={() => handleEditClick(index)}
                >
                  Save
                </Button>
              </div>
            </Card>
          ) : (
            <Card
              className={cn(
                "_flexbox__row__center__between w-full cursor-pointer gap-2 rounded-md xl:px-4 xl:py-4",
                "border border-transparent transition-colors duration-100",
                "bg-neutral-light-80 dark:bg-neutral-dark-80"
              )}
              key={`target-assets-${index}`}
            >
              <div className="_flexbox__col__start__start w-full gap-2">
                <Typography variant="p" affects="normal">
                  {v.content}
                </Typography>
                <Badge variant={v.asset_type?.label as any}>
                  {v.asset_type?.value}
                </Badge>
              </div>
              <div className="_flexbox__row__center gap-4">
                <Button
                  type="button"
                  variant={`tertiary-${isCompany ? "company" : "mediator"}`}
                  onClick={() => handleEditClick(index)}
                  className="p-0"
                  prefixIcon={<FilePenLine />}
                />
                <Button
                  type="button"
                  variant={`tertiary-${isCompany ? "company" : "mediator"}`}
                  onClick={() => {
                    setValue(
                      "asset_types_values",
                      forms.asset_types_values.filter((v, i) => i !== index),
                      { shouldValidate: true }
                    );
                    setValue(
                      "target_assets",
                      forms.target_assets.filter((v, i) => i !== index),
                      { shouldValidate: true }
                    );
                  }}
                  className="p-0"
                  prefixIcon={<X />}
                />
              </div>
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
          + Add New Assets
        </button>
      </Card>
      {isCompany && (
        <div className="_flexbox__row__center gap-8">
          <Button variant="secondary-company" onClick={onClickPrev}>
            Previous
          </Button>
          <Button
            variant="primary-company"
            disabled={disabledButton}
            onClick={onClickNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
export default TargetAssetListCard;
