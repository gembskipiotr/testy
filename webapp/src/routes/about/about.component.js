import React from 'react';
import Helmet from 'react-helmet';
import { Typography } from '@material-ui/core';

import { Paragraph } from '../../theme/typography';
import { Container, ContentWrapper } from './about.styles';

export const About = () => {
  return (
    <Container>
      <Helmet title="Task planner - O nas" />
      <ContentWrapper>
        <Typography variant="h5">Przykładowy opis</Typography>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem ligula,
          lacinia sit amet hendrerit eget, cursus quis diam. Phasellus posuere nec quam feugiat laoreet.
          Donec imperdiet blandit interdum.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
};
