"use client";
import { cn } from "@/core/lib/utils";
import { motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full space-y-10", className)}
    >
      {children}
    </motion.div>
  );
};
export default AnimationWrapper;
