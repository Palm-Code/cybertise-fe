"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card, Input, Typography } from "@/core/ui/components";
import AssetType from "@/feature/mediator/components/vrp-launcpad/_dropdown/AssetType.component";
import { filterItems } from "@/feature/mediator/constants/dashboard";
import { FilePenLine, X } from "lucide-react";
import { useState } from "react";

interface I_TargetAssetListCard<T extends boolean> {
  isCompany?: T;
  onClickNext?: T extends true ? () => void : undefined;
  onClickPrev?: T extends true ? () => void : undefined;
}

const TargetAssetListCard = ({
  isCompany = false,
  onClickNext,
  onClickPrev,
}: I_TargetAssetListCard<boolean>) => {
  const [assetCount, setAssetCount] = useState(5);
  const [isEditingList, setIsEditingList] = useState<boolean[]>(
    Array(assetCount).fill(false)
  );

  const handleEditClick = (index: number) => {
    setIsEditingList((prevEditingList) => {
      const newList = [...prevEditingList];
      newList[index] = !newList[index];
      return newList;
    });
  };
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <Typography variant="h5" weight="bold">
        Scope
      </Typography>
      <Typography variant="p" affects="small">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi
        tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi
        tristique senectus et netus et malesuada fames ac turpis.
      </Typography>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-background-page-light dark:bg-background-page-dark",
          "p-7.5"
        )}
      >
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          List of Target Assets
        </Typography>
        {Array(assetCount)
          .fill(0)
          .map((_, index) => (
            <Card
              className={cn(
                "_flexbox__row__center__between w-full cursor-pointer gap-2 rounded-md p-0 px-4",
                "border border-transparent transition-colors duration-100",
                "bg-neutral-light-100 dark:bg-neutral-dark-100"
              )}
              key={`list-make-changes-target-assets-${index}`}
            >
              <Input
                label="Other"
                placeholderText="Input url"
                value="Hostname or IP Address"
                className="bg-transparen w-full"
                transparentBg
                readOnly={!isEditingList[index]}
              />
              {isEditingList[index] ? (
                <AssetType
                  label="Asset type"
                  value="ios"
                  onValueChange={() => {}}
                  options={filterItems.asset_type}
                />
              ) : (
                <div className="_flexbox__row__center gap-4">
                  <button
                    type="button"
                    title="Edit"
                    onClick={() => handleEditClick(index)}
                  >
                    <FilePenLine />
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => setAssetCount(assetCount - 1)}
                  >
                    <X />
                  </button>
                </div>
              )}
            </Card>
          ))}
        <button
          title="Add"
          type="button"
          className={cn(
            "w-full rounded-md border",
            "border-neutral-light-0 px-4 py-4.5 dark:border-neutral-dark-0"
          )}
          onClick={() => setAssetCount(assetCount + 1)}
        >
          + Add New Assets
        </button>
      </Card>
      {isCompany && (
        <div className="_flexbox__row__center gap-8">
          <Button variant="secondary-company" onClick={onClickPrev}>
            Previous
          </Button>
          <Button variant="primary-company" onClick={onClickNext}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
export default TargetAssetListCard;
