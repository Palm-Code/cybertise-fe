import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { FileInput, Tiptap } from "@/core/ui/components";
import { useFormContext } from "react-hook-form";

const ProblemCauses = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<SendReportRequestType>();

  return (
    <div className="_flexbox__col__start__start w-full gap-8">
      <Tiptap
        description={getValues("impact")}
        label="Impact"
        onChangeValue={(v) => setValue("impact", v, { shouldValidate: true })}
        onClearInput={() => setValue("impact", "", { shouldValidate: true })}
        variant="hacker"
        withTooltip
      />
      <Tiptap
        description={getValues("poc")}
        label="Proof of Concept"
        onChangeValue={(v) => setValue("poc", v, { shouldValidate: true })}
        onClearInput={() => setValue("poc", "", { shouldValidate: true })}
        variant="hacker"
        withTooltip
      />
      <FileInput
        fileValues={getValues("files")}
        onFileRemoved={(v) => {
          const oldValue = getValues("attachments");
          setValue(
            "attachments",
            oldValue?.filter((i) => i !== v),
            {
              shouldValidate: true,
            }
          );
          const oldInputValue = getValues("files");
          setValue(
            "files",
            oldInputValue?.filter((i) => i.file_id !== v),
            {
              shouldValidate: true,
            }
          );
        }}
        onFileSelected={(v, files) => {
          const oldInputValue = getValues("files");
          setValue(
            "files",
            [...(oldInputValue ? oldInputValue : []), ...files],
            {
              shouldValidate: true,
            }
          );
          const oldValue = getValues("attachments");
          setValue("attachments", [...(oldValue ? oldValue : []), v], {
            shouldValidate: true,
          });
        }}
      />
    </div>
  );
};
export default ProblemCauses;
