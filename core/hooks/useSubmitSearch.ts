"use client";
import { toast } from "sonner";

export const useSubmitSearch = (value?: string, refetch?: () => void) => {
  if (!value || value?.length < 3) {
    toast.error("Please enter at least 3 characters");
  } else if (refetch) {
    refetch();
  }
};
