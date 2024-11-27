import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { Card, Tiptap, Typography } from "@/core/ui/components";
import { sanitize } from "@/utils/sanitize-input";
import { useTranslations } from "next-intl";
import React from "react";

type RnpProps = {
  data: CreateVrpType;
};

const RulesAndPoliciesReview = ({ data }: RnpProps) => {
  const t = useTranslations(
    "VRPLaunchpad.phase.vrp_details.rules_and_policies"
  );

  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6",
        "bg-background-page-light dark:bg-background-page-dark",
        "xl:p-7.5"
      )}
    >
      <Typography variant="h6" weight="bold">
        {t("header_title")}
      </Typography>
      <div className="__flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("rules")}
        </Typography>
        <article>
          <Tiptap showing description={sanitize(data.rules ?? "")} />
        </article>
      </div>
      <div className="__flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("policies")}
        </Typography>
        <article>
          <Tiptap showing description={sanitize(data.policies ?? "")} />
        </article>
      </div>
    </Card>
  );
};

export default RulesAndPoliciesReview;
