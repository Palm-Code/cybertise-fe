"use client";
import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Accordion = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={cn(
        "relative rounded-[10px] border bg-background-main-light dark:bg-background-main-dark",
        collapsed ? "border-black dark:border-white" : "!border-transparent"
      )}
    >
      <button
        type="button"
        title={question}
        className="flex w-full items-center justify-between p-6"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Typography variant="p" affects="normal" weight="bold">
          {question}
        </Typography>
        <ChevronDown
          className={cn(
            "transition-transform duration-200",
            collapsed && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {collapsed && (
          <motion.div
            initial={{ height: 0, marginBottom: 0, opacity: 0 }}
            animate={{ height: "auto", marginBottom: "1rem", opacity: 1 }}
            exit={{ height: 0, marginBottom: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 xl:px-7.5"
          >
            <Typography
              variant="p"
              affects={"small"}
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {answer}
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AccordionList = ({
  data,
}: {
  data: { question: string; answer: string }[];
}) => {
  return data.map((item, idx) => <Accordion key={`faq-${idx}`} {...item} />);
};
