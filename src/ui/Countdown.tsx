import React from 'react';
import styled from 'styled-components';

import { colors } from './config';

const StyledContainer = styled.div`
  width: 8rem;
  height: 8rem;
  background: ${colors.darkblue};
  border: 0.5rem solid ${colors.white};
  border-radius: 100%;
`

const StyledValue = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-algin: center;
`

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
    <StyledContainer>
      <StyledValue>{(remainingTime / 1000).toFixed(decimals)}</StyledValue>
    </StyledContainer>
  );
};
