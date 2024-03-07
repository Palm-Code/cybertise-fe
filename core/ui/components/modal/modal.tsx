"use client";
import { useState } from "react";
import { cn } from "@/core/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface I_ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const BaseModal = ({ children, isOpen }: I_ModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  // Update visibility when isOpen changes
  if (isOpen !== isVisible) {
    setIsVisible(isOpen);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "_flexbox__col__center fixed inset-0 z-[9999] min-h-screen w-full overflow-hidden",
            "bg-background-page-light/70 dark:bg-background-page-dark/70"
          )}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default BaseModal;
