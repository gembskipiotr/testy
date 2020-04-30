import styled from 'styled-components';
import { Button as ButtonBase } from '@material-ui/core';


import { font, color } from './theme';
import { Color, Font } from './theme.constants';

export const H1 = styled.h1`
  font-family: ${font[Font.PRIMARY]};
  font-weight: bold;
  color: ${color[Color.BLACK]};
`;

export const H2 = styled.h2`
  font-family: ${font[Font.PRIMARY]};
  font-weight: bold;
  color: ${color[Color.BLACK]};
`;

export const H5 = styled.h5`
  font-family: ${font[Font.PRIMARY]};
  font-weight: bold;
  color: ${color[Color.BLACK]};
  margin: 8px 0;
`;

export const Link = styled.a`
  text-decoration: underline;
`;

export const SubmitButton = styled(ButtonBase).attrs(() => ({
  color: 'primary',
  variant: 'contained',
}))`
  && {
    margin-top: 30px;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
`;
