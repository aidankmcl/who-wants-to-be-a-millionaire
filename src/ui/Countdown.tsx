import React from 'react';

type Props = {
  startTime: number;
  endTime: number;
  // Allow for more accurate countdown display
  decimals?: number;
  interval?: number;
}

export const Countdown: React.FC<Props> = ({
  startTime,
  endTime,
  decimals = 0,
  interval = 1000
}) => {
  const fullRange = endTime - startTime;
  const [remainingTime, setRemainingTime] = React.useState(fullRange);

  React.useEffect(() => {
    let timeDiffStart = 0;

    if (remainingTime > 0) {
      timeDiffStart = new Date().getTime();
      const countdownTimeout = setTimeout(() => {
        const timeDiff = new Date().getTime() - timeDiffStart
        setRemainingTime(Math.max(0, remainingTime - timeDiff));
      }, interval)

      // If a component unmounts before a timeout has been executed, clear it.
      return () => clearTimeout(countdownTimeout);
    }
  }, [remainingTime]);

  React.useEffect(() => {
    setRemainingTime(endTime - startTime);
  }, [startTime, endTime]);

  return (
    <div>
      <span>{(remainingTime / 1000).toFixed(decimals)}</span>
    </div>
  );
};
