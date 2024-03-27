import { Role } from "@/types/admin/sidebar";
import { EmptyFolder, HackerLeaf, Leaf } from "../../icons";
import { Button, Typography } from "../../components";
import Link from "next/link";
import { buttonVariants } from "../../components/button/base-button";

interface I_EmptyStateProps {
  variant: "company" | "hacker" | "mediator";
  type: "program" | "ticket" | "under-construction" | "update";
  buttonText?: string;
  href?: string;
}

const iconColors: { [key in Role]: string } = {
  hacker: "text-emerald-normal",
  company: "text-sky-light",
  mediator: "text-violet-light",
};

const EmptyState = ({
  variant,
  type,
  buttonText = "See VRP Launchpad",
  href = "/",
}: I_EmptyStateProps) => {
  const iconsType = () => {
    switch (type) {
      case "ticket":
        return (
          <>
            <EmptyFolder className={iconColors[variant]} />
            <Typography variant="p" affects="extralarge" weight="bold">
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
              <Typography variant="p" affects="extralarge" weight="bold">
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
      default:
        return (
          <>
            <>
              <EmptyFolder className={iconColors[variant]} />
              <Typography variant="p" affects="extralarge" weight="bold">
                Under Construction
              </Typography>
              <Link
                className={buttonVariants({ variant: `primary-${variant}` })}
                href={href}
              >
                Back
              </Link>
            </>
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
