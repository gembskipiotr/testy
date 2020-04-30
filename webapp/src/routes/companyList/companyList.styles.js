import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { H5 } from '../../theme/typography';

export const Container = styled.div`
  flex: 1;
`;

export const CompanyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const Name = styled(H5)``;

export const ActionButton = styled(Button).attrs(() => ({
  color: 'primary',
}))``;
