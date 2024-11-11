import { Role } from "@/types/admin/sidebar";
import { EmptyFolder, HackerLeaf, Leaf } from "../../icons";
import { Button, Typography } from "../../components";
import Link from "next/link";
import { buttonVariants } from "../../components/button/base-button";
import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { useTranslations } from "next-intl";

interface I_EmptyStateProps {
  variant?: keyof typeof Role;
  type?:
    | "default"
    | "program"
    | "ticket"
    | "under-construction"
    | "collaborators"
    | "update"
    | "target-assets";

  buttonText?: string;
  titleText?: string;
  href?: string;
  onClickButton?: () => void;
  className?: string;
  noMargin?: boolean;
}

const EmptyState = ({
  variant = "hacker",
  type = "default",
  buttonText,
  href = "/",
  titleText = "You're not Allowed Here",
  onClickButton = () => {},
  className = "",
  noMargin = false,
}: I_EmptyStateProps) => {
  const t = useTranslations("EmptyState");
  const iconsType = () => {
    switch (type) {
      case "ticket":
        return (
          <>
            <EmptyFolder className={iconColor[variant]} />
            <Typography
              variant="p"
              affects="extralarge"
              weight="bold"
              align={"center"}
            >
              {t("you_have_nothing_here")}
            </Typography>
            {!!buttonText && (
              <Link
                className={buttonVariants({ variant: `primary-${variant}` })}
                href={href}
              >
                {buttonText}
              </Link>
            )}
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
                {titleText ?? "You have no any program yet"}
              </Typography>
              {!!buttonText && (
                <Link
                  className={buttonVariants({ variant: `primary-${variant}` })}
                  href={href}
                >
                  {buttonText ?? "Add new program"}
                </Link>
              )}
            </>
          </>
        );
      case "target-assets":
        return (
          <>
            <>
              <EmptyFolder className={iconColor[variant]} />
              <Typography
                variant="p"
                affects="extralarge"
                weight="bold"
                align={"center"}
              >
                {t("target_assets_not_found")}
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
                {t("you_have_nothing_here")}
              </Typography>
              {!!buttonText && (
                <Button
                  variant={`primary-${variant}`}
                  className="w-full"
                  onClick={() => onClickButton()}
                >
                  {buttonText}
                </Button>
              )}
            </>
          </>
        );
      case "under-construction":
      case "collaborators":
        return (
          <>
            <EmptyFolder className={iconColor[variant]} />
            <Typography
              variant="p"
              affects="extralarge"
              weight="bold"
              align={"center"}
            >
              {titleText}
            </Typography>
            {!!buttonText && (
              <Button
                variant={`primary-${variant}`}
                className="w-full"
                onClick={() => onClickButton()}
              >
                {buttonText}
              </Button>
            )}
          </>
        );
      default:
        return (
          <>
            <EmptyFolder className={iconColor[variant]} />
            <Typography
              variant="p"
              affects="extralarge"
              weight="bold"
              align={"center"}
            >
              {t("you_have_nothing_here")}
            </Typography>
            {!!buttonText && (
              <Link
                className={buttonVariants({ variant: `primary-${variant}` })}
                href={href}
              >
                {t("back_button")}
              </Link>
            )}
          </>
        );
    }
  };

  return (
    <div
      className={cn(
        "_flexbox__col__center h-full w-full gap-12",
        !noMargin && "mt-32",
        className
      )}
    >
      {iconsType()}
    </div>
  );
};
export default EmptyState;
