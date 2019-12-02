
import React from 'react';
import styled from 'styled-components'

import { fontSizes, colors } from '../../../ui/config';

type Props = {
  top: number;
  bottom: number;
  sub: string;
}

const StyledContainer = styled.div`
  display: inline-block;
  color: ${colors.white};
  text-align: center;
  width: 33%;

  span.data, span.sub {
    display: block;
  }

  span.data {
    font-size: ${fontSizes.xl};
  }

  span.sub {
    font-size: ${fontSizes.large};
  }
`

export const KeyNumber: React.FC<Props> = ({ top, bottom, sub }) => (
  <StyledContainer>
    <span className='data'>{top} / {bottom}</span>
    <span className='sub'>{sub}</span>
  </StyledContainer>
)