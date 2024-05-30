import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { I_UpdateProfile } from "@/core/models/company/settings";
import { Card, Input, Typography } from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import { Role } from "@/types/admin/sidebar";
import { UserRound } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface I_CardAccountDetailsProps {
  variant?: keyof typeof Role;
  isEditing?: boolean;
  data?: I_GetUserProfileSuccessResponse["data"];
}

const CardAccountDetails = ({
  isEditing,
  variant,
  data,
}: I_CardAccountDetailsProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<I_UpdateProfile>();
  const forms = watch();
  if (isEditing)
    return (
      <>
        <Desktop>
          <Card
            className={cn(
              "_flexbox__col__start__start w-full gap-8 rounded-xl p-7.5",
              "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Typography variant="h6" weight="bold" className="inline-flex">
              Account Details
            </Typography>
            <div className="_flexbox__col__start__start w-full gap-6">
              <Input
                type="email"
                label="Registered Email"
                disabled={variant === "mediator"}
                wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                value={forms.email}
                onChange={(e) =>
                  setValue("email", e.target.value, {
                    shouldValidate: true,
                  })
                }
                onClearInput={() => {
                  setValue("email", "", { shouldValidate: true });
                }}
                isError={!!errors.email}
              />
              {variant === "company" && (
                <Input
                  type="text"
                  label="Company Website"
                  wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                  value={forms.website}
                  onChange={(e) =>
                    setValue("website", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("website", "", { shouldValidate: true });
                  }}
                  isError={!!errors.website}
                />
              )}
              <Input
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                label="Phone Number"
                wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                value={forms.phone}
                onChange={(e) =>
                  setValue("phone", e.target.value, {
                    shouldValidate: true,
                  })
                }
                onClearInput={() => {
                  setValue("phone", "", { shouldValidate: true });
                }}
                isError={!!errors.phone}
                errorMsg={errors.phone?.message}
              />
            </div>
          </Card>
        </Desktop>
      </>
    );
  return (
    <>
      <Mobile>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl p-7.5"
          )}
        >
          <Typography variant="h6" weight="bold" className="inline-flex">
            <UserRound className="mr-4 h-8 w-8" />
            Account Details
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-6">
            <div className="_flexbox__row__center__between w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Registered Email
              </Typography>
            </div>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.email}
            </Typography>
            {variant === "company" && (
              <>
                <div className="_flexbox__row__center__between w-full gap-2.5">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    Company Website
                  </Typography>
                </div>
                <Typography variant="p" affects="normal" className="col-span-1">
                  {data?.website}
                </Typography>
              </>
            )}
            <div className="_flexbox__row__center__between w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Phone Number
              </Typography>
            </div>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.phone}
            </Typography>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-6 rounded-xl p-7.5",
            "bg-neutral-light-100 dark:bg-neutral-dark-100"
          )}
        >
          <Typography variant="h6" weight="bold" className="inline-flex">
            <UserRound className="mr-4 h-8 w-8" />
            Account Details
          </Typography>
          <div className="grid w-full grid-cols-3 gap-x-6 gap-y-2.5">
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Registered Email
              </Typography>
              <Typography variant="p" affects="normal" className="col-span-1">
                {data?.email}
              </Typography>
            </div>
            {variant === "company" && (
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Website
                </Typography>
                <Typography variant="p" affects="normal" className="col-span-1">
                  {data?.website}
                </Typography>
              </div>
            )}
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Phone Number
              </Typography>
              <Typography variant="p" affects="normal" className="col-span-1">
                {data?.phone}
              </Typography>
            </div>
          </div>
        </Card>
      </Desktop>
    </>
  );
};
export default CardAccountDetails;
