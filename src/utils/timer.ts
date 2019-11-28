
import React from 'react';

/*
 * Return
 * 1. Remaining time
 * 2. Whether the time has been hit
 * 3. A function for setting time (can also be used for adding)
 **/
type HookData = [number, boolean, (newTime: number, additive?: boolean) => void];

export const useTimer = (total: number, interval: number = 1000): HookData => {
  const [remainingTime, setRemainingTime] = React.useState(total);
  const [timeup, setTimeup] = React.useState(false);

  React.useEffect(() => {
    let timeDiffStart = 0;

    if (remainingTime > 0 && !timeup) {
      timeDiffStart = new Date().getTime();
      const countdownTimeout = setTimeout(() => {
        const timeDiff = new Date().getTime() - timeDiffStart
        const newRemainingTime = Math.max(0, remainingTime - timeDiff);
        if (newRemainingTime <= 10) {
          setTimeup(true);
        }

        setRemainingTime(newRemainingTime);
      }, interval)

      // If a component unmounts before a timeout has been executed, clear it.
      return () => clearTimeout(countdownTimeout);
    }
  }, [remainingTime, interval, timeup]);

  const setTime = (newTime: number) => {
    setRemainingTime(newTime);
    setTimeup(false);
  }

  return [remainingTime, timeup, setTime];
}
