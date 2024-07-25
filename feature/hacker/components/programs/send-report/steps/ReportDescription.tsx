import { Input, TextArea, Typography } from "@/core/ui/components";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const ReportDescription = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [characterCount, setCharacterCount] = useState(0);
  return (
    <div className="_flexbox__col__start__start w-full gap-4">
      <Input
        type="text"
        label="Title"
        value={getValues("title")}
        onChange={(e) =>
          setValue("title", e.target.value, { shouldValidate: true })
        }
        isError={!!errors.title}
      />
      <TextArea
        label="Short Description"
        value={getValues("description")}
        onChange={(e) => {
          setValue("description", e.target.value, { shouldValidate: true });
          setCharacterCount(e.target.value.length);
        }}
        isError={!!errors.description}
      />
      <Typography
        variant="p"
        affects="tiny"
        className="-mt-3 text-neutral-light-50 dark:text-neutral-dark-50"
      >
        Remaining Characters: {5000 - characterCount} / 5000
      </Typography>
    </div>
  );
};
export default ReportDescription;
