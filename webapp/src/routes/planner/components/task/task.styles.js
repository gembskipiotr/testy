import styled from 'styled-components';
import { IconButton as IconButtonBase } from '@material-ui/core';
import { color } from '../../../../theme/theme';
import { Color } from '../../../../theme/theme.constants';
import { Paragraph, H5 } from '../../../../theme/typography';

export const IconButton = styled(IconButtonBase)`
  && {
    padding: 5px;
  }
`;

export const Actions = styled.div`
  position: absolute;
  top: 5px;
  display: none;
  right: 5px;
  flex-direction: column-reverse;
`;

export const Container = styled.div`
  background: ${color[Color.WHITE]};
  border-radius: 7px;
  padding: 15px;
  width: 100%;
  margin-bottom: 8px;
  box-shadow: -1px 4px 2px 0px rgba(0, 0, 0, 0.06);
  position: relative;

  &:hover ${Actions} {
    display: flex;
  }
`;

export const Title = styled(H5)`
  margin: 0;
`;

export const Description = styled(Paragraph)`
  font-size: 12px;
  width: 100%;
  margin-bottom: 0;
  padding-bottom: 0;
`;

export const Deadline = styled(Paragraph)`
  font-size: 12px;
  margin-top: 5px;
`;

export const Owner = styled(Paragraph)`
  font-size: 12px;
  border-top: 1px solid ${color[Color.BORDER]};
  padding-top: 8px;
  margin-bottom: 0;
`;
