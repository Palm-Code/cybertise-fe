"use client";
import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { Button, Card, Tiptap, Typography } from "@/core/ui/components";
import { Role } from "@/types/admin/sidebar";
import { sanitize } from "@/utils/sanitize-input";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

interface INotesProps {
  variant?: keyof typeof Role;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  currentSteps?: string;
}

const Notes = ({
  onClickNext,
  onClickPrev,
  variant = "mediator",
  currentSteps = "Phase1",
}: INotesProps) => {
  const t = useTranslations("VRPLaunchpad.phase.setup");
  const { watch, setValue } = useFormContext<CreateVrpType>();
  const forms = watch();

  if (currentSteps === "Phase3")
    return (
      <div className="_flexbox__col__start__start w-full gap-6">
        <Typography
          variant="h5"
          weight="bold"
        >
          {t("notes")}
        </Typography>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-6 rounded-[10px]",
            "bg-neutral-light-100 dark:bg-neutral-dark-100",
            "xl:p-7.5"
          )}
        >
          <article>
            <Tiptap
              showing
              description={sanitize(forms.notes ?? "")}
            />
          </article>
          {variant === "company" && (
            <Button
              variant="primary-company"
              onClick={onClickNext}
            >
              {t("button_next")}
            </Button>
          )}
        </Card>
      </div>
    );

  return (
    <Card className={cn("_flexbox__col__start__start w-full gap-6 xl:p-0")}>
      <Typography
        variant="h5"
        weight="bold"
      >
        {`${currentSteps === "Phase1" ? t("notes") : t("change_notes")}`}
      </Typography>
      <Typography
        variant="p"
        affects="small"
      >
        {t("notes_description")}
      </Typography>
      <Tiptap
        description={forms.notes}
        label={`${currentSteps === "Phase1" ? t("notes") : t("change_notes")}`}
        onChangeValue={(v) => setValue("notes", v)}
        onClearInput={() => setValue("notes", "")}
        variant={variant}
        withTooltip
      />
      <div className="_flexbox__row__center gap-8">
        <Button
          variant={`secondary-${variant}`}
          onClick={onClickPrev}
        >
          {t("button_previous")}
        </Button>
        <Button
          variant={`primary-${variant}`}
          disabled={!forms.notes}
          onClick={onClickNext}
        >
          {t("button_next")}
        </Button>
      </div>
    </Card>
  );
};
export default Notes;
