import React from 'react';

type Props = {
  start: number;
  limit: number;
}

export const Countdown: React.FC<Props> = ({ start, limit }) => {
  const [currentTime, setCurrentTime] = React.useState(new Date().getTime());
  const remainingTime = Math.max(limit - ((currentTime - start) /  1000), 0);

  React.useEffect(() => {
    if (remainingTime > 0) {
      const countdownTimeout = setTimeout(() => {
        setCurrentTime(new Date().getTime())
      }, 1000)

      return () => clearTimeout(countdownTimeout);
    }
  }, [remainingTime])

  return (
    <div>
      <span>{remainingTime.toFixed(0)}</span>
    </div>
  );
};
