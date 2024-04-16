"use client";
import { useRef, useState } from "react";
import { cn } from "@/core/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

export interface I_ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

const BaseModal = ({
  children,
  isOpen,
  className,
  onClose = () => {},
}: I_ModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => {
    onClose();
  });

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "_flexbox__col__center fixed inset-0 z-[9999] min-h-screen w-full overflow-hidden",
              "bg-background-page-light/70 dark:bg-background-page-dark/70",
              className
            )}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2 }}
              className="w-full"
              ref={ref}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default BaseModal;
