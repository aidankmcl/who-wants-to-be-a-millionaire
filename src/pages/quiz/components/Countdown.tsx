import React from 'react';
import styled from 'styled-components';

import { colors, fontSizes } from '../../../ui/config';

const StyledContainer = styled.div`
  width: 8rem;
  height: 8rem;
  background: ${colors.darkblue};
  border: 0.8rem solid ${colors.white};
  border-radius: 1rem 100% 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    display: inline-block;
    font-size: ${fontSizes.xl};
    color: ${colors.white};
  }
`

type Props = {
  remainingTime: number;
  decimals?: number;
}

export const Countdown: React.FC<Props> = ({
  remainingTime,
  decimals = 0,
}) => {
  return (
    <StyledContainer>
      <span>{(remainingTime / 1000).toFixed(decimals)}</span>
    </StyledContainer>
  );
};
