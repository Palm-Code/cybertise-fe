"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  Card,
  Input,
  SelectDropdown,
  SelectDropdown2,
  SelectGroupDropdown,
  Typography,
} from "@/core/ui/components";
import AssetType from "../../_dropdown/AssetType.component";
import CsvssCalculator from "./_card/bug-target/CsvssCalculator";
import ManualRiskLevel from "./_card/bug-target/ManualRiskLevel";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import {
  I_GetAssetTypeSuccessResponse,
  I_GetGroupVulnerabilityTypeSuccessResponse,
  I_GetVulnerabilityTypeSuccessResponse,
} from "@/core/models/common";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { CheckCircle2, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

interface I_BugTargetProps {
  defaultData?: {
    assetType?: I_GetAssetTypeSuccessResponse["data"];
    targetAssets?: I_GetProgramDetailsSuccessResponse["data"]["target_assets"];
    vulnerabilityType?: I_GetVulnerabilityTypeSuccessResponse["data"];
  };
}

const BugTarget = ({ defaultData }: I_BugTargetProps) => {
  const t = useTranslations("SendReportHacker.bug_target");
  const queryClient = useQueryClient();
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<SendReportRequestType>();
  const forms = getValues();
  const [manualRisk, setManualRisk] = useState<boolean>(false);
  const [other, setOther] = useState<boolean>(false);
  const [isOtherVulnerabilityType, setIsOtherVulnerabilityType] =
    useState<boolean>(false);

  return (
    <>
      <Card className="rounded-md bg-neutral-light-90 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-90">
        <div className="_flexbox__col__start__start w-full gap-4">
          <Typography variant="p" affects="normal">
            {t("target_assets")}
          </Typography>
          <div className="_flexbox__col__start__start max-h-80 w-full gap-4 overflow-y-auto">
            {defaultData &&
              defaultData.targetAssets?.map((item, idx) => (
                <Card
                  isButton
                  className={cn(
                    "_flexbox__col__start__start w-full cursor-pointer gap-2 rounded-md xl:px-6 xl:py-4",
                    "border border-transparent transition-colors duration-100",
                    "bg-neutral-light-100 hover:border-lime-normal-light dark:bg-neutral-dark-100 dark:hover:border-lime-normal-dark",
                    forms.target_asset_id === item.id &&
                      "border-lime-normal-light dark:border-lime-normal-dark"
                  )}
                  key={`target-assets-${idx}`}
                  onClick={() => {
                    setOther(false);
                    setValue("custom_ta_asset_type_id", undefined, {
                      shouldValidate: true,
                    });
                    setValue("custom_ta_value", undefined, {
                      shouldValidate: true,
                    });
                    setValue("target_asset_id", item.id, {
                      shouldValidate: true,
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["getTargetAssetDetails"],
                    });
                  }}
                >
                  <Typography variant="p" affects="normal">
                    {item.content}
                  </Typography>
                  <Badge variant={item.asset_type.label as any}>
                    {item.asset_type.value}
                  </Badge>
                </Card>
              ))}
          </div>
          <Card
            className={cn(
              "_flexbox__row__center__between w-full cursor-pointer gap-2 rounded-2xl xl:px-6 xl:py-0",
              "border border-transparent transition-colors duration-100",
              "bg-neutral-light-100 hover:border-lime-normal-light dark:bg-neutral-dark-100 dark:hover:border-lime-normal-dark",
              (forms.custom_ta_value || forms.custom_ta_asset_type_id) &&
                "border-lime-normal-light dark:border-lime-normal-dark"
            )}
            onClick={() => {
              setOther(true);
              setValue("target_asset_id", undefined, {
                shouldValidate: true,
              });
            }}
          >
            <Input
              label={t("other")}
              placeholderText={t("input_url")}
              className="w-full bg-transparent"
              transparentBg
              value={forms.custom_ta_value ?? ""}
              onChange={(e) => {
                setValue("target_asset_id", undefined, {
                  shouldValidate: true,
                });
                setValue("custom_ta_value", e.target.value, {
                  shouldValidate: true,
                });
              }}
            />
            <AssetType
              label={t("asset_type")}
              value={
                defaultData?.assetType && forms.custom_ta_asset_type_id
                  ? (defaultData.assetType.find(
                      (item) => item.id === forms.custom_ta_asset_type_id
                    )?.value as string)
                  : "default"
              }
              options={defaultData?.assetType?.slice(1) ?? []}
              onValueChange={(v) => {
                setOther(true);
                setValue("target_asset_id", undefined, {
                  shouldValidate: true,
                });
                setValue(
                  "custom_ta_asset_type_id",
                  defaultData?.assetType?.find((item) => item.value === v)?.id,
                  { shouldValidate: true }
                );
                queryClient.invalidateQueries({
                  queryKey: ["getAssetTypeDetails"],
                });
              }}
            />
          </Card>
          <AnimatePresence>
            {other && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "_flexbox__row__center__between w-full gap-2 rounded-md",
                  "bg-neutral-light-80 xl:px-5 xl:py-4.5 dark:bg-neutral-dark-80"
                )}
              >
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {forms.custom_ta_value ? (
                    <CheckCircle2 className="text-semantic-light-success dark:text-semantic-dark-success" />
                  ) : (
                    <XCircle className="text-semantic-light-critical dark:text-semantic-dark-critical" />
                  )}
                  <Typography variant="p" affects="small">
                    {t("hostname")}
                  </Typography>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {forms.custom_ta_asset_type_id ? (
                    <CheckCircle2 className="text-semantic-light-success dark:text-semantic-dark-success" />
                  ) : (
                    <XCircle className="text-semantic-light-critical dark:text-semantic-dark-critical" />
                  )}
                  <Typography variant="p" affects="small">
                    {t("select_asset_type")}
                  </Typography>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
      <Card
        className={cn(
          "rounded-md bg-neutral-light-90 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-90",
          "_flexbox__col__start__start gap-4"
        )}
      >
        <SelectGroupDropdown
          label={t("vulnerability_type")}
          withSearch
          value={
            isOtherVulnerabilityType
              ? "other"
              : (forms.vulnerabiity_type_id &&
                  (defaultData?.vulnerabilityType?.find(
                    (item) => item.id === forms.vulnerabiity_type_id
                  )?.value as string)) ||
                ""
          }
          options={defaultData?.vulnerabilityType ?? []}
          onValueChange={(v) => {
            if (v.toLowerCase() === "other") {
              setValue("vulnerabiity_type_id", null, {
                shouldValidate: true,
              });
              setIsOtherVulnerabilityType(true);
              return;
            }
            setIsOtherVulnerabilityType(false);
            const vulnerability_type_id = defaultData?.vulnerabilityType?.find(
              (item) => item.value === v
            )?.id;
            setValue("vulnerabiity_type_id", vulnerability_type_id as string, {
              shouldValidate: true,
            });
            setValue("custom_vulnerability", null, {
              shouldValidate: true,
            });
          }}
          wrapperClassName="rounded-md bg-neutral-light-100 dark:bg-neutral-dark-100"
          isError={!forms.vulnerabiity_type_id}
        />
        {isOtherVulnerabilityType && (
          <Input
            type="text"
            label={t("custom_type")}
            placeholderText={t("custom_type_description")}
            value={forms.custom_vulnerability || ""}
            onChange={(e) =>
              setValue("custom_vulnerability", e.target.value, {
                shouldValidate: true,
              })
            }
            maxLength={255}
            wrapperClassName="rounded-md bg-neutral-light-100 dark:bg-neutral-dark-100"
          />
        )}
      </Card>
      <CsvssCalculator
        isManualRisk={manualRisk}
        onChangeManualRisk={() => {
          setValue("cvss_string", undefined, { shouldValidate: true });
          setValue("risk_level", 0, { shouldValidate: true });
          setManualRisk(!manualRisk);
        }}
      />
      <ManualRiskLevel
        isManualRisk={manualRisk}
        onChangeManualRisk={() => {
          setValue("cvss_string", undefined, { shouldValidate: true });
          setValue("risk_level", 0, { shouldValidate: true });
          setManualRisk(!manualRisk);
        }}
      />
    </>
  );
};
export default BugTarget;
