import React from 'react';
import styled from 'styled-components';

import { colors, padding } from './config';

const Wrapper = styled.div`
  display: inline-block;
  background: ${colors.red};
  padding: ${padding.medium} ${padding.large};

  p {
    font-weight: 500;
    color: ${colors.white};
  }
`

type Props = {
  text?: string;
}

export const Error: React.FC<Props> = ({ text, children }) => (
  <Wrapper>
    {(text) && (<p>{text}</p>)}
    {(!text) && children}
  </Wrapper>
)