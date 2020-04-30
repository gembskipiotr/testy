import styled from 'styled-components';
import BoardBase from 'react-trello';
import { color } from '../../theme/theme';
import { H5 } from '../../theme/typography';
import { Color } from '../../theme/theme.constants';

export const Container = styled.div`
  width: 100%;
`;

export const OrderBoardHeader = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrderTitle = styled(H5)`
  flex: 1;
  margin: 0;
  padding: 20px;
`;

export const OrderBoard = styled.div`
  width: 100%;
  &:nth-child(even) ${OrderBoardHeader} {
    background-color: ${color[Color.LIGHT_GREY]};
  }
`;

export const Board = styled(BoardBase)`
  && {
    background: transparent;
    height: auto;
    margin-bottom: 50px;

    .smooth-dnd-container.horizontal > section {
      max-height: 80vh !important;
    }
  }
`;
