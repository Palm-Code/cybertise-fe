import { cn } from "@/core/lib/utils";
import {
  Card,
  Input,
  SelectDropdown,
  TextArea,
  Typography,
} from "@/core/ui/components";

const VrpDescriptionCard = () => {
  return (
    <>
      <Typography variant="h5" weight="bold">
        Review VRP {"Title 1"}
      </Typography>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-background-page-light dark:bg-background-page-dark",
          "p-7.5"
        )}
      >
        <Typography variant="h6" weight="bold">
          VRP Description
        </Typography>
        <SelectDropdown
          label="VRP Type"
          value="VRP Type 1"
          options={[
            {
              label: "VRP Type 1",
              value: "VRP Type 1",
            },
          ]}
          defaultValue={"VRP Type 1"}
          onValueChange={(value) => console.log(value)}
        />
        <Input type="text" label="VRP Title" value="VRP Title 1" />
        <div className="w-full">
          <TextArea
            label="VRP Description"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper eget. Pellentesque habitant morbi tristique senectus et. Neque convallis a cras semper."
            maxLength={150}
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
    </>
  );
};
export default VrpDescriptionCard;
