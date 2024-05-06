"use client";
import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { Button, Card, Tiptap, Typography } from "@/core/ui/components";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface INotesProps {
  variant?: "mediator" | "company";
  onClickNext?: () => void;
  onClickPrev?: () => void;
}

const Notes = ({
  onClickNext,
  onClickPrev,
  variant = "mediator",
}: INotesProps) => {
  const { watch, setValue } = useFormContext<CreateVrpType>();
  const forms = watch();
  return (
    <Card className={cn("_flexbox__col__start__start w-full gap-6 xl:p-0")}>
      <Typography variant="h5" weight="bold">
        Change Notes
      </Typography>
      <Typography variant="p" affects="small">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi
        tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi
        tristique senectus et netus et malesuada fames ac turpis.
      </Typography>
      <Tiptap
        description={forms.notes}
        label="Change Notes"
        onChangeValue={(v) => setValue("notes", v)}
        onClearInput={() => setValue("notes", "")}
        variant={variant}
        withTooltip
      />
      <div className="_flexbox__row__center gap-8">
        <Button variant={`secondary-${variant}`} onClick={onClickPrev}>
          Previous
        </Button>
        <Button
          variant={`primary-${variant}`}
          disabled={!forms.notes}
          onClick={onClickNext}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};
export default Notes;
