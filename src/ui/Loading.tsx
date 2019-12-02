// Placeholder that would be replaced with nicer Loading component in
// a real world scenario.

import React from 'react';
import styled from 'styled-components';

import { padding } from './config';
import { Title } from './Text';

const Wrapper = styled.div`
  padding: ${padding.medium}
`

export const LoadingIndicator: React.FC = () => (
  <Wrapper>
    <Title as="span">Loading...</Title>
  </Wrapper>
)