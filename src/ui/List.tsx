
import styled from 'styled-components';

import { colors, fontWeights, fontSizes, padding } from './config';

export const List = styled.ol`
  list-style: none;
  counter-reset: custom-counter;

  li {
    counter-increment: custom-counter;
    position: relative;
  }

  li::before {
    content: counter(custom-counter) ".";
    font-size: ${fontSizes.large};
    color: ${colors.white};
    font-weight: ${fontWeights.heavy};
    position: absolute;
    left: calc(-${padding.large} - 0.5rem);
  }
`
