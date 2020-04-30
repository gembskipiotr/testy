import styled from 'styled-components';
import {
  DialogContent as DialogContentBase,
  DialogTitle as DialogTitleBase,
} from '@material-ui/core';

import { SubmitButton as SubmitButtonBase } from '../../../theme/typography';

export const DialogContent = styled(DialogContentBase)`
  && {
    min-width: 400px;
  }
`;

export const DialogTitle = styled(DialogTitleBase)`
  && {
    padding-bottom: 0;
  }
`;

export const SubmitButton = styled(SubmitButtonBase)`
  && {
    margin: 0;
  }
`;
