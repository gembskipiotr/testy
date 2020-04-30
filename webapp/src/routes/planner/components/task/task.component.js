import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { selectIsCompanyAdmin } from '../../../../modules/company/company.selectors';
import { renderWhenTrue } from '../../../../shared/utils/rendering';

import {
  Actions,
  Container,
  Title,
  Description,
  Deadline,
  Owner,
  IconButton,
} from './task.styles';

export const Task = memo((props) => {
  const { title, description, label, metadata, onEditClick, onRemoveClick } = props;
  const isAdmin = useSelector(selectIsCompanyAdmin);

  const handleEditClick = useCallback((event) => onEditClick(event, metadata), [metadata]);
  const handleRemoveClick = useCallback((event) => onRemoveClick(event, metadata), [metadata]);

  const renderActions = renderWhenTrue(() => (
    <Actions>
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleRemoveClick}>
        <DeleteIcon />
      </IconButton>
    </Actions>
  ));
  return (
    <Container>
      {renderActions(isAdmin)}
      <Title>{title}</Title>
      <Deadline>Termin: {label}</Deadline>
      <Description>{description}</Description>
      <Owner>Wykonawca: {metadata.userName}</Owner>
    </Container>
  );
});

Task.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  metadata: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }),
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};
