"use client";
import { ReactElement, useEffect, useRef, useState, useCallback } from "react";

export function useMultistepForm(
  steps: { key: string; element: ReactElement }[]
) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [steps[currentStepIndex].key]);

  const next = useCallback(() => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }, [steps.length]);

  const back = useCallback(() => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentStepIndex(index);
  }, []);

  return {
    currentStepIndex,
    step: steps[currentStepIndex].element,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    isThirdStep: currentStepIndex === 2,
    isEightStep: currentStepIndex === 8,
    containerRef,
    goTo,
    next,
    back,
  };
}
