import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { FileInput, Tiptap } from "@/core/ui/components";
import { useFormContext } from "react-hook-form";

const ProblemCauses = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SendReportRequestType>();

  return (
    <div className="_flexbox__col__start__start w-full gap-8">
      <Tiptap
        description={watch("impact")}
        label="Impact"
        onChangeValue={(v) => setValue("impact", v, { shouldValidate: true })}
        onClearInput={() => setValue("impact", "", { shouldValidate: true })}
        variant="hacker"
        withTooltip
      />
      <Tiptap
        description={watch("poc")}
        label="Proof of Concept"
        onChangeValue={(v) => setValue("poc", v, { shouldValidate: true })}
        onClearInput={() => setValue("poc", "", { shouldValidate: true })}
        variant="hacker"
        withTooltip
      />
      <FileInput
        fileValues={watch("files")}
        onFileRemoved={(v) => {
          const oldValue = watch("attachments");
          setValue(
            "attachments",
            oldValue?.filter((i) => i !== v),
            {
              shouldValidate: true,
            }
          );
          const oldInputValue = watch("files");
          setValue(
            "files",
            oldInputValue?.filter((i) => i.file_id !== v),
            {
              shouldValidate: true,
            }
          );
        }}
        onFileSelected={(v, files) => {
          const oldInputValue = watch("files");
          setValue(
            "files",
            [...(oldInputValue ? oldInputValue : []), ...files],
            {
              shouldValidate: true,
            }
          );
          const oldValue = watch("attachments");
          setValue("attachments", [...(oldValue ? oldValue : []), v], {
            shouldValidate: true,
          });
        }}
      />
    </div>
  );
};
export default ProblemCauses;
