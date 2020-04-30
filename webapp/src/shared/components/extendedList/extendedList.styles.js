import styled from 'styled-components';
import { List, ListItem } from '@material-ui/core';
import { Paragraph as ParagraphBase } from '../../../theme/typography';

export const Container = styled(List)``;

export const SearchContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
`;

export const Item = styled(ListItem)``;

export const Paragraph = styled(ParagraphBase)`
  width: 100%;
  text-align: center;
`;
