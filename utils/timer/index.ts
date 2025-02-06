import { useState, useEffect, useRef, useCallback } from "react";

const useTimer = (expiredAt: string | null) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof createTimer>>();

  useEffect(() => {
    if (!expiredAt) return;

    const expirationTime = new Date(expiredAt).getTime();
    const initialDuration = expirationTime - Date.now();

    if (initialDuration > 0) {
      timerRef.current = createTimer({
        initialDuration,
        onUpdate: (time) => setRemainingTime(time),
        onComplete: () => setRemainingTime(0),
      });

      timerRef.current.start();
    } else {
      setRemainingTime(0); // Already expired
    }

    return () => {
      timerRef.current?.stop();
    };
  }, [expiredAt]);

  const start = useCallback(() => {
    timerRef.current?.start();
  }, []);

  const stop = useCallback(() => {
    timerRef.current?.stop();
  }, []);

  const reset = useCallback(() => {
    timerRef.current?.reset();
  }, []);

  const getFormattedTime = useCallback(() => {
    return timerRef.current ? timerRef.current.getFormattedTime() : "00:00";
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
    if (timerInterval !== null) return; // Timer already running

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
    }, 1000); // Update every second
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

  const getFormattedTime = (): string => {
    let remainingTime = endTime ? Math.max(0, endTime - Date.now()) : 0;
    let totalSeconds = Math.floor(remainingTime / 1000);
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let hours = Math.floor(totalSeconds / 3600);

    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
  };

  const pad = (num: number, size: number): string => {
    return num.toString().padStart(size, "0");
  };

  return {
    start,
    stop,
    reset,
    getFormattedTime,
  };
};

export default useTimer;
