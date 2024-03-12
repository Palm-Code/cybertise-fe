import { Button, Card, Typography } from "@/core/ui/components";
import { FilePenLine } from "lucide-react";
import CardAbout from "../component/_tabs/_contents/account-details/CardAbout";
import CardAccountDetails from "../component/_tabs/_contents/account-details/CardAccountDetails";

const Details = () => {
  return (
    <>
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          Account Details
        </Typography>
        <Button
          variant="tertiary-hacker"
          prefixIcon={<FilePenLine />}
          onClick={() => {}}
        >
          Edit Account Details
        </Button>
      </div>
      <CardAbout />
      <CardAccountDetails />
    </>
  );
};
export default Details;
