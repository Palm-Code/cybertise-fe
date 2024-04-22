"use client";
import { useState } from "react";
import Button from "../button/button";
import Typography from "../typography/typography";

interface ShowingProps {
  variant?: "hacker" | "company" | "mediator";
  onClickShow?: (v: number) => void;
  active?: number;
}

const showingCount = [10, 20, 30];

const Showing = ({
  variant = "hacker",
  onClickShow = () => {},
  active = 10,
}: ShowingProps) => {
  return (
    <div className="_flexbox__col__start__start gap-2.5">
      <Typography variant="p" affects="small">
        Showing in page
      </Typography>
      <div className="_flexbox__row__center gap-1.5">
        {showingCount.map((item, index) => (
          <Button
            key={index}
            variant={
              active === item ? `primary-${variant}` : `outline-${variant}`
            }
            size="default"
            className="rounded-lg p-2.5"
            onClick={() => onClickShow(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default Showing;
