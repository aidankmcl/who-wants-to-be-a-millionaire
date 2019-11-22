import React from 'react';
import styled from 'styled-components';

import { padding } from './config';

const Wrapper = styled.div`
  padding: ${padding.medium}
`

export const LoadingIndicator: React.FC = () => (
  <Wrapper>
    <span>Loading...</span>
  </Wrapper>
)