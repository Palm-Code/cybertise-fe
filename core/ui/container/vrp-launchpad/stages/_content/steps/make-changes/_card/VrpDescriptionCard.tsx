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
  const { watch, setValue } = useFormContext<CreateVrpType>();
  const forms = watch();

  return (
    <>
      <Typography variant="h5" weight="bold">
        VRP Details
      </Typography>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-neutral-light-100 dark:bg-neutral-dark-100",
          "p-7.5"
        )}
      >
        <Typography variant="h6" weight="bold">
          VRP Description
        </Typography>
        <SelectDropdown
          label="VRP Type"
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
          label="VRP Title"
          value={forms.title}
          onChange={(e) =>
            setValue("title", e.target.value, { shouldValidate: true })
          }
        />
        <div className="w-full">
          <TextArea
            label="VRP Description"
            value={forms.description}
            maxLength={150}
            onChange={(e) =>
              setValue("description", e.target.value, { shouldValidate: true })
            }
          />
          <Typography
            variant="p"
            affects="tiny"
            className="text-neutral-light-50 dark:text-neutral-dark-50"
          >
            Maximum 150 words
          </Typography>
        </div>
      </Card>
      {isCompany && (
        <div className="_flexbox__row__center gap-8">
          <Button variant="secondary-company" onClick={onClickPrev}>
            Previous
          </Button>
          <Button
            variant="primary-company"
            disabled={!forms.type || !forms.title || !forms.description}
            onClick={onClickNext}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};
export default VrpDescriptionCard;
