import { cn } from "@/core/lib/utils";
import { Button, Card, Typography } from "@/core/ui/components";
import { X } from "lucide-react";

interface I_EditNavBarProps {
  title: string;
  onClickSave: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const EditNavBar = ({
  title,
  onClickSave,
  isLoading,
  disabled,
}: I_EditNavBarProps) => {
  return (
    <Card
      className={cn(
        "rounded-2xl rounded-b-none xl:px-8 xl:py-6",
        "_flexbox__row__center__between"
      )}
    >
      <div className="_flexbox__row__center gap-5">
        <Button
          asLink
          href="/manage-company"
          variant="tertiary-company"
          prefixIcon={<X />}
          className="p-0"
        />
        <Typography variant="h5" weight="bold">
          {title}
        </Typography>
      </div>
      <div className="_flexbox__row__center gap-6">
        <Button asLink href="/manage-company" variant="tertiary-company">
          Discard
        </Button>
        <Button
          variant="primary-company"
          disabled={isLoading || disabled}
          isLoading={isLoading}
          onClick={onClickSave}
        >
          Save Changes
        </Button>
      </div>
    </Card>
  );
};
export default EditNavBar;
