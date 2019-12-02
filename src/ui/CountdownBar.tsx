import React from 'react';
import styled from 'styled-components';

import { colors } from './config';

type StyleProps = {
  percentage: number;
  total: number;
}

const StyledBar = styled.div<StyleProps>`
  height: 100%;
  width: ${props => props.percentage}%;
  background: ${colors.white};
  transition: 1s linear width;
  transition-delay: 0;
  border-radius: 0.4rem;
`

type Props = {
  remainingTime: number;
  totalTime: number;
}

export const CountdownBar: React.FC<Props> = ({
  remainingTime,
  totalTime,
}) => {
  const percentage = Math.max(0, Math.min(100, ((remainingTime / totalTime) - (1000 / totalTime)) * 100));

  return (
    <StyledBar percentage={percentage} total={totalTime} />
  );
};
