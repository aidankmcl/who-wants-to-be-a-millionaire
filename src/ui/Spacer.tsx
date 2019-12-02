import styled from 'styled-components';
import { padding } from './config';

type Props = {
  size: keyof typeof padding
}

export const Spacer = styled.hr<Props>`
  border: 0;
  outline: none;
  width: 100%;
  cursor: default;
  margin: ${props => props.size} 0;
`