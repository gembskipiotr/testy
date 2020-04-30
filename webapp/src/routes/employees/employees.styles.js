import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { H5 } from '../../theme/typography';

export const Container = styled.div``;

export const Employee = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const BasicData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Actions = styled.div``;

export const Name = styled(H5)``;

export const Details = styled.div``;

export const Detail = styled.p`
  font-size: 12px;
  margin: 4px 0;
`;

export const ActionButton = styled(Button).attrs(() => ({
  color: 'primary',
}))``;
