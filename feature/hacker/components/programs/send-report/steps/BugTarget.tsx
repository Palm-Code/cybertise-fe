"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  Card,
  Input,
  SelectDropdown,
  Typography,
} from "@/core/ui/components";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import AssetType from "../../_dropdown/AssetType.component";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import CsvssCalculator from "./_card/bug-target/CsvssCalculator";
import ManualRiskLevel from "./_card/bug-target/ManualRiskLevel";
import { useState } from "react";

interface I_BugTargetProps {}

const BugTarget = ({}: I_BugTargetProps) => {
  const [manualRisk, setManualRisk] = useState<boolean>(false);
  return (
    <>
      <Card className="rounded-md bg-neutral-light-90 px-4 py-4.5 dark:bg-neutral-dark-90">
        <div className="_flexbox__col__start__start w-full gap-4">
          <Typography variant="p" affects="normal">
            Target Assets
          </Typography>
          <Card
            className={cn(
              "_flexbox__col__start__start w-full cursor-pointer gap-2 rounded-2xl px-6 py-4",
              "border border-transparent transition-colors duration-100",
              "bg-neutral-light-100 hover:border-lime-normal dark:bg-neutral-dark-100"
            )}
          >
            <Typography variant="p" affects="normal">
              prime.coinbase.com
            </Typography>
            <Badge variant="url">Domain</Badge>
          </Card>
          <Card
            className={cn(
              "_flexbox__row__center__between w-full cursor-pointer gap-2 rounded-2xl px-6 py-4",
              "border border-transparent transition-colors duration-100",
              "bg-neutral-light-100 hover:border-lime-normal dark:bg-neutral-dark-100"
            )}
          >
            <Input
              label="Other"
              placeholderText="Input url"
              className="bg-transparen w-full"
              transparentBg
            />
            <AssetType
              label="Asset type"
              value="ios"
              onValueChange={() => {}}
              options={filterItems.asset_type}
            />
          </Card>
        </div>
      </Card>
      <SelectDropdown
        label="Vulnerability Type"
        value={""}
        options={countryOptions}
        onValueChange={(v) => {}}
        className="!h-auto bg-neutral-light-90 px-4 py-4 pr-6 dark:bg-neutral-dark-90"
      />
      <CsvssCalculator
        isManualRisk={manualRisk}
        onChangeManualRisk={() => setManualRisk(!manualRisk)}
      />
      <ManualRiskLevel
        isManualRisk={manualRisk}
        onChangeManualRisk={() => setManualRisk(!manualRisk)}
      />
    </>
  );
};
export default BugTarget;
