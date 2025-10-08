import { useState } from "react";

type DebounceFunction = (func: () => void, wait: number) => void;

export const useDebounce = (): DebounceFunction => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  return (func: () => void, wait: number): void => {
    if (intervalId) clearTimeout(intervalId);
    const timeoutId = setTimeout(func, wait);
    setIntervalId(timeoutId);
  };
};
