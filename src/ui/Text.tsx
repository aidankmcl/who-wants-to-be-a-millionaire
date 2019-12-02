// Choosing appropriate default HTML tags, however all can be overwritten using
// styled-component's `as` prop.

import styled from 'styled-components';
import { fontSizes, fontWeights, colors } from './config';

export const Title = styled.h1`
  font-size: ${fontSizes.large};
  color: ${colors.white};
  font-weight: ${fontWeights.heavy};
`

export const Text = styled.p`
  font-size: ${fontSizes.medium};
  color: ${colors.white};
`