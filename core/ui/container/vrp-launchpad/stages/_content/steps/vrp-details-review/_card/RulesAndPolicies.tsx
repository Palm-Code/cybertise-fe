"use client";
import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { Button, Card, Tiptap, Typography } from "@/core/ui/components";
import { Role } from "@/types/admin/sidebar";
import { sanitize } from "@/utils/sanitize-input";
import { useFormContext } from "react-hook-form";

interface IRulesAndPoliciesProps {
  variant?: keyof typeof Role;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  currentSteps?: string;
  isReview?: boolean;
}

const RulesAndPolicies = ({
  onClickNext,
  onClickPrev,
  variant = "mediator",
  isReview = false,
}: IRulesAndPoliciesProps) => {
  const { watch, setValue } = useFormContext<CreateVrpType>();
  const forms = watch();

  if (isReview)
    return (
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-background-page-light dark:bg-background-page-dark",
          "xl:p-7.5"
        )}
      >
        <Typography variant="h6" weight="bold">
          Rules & Policies
        </Typography>
        <div className="__flexbox__col__start__start w-full gap-2.5">
          <Typography
            variant="p"
            affects="normal"
            className="text-neutral-light-40 dark:text-neutral-dark-40"
          >
            Rules
          </Typography>
          <article>
            <Tiptap showing description={sanitize(forms.rules ?? "")} />
          </article>
        </div>
        <div className="__flexbox__col__start__start w-full gap-2.5">
          <Typography
            variant="p"
            affects="normal"
            className="text-neutral-light-40 dark:text-neutral-dark-40"
          >
            Policies
          </Typography>
          <article>
            <Tiptap showing description={sanitize(forms.policies ?? "")} />
          </article>
        </div>
      </Card>
    );

  return (
    <Card className={cn("_flexbox__col__start__start w-full gap-6 xl:p-0")}>
      <Typography variant="h5" weight="bold">
        Rules And Policies
      </Typography>
      <Typography variant="p" affects="small">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi
        tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi
        tristique senectus et netus et malesuada fames ac turpis.
      </Typography>
      {variant === "mediator" ? (
        <>
          <Tiptap
            description={forms.rules as string}
            label="Rules"
            onChangeValue={(v) => setValue("rules", v)}
            onClearInput={() => setValue("rules", "")}
            variant={variant}
            withTooltip
          />
          <Tiptap
            description={forms.policies as string}
            label="Policies"
            onChangeValue={(v) => setValue("policies", v)}
            onClearInput={() => setValue("policies", "")}
            variant={variant}
            withTooltip
          />
        </>
      ) : (
        <>
          <div className="__flexbox__col__start__start w-full gap-2.5">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              Rules
            </Typography>
            <article>
              <Tiptap
                showing
                description={sanitize(forms.rules ?? "")}
                className="h-44 rounded-md bg-neutral-light-90 p-4 dark:bg-neutral-dark-90"
              />
            </article>
          </div>
          <div className="__flexbox__col__start__start w-full gap-2.5">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              Policies
            </Typography>
            <article>
              <Tiptap
                showing
                description={sanitize(forms.policies ?? "")}
                className="h-44 rounded-md bg-neutral-light-90 p-4 dark:bg-neutral-dark-90"
              />
            </article>
          </div>
          <div className="_flexbox__row__center gap-8">
            <Button variant={`secondary-${variant}`} onClick={onClickPrev}>
              Previous
            </Button>
            <Button variant={`primary-${variant}`} onClick={onClickNext}>
              Next
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
export default RulesAndPolicies;
