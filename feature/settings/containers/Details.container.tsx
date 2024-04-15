import { Button, Typography } from "@/core/ui/components";
import { FilePenLine } from "lucide-react";
import CardAbout from "../component/_tabs/_contents/account-details/CardAbout";
import CardAccountDetails from "../component/_tabs/_contents/account-details/CardAccountDetails";
import { Desktop, Mobile } from "@/core/ui/layout";

interface I_DetailsProps {
  variant: "hacker" | "mediator" | "company";
}

const Details = ({ variant }: I_DetailsProps) => {
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
      <Desktop className="space-y-6">
        <div className="_flexbox__row__center__between w-full">
          <Typography variant="h5" weight="bold">
            Account Details
          </Typography>
          <Button
            variant={`tertiary-${variant}`}
            prefixIcon={<FilePenLine />}
            onClick={() => {}}
          >
            Edit Account Details
          </Button>
        </div>
        <CardAbout />
        <CardAccountDetails />
      </Desktop>
    </>
  );
};
export default Details;
