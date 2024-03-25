"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card, Tiptap, Typography } from "@/core/ui/components";
import { useState } from "react";

interface INotesProps {
  onClickNext: () => void;
  onClickPrev: () => void;
}

const Notes = ({ onClickNext, onClickPrev }: INotesProps) => {
  const [description, setDescription] = useState<string>("");
  return (
    <Card className={cn("_flexbox__col__start__start w-full gap-6 p-0")}>
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
        description={description}
        label="Change Notes"
        onChangeValue={(v) => setDescription(v)}
        onClearInput={() => setDescription("")}
        variant="mediator"
        withTooltip
      />
      <div className="_flexbox__row__center gap-8">
        <Button
          variant="secondary-mediator"
          onClick={() => {
            onClickPrev();
          }}
        >
          Previous
        </Button>
        <Button
          variant="primary-mediator"
          onClick={() => {
            onClickNext();
          }}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};
export default Notes;
