import { cn } from "@/core/lib/utils";
import { Button, Card, Typography } from "@/core/ui/components";
import { X } from "lucide-react";

interface I_EditNavBarProps {
  title: string;
}

const EditNavBar = ({ title }: I_EditNavBarProps) => {
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
    </Card>
  );
};
export default EditNavBar;
