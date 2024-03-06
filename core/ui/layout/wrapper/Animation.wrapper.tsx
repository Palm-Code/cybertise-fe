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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("w-full space-y-10", className)}
    >
      {children}
    </motion.div>
  );
};
export default AnimationWrapper;
