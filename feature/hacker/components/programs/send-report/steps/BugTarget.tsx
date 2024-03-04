import { cn } from "@/core/lib/utils";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  SelectDropdown,
  Typography,
} from "@/core/ui/components";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import AssetType from "../../_dropdown/AssetType.component";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { ChevronDown } from "lucide-react";

interface I_BugTargetProps {}

const BugTarget = ({}: I_BugTargetProps) => {
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
      <Card className="rounded-md bg-neutral-light-80 px-4 py-4.5 dark:bg-neutral-dark-80">
        <div className="_flexbox__col__center__start w-full gap-4">
          <div className="_flexbox__row__center__between w-full">
            <div className="_flexbox__row__center gap-4">
              <Checkbox variant="hacker" checked />
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                CVSS Calculator
              </Typography>
            </div>
            <Badge variant="default">0 (No Risk)</Badge>
          </div>
          <div className="grid h-fit w-full grid-cols-2 gap-4">
            <Card
              className={cn(
                "_flexbox__col__start__start gap-4 rounded-md bg-neutral-light-90 px-4 py-4.5 dark:bg-neutral-dark-90"
              )}
            >
              <div className="_flexbox__row__center__between w-full">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Attack Vector (AV)
                </Typography>
                <ChevronDown width={24} height={24} />
              </div>
              <button
                type="button"
                className={cn(
                  "w-fit rounded-md border border-transparent bg-neutral-light-100 px-4 py-3 dark:bg-neutral-dark-100",
                  "hover:border-lime-normal hover:bg-lime-lighter/20"
                )}
              >
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Network (N)
                </Typography>
              </button>
            </Card>
          </div>
        </div>
      </Card>
      <Card className="rounded-md bg-neutral-light-90 px-4 py-4.5 dark:bg-neutral-dark-90">
        <div className="_flexbox__row__start__start gap-4">
          <Checkbox variant="hacker" />
          <Typography
            variant="p"
            affects="normal"
            className="text-neutral-light-40 dark:text-neutral-dark-40"
          >
            Set Risk Level Manually
          </Typography>
        </div>
      </Card>
    </>
  );
};
export default BugTarget;
