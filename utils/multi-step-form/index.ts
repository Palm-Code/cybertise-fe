"use client";
import { ReactElement, useEffect, useRef, useState } from "react";

export function useMultistepForm(
  steps: { key: string; element: ReactElement }[]
) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log(scrollPosition);

  // Function to handle scroll event
  function handleScroll() {
    if (containerRef.current) {
      const currentPosition = containerRef.current.scrollTop;
      setScrollPosition(currentPosition);
    }
  }

  // Effect to add scroll event listener
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

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
