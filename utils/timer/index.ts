import { useState, useEffect, useRef, useCallback } from "react";

const useTimer = (initialDuration: number) => {
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  const timerRef = useRef<ReturnType<typeof createTimer>>();

  useEffect(() => {
    timerRef.current = createTimer({
      initialDuration,
      onUpdate: (time) => setRemainingTime(time),
      onComplete: () => setRemainingTime(0),
    });

    return () => {
      timerRef.current?.stop();
    };
  }, [initialDuration]);

  const start = useCallback(() => {
    timerRef.current?.start();
  }, []);

  const stop = useCallback(() => {
    timerRef.current?.stop();
  }, []);

  const reset = useCallback(() => {
    timerRef.current?.reset();
    setRemainingTime(initialDuration);
  }, [initialDuration]);

  const getFormattedTime = useCallback(() => {
    if (timerRef.current) {
      return timerRef.current.getFormattedTime();
    }
    return "00:00:00.000";
  }, []);

  return {
    remainingTime,
    start,
    stop,
    reset,
    getFormattedTime,
  };
};

const createTimer = ({
  initialDuration,
  onUpdate,
  onComplete,
}: {
  initialDuration: number;
  onUpdate: (time: number) => void;
  onComplete: () => void;
}) => {
  let endTime: number | null = null;
  let timerInterval: NodeJS.Timeout | null = null;

  const start = () => {
    if (timerInterval !== null) {
      return; // Timer is already running
    }
    endTime = Date.now() + initialDuration;
    timerInterval = setInterval(() => {
      const remainingTime = endTime! - Date.now();
      if (remainingTime <= 0) {
        clearInterval(timerInterval!);
        timerInterval = null;
        onUpdate(0);
        onComplete();
      } else {
        onUpdate(remainingTime);
      }
    }, 10); // Update every 10 milliseconds
  };

  const stop = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  const reset = () => {
    stop();
    onUpdate(initialDuration);
  };

  const getTime = (): number => {
    return endTime! - Date.now();
  };

  const getFormattedTime = (): string => {
    let remainingTime = endTime
      ? Math.max(0, endTime - Date.now())
      : initialDuration;
    let totalSeconds = Math.floor(remainingTime / 1000);
    let seconds = totalSeconds % 60;
    let totalMinutes = Math.floor(totalSeconds / 60);
    let minutes = totalMinutes % 60;

    return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
  };

  const pad = (num: number, size: number): string => {
    let s = "000" + num;
    return s.substr(s.length - size);
  };

  return {
    start,
    stop,
    reset,
    getTime,
    getFormattedTime,
  };
};

export default useTimer;
