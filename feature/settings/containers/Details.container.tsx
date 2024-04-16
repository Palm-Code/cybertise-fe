import { Button, Card, Typography } from "@/core/ui/components";
import { FilePenLine, X } from "lucide-react";
import CardAbout from "../component/_tabs/_contents/account-details/CardAbout";
import CardAccountDetails from "../component/_tabs/_contents/account-details/CardAccountDetails";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { cn } from "@/core/lib/utils";
import { Role } from "@/types/admin/sidebar";

interface I_DetailsProps {
  variant: Role;
  isEditing: boolean;
  handleClickEdit: (v: boolean) => void;
}

const Details = ({ variant, isEditing, handleClickEdit }: I_DetailsProps) => {
  if (isEditing)
    return (
      <>
        <Desktop>
          <div className="_flexbox__col__start__start w-full gap-6">
            <Card
              className={cn(
                "rounded-2xl rounded-b-none xl:px-8 xl:py-6",
                "_flexbox__row__center__between w-full"
              )}
            >
              <div className="_flexbox__row__center__start gap-5">
                <Button
                  variant={`tertiary-${variant}`}
                  prefixIcon={<X />}
                  className="p-0"
                  onClick={() => handleClickEdit(false)}
                />
                <Typography variant="h5" weight="bold" className="capitalize">
                  Edit {variant} Details
                </Typography>
              </div>
              <div className="_flexbox__row__center__start gap-6">
                <Button
                  variant={`tertiary-${variant}`}
                  onClick={() => handleClickEdit(false)}
                >
                  Discard
                </Button>
                <Button variant={`primary-${variant}`} onClick={() => {}}>
                  Save Changes
                </Button>
              </div>
            </Card>
            <AnimationWrapper>
              <CardAbout isEditing variant={variant as Role} />
              <CardAccountDetails isEditing />
            </AnimationWrapper>
          </div>
        </Desktop>
      </>
    );
  return (
    <>
      <Mobile className="space-y-6">
        <div className="_flexbox__row__center__between mb-6 w-full">
          <Typography variant="h5" weight="bold">
            Account Details
          </Typography>
          <Button
            variant={`tertiary-${variant}`}
            className="p-0"
            prefixIcon={<FilePenLine />}
            onClick={() => {}}
          ></Button>
        </div>
        <CardAbout />
        <CardAccountDetails />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-6">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h5" weight="bold">
              Account Details
            </Typography>
            <Button
              variant={`tertiary-${variant}`}
              prefixIcon={<FilePenLine />}
              onClick={() => handleClickEdit(true)}
            >
              Edit Account Details
            </Button>
          </div>
          <CardAbout />
          <CardAccountDetails />
        </div>
      </Desktop>
    </>
  );
};
export default Details;
