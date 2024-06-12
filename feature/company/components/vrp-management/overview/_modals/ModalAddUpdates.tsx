import { cn } from "@/core/lib/utils";
import {
  UpdateFormRequestType,
  updateFormSchema,
} from "@/core/models/company/vrp-management/publish_update";
import {
  BaseModal,
  Button,
  Card,
  Input,
  Tiptap,
  Typography,
} from "@/core/ui/components";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { usePostUpdates } from "@/feature/company/query/client/usePostUpdates";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface I_ModalAddUpdatesProps extends I_ModalProps {
  id: string;
}

const ModalAddUpdates = ({ id, ...props }: I_ModalAddUpdatesProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateFormRequestType>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      program_id: id,
      title: "",
      content: "",
    },
  });
  const { mutate, isPending, isSuccess } = usePostUpdates();

  const forms = watch();

  const handleSubmitUpdate = () => {
    if (Object.values(errors).length > 0)
      return toast.error("Please fill in all required fields");
    mutate(forms);
  };

  return (
    <BaseModal
      {...props}
      className="bg-background-page-light/90 backdrop-blur-sm dark:bg-background-page-dark/90"
    >
      <div
        className={cn(
          "_flexbox__col__start__start h-full w-full gap-6",
          "mx-auto max-w-3xl rounded-xl xl:px-8 xl:py-8",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__row__center__start gap-5">
          <Button
            variant="tertiary-company"
            prefixIcon={<X />}
            className="p-0"
            onClick={props.onClose}
          />
          <Typography variant="h5" weight="bold">
            Add Updates
          </Typography>
        </div>
        <Card
          className={cn(
            "bg-neutral-light-100 xl:p-7.5 dark:bg-neutral-dark-100",
            "rounded-[10px]",
            "_flexbox__col__start__start gap-8"
          )}
        >
          <Typography variant="h5" weight="bold">
            Add Updates
          </Typography>
          <Typography variant="p" affects="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit
            amet tellus. Morbi tristique senectus et netus et malesuada fames ac
            turpis.
          </Typography>
          <Input
            type="text"
            label="Title"
            value={forms.title}
            onChange={(e) => {
              setValue("title", e.target.value, { shouldValidate: true });
            }}
            isError={!!errors.title}
          />
          <div className="w-full">
            <Tiptap
              description={forms.content}
              label="Updates"
              onChangeValue={(e) => {
                setValue("content", e, { shouldValidate: true });
              }}
              onClearInput={() => {
                setValue("content", "", { shouldValidate: true });
              }}
              variant="company"
              withTooltip
            />
          </div>
          <Button
            variant="primary-company"
            disabled={!forms.title || !forms.content || isPending || isSuccess}
            isLoading={isPending}
            onClick={handleSubmitUpdate}
          >
            Publish Update
          </Button>
        </Card>
      </div>
    </BaseModal>
  );
};
export default ModalAddUpdates;
