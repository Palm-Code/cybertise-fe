import { Input, TextArea, Typography } from "@/core/ui/components";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const ReportDescription = () => {
  const t = useTranslations("SendReportHacker.report_description");
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [characterCount, setCharacterCount] = useState(
    watch("description").length || 0
  );
  return (
    <div className="_flexbox__col__start__start w-full gap-4">
      <Input
        type="text"
        label={t("title")}
        value={watch("title")}
        onChange={(e) =>
          setValue("title", e.target.value, { shouldValidate: true })
        }
        isError={!!errors.title}
        maxLength={255}
      />
      <TextArea
        label={t("description")}
        value={watch("description")}
        onChange={(e) => {
          setValue("description", e.target.value, { shouldValidate: true });
          setCharacterCount(e.target.value.length);
        }}
        isError={!!errors.description}
        maxLength={5000}
      />
      <Typography
        variant="p"
        affects="tiny"
        className="-mt-3 text-neutral-light-50 dark:text-neutral-dark-50"
      >
        {t("remaining_characters")}: {5000 - characterCount} / 5000
      </Typography>
    </div>
  );
};
export default ReportDescription;
