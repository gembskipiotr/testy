import React from 'react';
import Helmet from 'react-helmet';
import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';

import { LANES } from '../../modules/tasks/tasks.contants';
import { Paragraph } from '../../theme/typography';
import { Container, ContentWrapper } from './home.styles';
import { Board } from '../planner/planner.styles';
import { Task } from '../planner/components/task';

const getFakeId = () => Math.floor(Math.random() * 100);
const sampleData = Object.values(LANES).map((lane) => {
  const taskId = getFakeId();
  return {
    ...lane,
    cards: [{
      id: taskId,
      title: `Zadanie nr ${getFakeId()}`,
      description: 'Przykładowy opis',
      label: dayjs(Date.now() * Math.random()).format('DD.MM.YYYY'),
      metadata: {
        _id: `${taskId}`,
        userName: `Testowy user ${getFakeId()}`,
      },
    }],
  };
});

const customComponents = {
  Card: Task,
};

export const Home = () => {
  const renderBoard = () => {
    return (
      <Board
        data={{ lanes: sampleData }}
        components={customComponents}
        cardDraggable
        laneDraggable={false}
      />
    );
  };

  return (
    <Container>
      <Helmet title="Task planner" />
      <ContentWrapper>
        <Typography variant="h5">Przykładowy tytuł</Typography>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem ligula,
          lacinia sit amet hendrerit eget, cursus quis diam. Phasellus posuere nec quam feugiat laoreet.
          Donec imperdiet blandit interdum.
        </Paragraph>
      </ContentWrapper>
      <ContentWrapper>
        <Typography variant="h5">Przykładowy planner</Typography>
        {renderBoard()}
      </ContentWrapper>
      <ContentWrapper>
        <Typography variant="h5">Przykładowy tytuł 2</Typography>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem ligula,
          lacinia sit amet hendrerit eget, cursus quis diam. Phasellus posuere nec quam feugiat laoreet.
          Donec imperdiet blandit interdum.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
};
