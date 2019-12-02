import styled from 'styled-components';
import { fontSizes, fontWeights, colors, padding, AvailableColor } from './config';

type Props = {
  color?: AvailableColor;
}

export const Button = styled.button<Props>`
  border: 0;
  outline: none;
  width: 100%;
  cursor: pointer;
  background: ${props => props.color ? colors[props.color] : colors.white};
  font-size: ${fontSizes.medium};
  color: ${colors.darkblue};
  font-weight: ${fontWeights.heavy};
  padding: ${padding.medium};
  text-align: left;
  margin: ${padding.small};
  box-shadow: -${padding.small} ${padding.small} 0px rgba(0, 0, 0, 0.3);
  transition: all 0.3s linear;

  &[disabled] {
    background: ${colors.purple};
    color: ${colors.white};
    cursor: default;
  }

  &.no-hover {
    cursor: default;
  }

  &:hover:not([disabled]):not(.no-hover) {
    margin: calc(${padding.small} * 1.5) calc(${padding.small} * 1.5) calc(${padding.small} / 2) calc(${padding.small} / 2);
    box-shadow: calc(${padding.small} / -2) calc(${padding.small} / 2) 0 rgba(0, 0, 0, 0.5);
  }
`