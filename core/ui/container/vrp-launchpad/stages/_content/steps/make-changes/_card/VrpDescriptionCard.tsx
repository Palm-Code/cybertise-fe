import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import {
  Button,
  Card,
  Input,
  SelectDropdown,
  TextArea,
  Typography,
} from "@/core/ui/components";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface I_VrpDescriptionCard<T extends boolean> {
  isCompany?: T;
  onClickNext?: T extends true ? () => void : undefined;
  onClickPrev?: T extends true ? () => void : undefined;
}

const VrpDescriptionCard = ({
  isCompany = false,
  onClickNext,
  onClickPrev,
}: I_VrpDescriptionCard<boolean>) => {
  const t = useTranslations("VRPLaunchpad.phase.vrp_details");
  const { watch, setValue } = useFormContext<CreateVrpType>();
  const forms = watch();
  const [characterCount, setCharacterCount] = useState(
    forms.description?.length || 0
  );

  return (
    <>
      <Typography
        variant="h5"
        weight="bold"
      >
        {t("details")}
      </Typography>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-neutral-light-100 dark:bg-neutral-dark-100",
          "xl:p-7.5"
        )}
      >
        <Typography
          variant="h6"
          weight="bold"
        >
          {t("vrp_description.header_title")}
        </Typography>
        <SelectDropdown
          label={t("vrp_description.type")}
          value={forms.type}
          options={[
            { label: "Public", value: "Public" },
            { label: "Private", value: "Private" },
          ]}
          onValueChange={(value) => {
            setValue("type", value, { shouldValidate: true });
          }}
        />
        <Input
          type="text"
          label={t("vrp_description.title")}
          value={forms.title}
          onChange={(e) =>
            setValue("title", e.target.value, { shouldValidate: true })
          }
          maxLength={255}
        />
        <div className="w-full">
          <TextArea
            label={t("vrp_description.description")}
            max={5000}
            value={forms.description}
            defaultValue={forms.description}
            maxLength={5000}
            onChange={(e) => {
              setValue("description", e.target.value, { shouldValidate: true });
              setCharacterCount(e.target.value.length);
            }}
          />
          <Typography
            variant="p"
            affects="tiny"
            className="text-neutral-light-50 dark:text-neutral-dark-50"
          >
            {t("vrp_description.remaining_characters")}: {5000 - characterCount}{" "}
            / 5000
          </Typography>
        </div>
      </Card>
      {isCompany && (
        <div className="_flexbox__row__center gap-8">
          <Button
            variant="secondary-company"
            onClick={onClickPrev}
          >
            {t("button_previous")}
          </Button>
          <Button
            variant="primary-company"
            disabled={!forms.type || !forms.title || !forms.description}
            onClick={onClickNext}
          >
            {t("button_next")}
          </Button>
        </div>
      )}
    </>
  );
};
export default VrpDescriptionCard;
