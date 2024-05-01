import { Role } from "@/types/admin/sidebar";
import { EmptyFolder, HackerLeaf, Leaf } from "../../icons";
import { Button, Typography } from "../../components";
import Link from "next/link";
import { buttonVariants } from "../../components/button/base-button";

interface I_EmptyStateProps {
  variant: "company" | "hacker" | "mediator";
  type?:
    | "default"
    | "program"
    | "ticket"
    | "under-construction"
    | "update"
    | "target-assets";
  buttonText?: string;
  titleText?: string;
  href?: string;
}

const iconColors: { [key in Role]: string } = {
  hacker: "text-emerald-normal",
  company: "text-sky-light",
  mediator: "text-violet-light",
};

const EmptyState = ({
  variant,
  type = "default",
  buttonText = "See VRP Launchpad",
  href = "/",
  titleText = "You're not Allowed Here",
}: I_EmptyStateProps) => {
  const iconsType = () => {
    switch (type) {
      case "ticket":
        return (
          <>
            <EmptyFolder className={iconColors[variant]} />
            <Typography
              variant="p"
              affects="extralarge"
              weight="bold"
              align={"center"}
            >
              You Have No Ticket Here
            </Typography>
            <Link
              className={buttonVariants({ variant: `primary-${variant}` })}
              href={href}
            >
              {buttonText}
            </Link>
          </>
        );
      case "program":
        return (
          <>
            <>
              <Leaf />
              <Typography
                variant="p"
                affects="extralarge"
                weight="bold"
                align={"center"}
              >
                You have no any program yet
              </Typography>
              <Link
                className={buttonVariants({ variant: `primary-${variant}` })}
                href={href}
              >
                {buttonText ?? "Add new program"}
              </Link>
            </>
          </>
        );
      case "target-assets":
        return (
          <>
            <>
              <EmptyFolder className={iconColors[variant]} />
              <Typography
                variant="p"
                affects="extralarge"
                weight="bold"
                align={"center"}
              >
                Target assets not Found
              </Typography>
            </>
          </>
        );
      case "update":
        return (
          <>
            <>
              <HackerLeaf />
              <Typography variant="p" affects="extralarge" weight="bold">
                You have no update yet
              </Typography>
            </>
          </>
        );
      case "under-construction":
        return (
          <>
            <EmptyFolder className={iconColors[variant]} />
            <Typography
              variant="p"
              affects="extralarge"
              weight="bold"
              align={"center"}
            >
              Under Construction
            </Typography>
            <Link
              className={buttonVariants({ variant: `primary-${variant}` })}
              href={href}
            >
              Back
            </Link>
          </>
        );
      default:
        return (
          <>
            <EmptyFolder className={iconColors[variant]} />
            <Typography
              variant="p"
              affects="extralarge"
              weight="bold"
              align={"center"}
            >
              {titleText}
            </Typography>
            <Link
              className={buttonVariants({ variant: `primary-${variant}` })}
              href={href}
            >
              Back
            </Link>
          </>
        );
    }
  };

  return (
    <div className="_flexbox__col__center mt-32 h-full w-full gap-12">
      {iconsType()}
    </div>
  );
};
export default EmptyState;
