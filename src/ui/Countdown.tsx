import React from 'react';

type Props = {
  remainingTime: number;
  totalTime: number;
  // Allow for more accurate countdown display
  decimals?: number;
  interval?: number;
}

export const Countdown: React.FC<Props> = ({
  remainingTime,
  totalTime,
  decimals = 0,
  interval = 1000
}) => {
  return (
    <div>
      <span>{(remainingTime / 1000).toFixed(decimals)}</span>
    </div>
  );
};
