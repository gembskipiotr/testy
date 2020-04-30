import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, Button } from '@material-ui/core';

import { SubmitButton, DialogTitle, DialogContent } from './modal.styles';

export const Modal = ({ onClose, title, open, children, disabledSubmit, onSubmit }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <SubmitButton
          onClick={onSubmit}
          disabled={disabledSubmit}
        >
          Zapisz
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  disabledSubmit: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
