import styled, { css } from 'styled-components';
import { IconButton as IconButtonBase } from '@material-ui/core';
import { Paragraph } from '../../theme/typography';
import { color } from '../../theme/theme';
import { Color } from '../../theme/theme.constants';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled(Paragraph)`
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 5px;
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #efefef;
  }

  ${(props) => !props.read && css`
    ${Text} {
      font-weight: 500;
      color: ${color[Color.SECONDARY]};
    }
  `}
`;

export const DateTime = styled(Paragraph)`
  font-size: 10px;
  margin: 0;
`;

export const IconButton = styled(IconButtonBase)`
  && {
    padding: 5px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70px;
  margin-left: 15px;
`;
