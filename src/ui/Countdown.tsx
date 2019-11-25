import React from 'react';

type Props = {
  remainingTime: number;
  setRemaining: (amount: number) => void;
}

export const Countdown: React.FC<Props> = ({ remainingTime, setRemaining }) => {
  let timeDiffStart = 0;

  React.useEffect(() => {
    if (remainingTime > 0) {
      timeDiffStart = new Date().getTime();
      const countdownTimeout = setTimeout(() => {
        // Can just subtract 1 assuming a flat second but can also be exact,
        // assuming that a quiz game requires accurate timing.
        const timeDiff = (new Date().getTime() - timeDiffStart) / 1000
        // Never set a time below 0
        setRemaining(Math.max(0, remainingTime - timeDiff));
      }, 1000)

      // If a component unmounts before a timeout has been executed, clear it.
      return () => clearTimeout(countdownTimeout);
    }
  }, [remainingTime])

  return (
    <div>
      <span>{remainingTime.toFixed(0)}</span>
    </div>
  );
};
