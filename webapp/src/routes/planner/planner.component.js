/* eslint-disable react/prop-types */
import React, { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, ListItemText } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { selectIsCompanyAdmin, selectEmployees } from '../../modules/company/company.selectors';
import { TasksActions, selectsBoards } from '../../modules/tasks';
import { renderWhenTrue } from '../../shared/utils/rendering';

import { Modal } from '../../shared/components/modal';
import { Task } from './components/task';
import { Board, Container, OrderBoard, OrderBoardHeader, OrderTitle } from './planner.styles';
import { Paragraph } from '../../theme/typography';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('To pole jest wymagane'),
  endTime: Yup.date().required('To pole jest wymagane'),
  userId: Yup.string().required('To pole jest wymagane'),
  description: Yup.string().max(255, 'Wpisz maksymalnie 255 znaków').required('To pole jest wymagane'),
});

export const Planner = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectsBoards);
  const isAdmin = useSelector(selectIsCompanyAdmin);
  const employees = useSelector(selectEmployees);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [visibleOrder, setvisibleOrder] = useState();

  const initialValues = useMemo(() => ({
    orderId: '',
    name: '',
    endTime: Date.now(),
    userId: '',
    description: '',
  }), []);

  const handleHideDialog = () => {
    setShowAddDialog(false);
  };

  const handleSubmit = useCallback((task) => {
    if (task._id) {
      dispatch(TasksActions.updateTask(task._id, task, handleHideDialog));
    } else {
      dispatch(TasksActions.createTask(task, handleHideDialog));
    }
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleShowDialog = (task) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    formik.resetForm();
    formik.setValues(task);
    setShowAddDialog(true);
  };

  const toggleOrder = (orderId) => () => setvisibleOrder(visibleOrder === orderId ? '' : orderId);

  const handleStatusChange = (fromStatus, toStatus, taskId) => {
    if (fromStatus !== toStatus) {
      dispatch(TasksActions.updateTask(taskId, { status: toStatus }));
    }
  };

  const handleRemoveTask = (event, task) => {
    dispatch(TasksActions.removeTask(task._id));
  };

  const handleEditTask = (event, task) => handleShowDialog(task)(event);

  const renderField = (props) => (
    <TextField
      margin="dense"
      fullWidth
      id="name"
      label="Nazwa"
      {...props}
      value={formik.values[props.id]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={formik.touched[props.id] && formik.errors[props.id]}
      error={formik.touched[props.id] && !!formik.errors[props.id]}
    />
  );

  const renderUserName = ({ _id, name, lastname }) => (
    <MenuItem key={name} value={_id}>
      <ListItemText primary={`${name} ${lastname}`} />
    </MenuItem>
  );

  const renderAddCompanyDialog = () => (
    <Modal
      title="Zadanie"
      onClose={handleHideDialog}
      open={showAddDialog}
      disabledSubmit={formik.isSubmitting || !formik.isValid}
      onSubmit={formik.handleSubmit}
    >
      {renderField({ id: 'name', label: 'Nazwa' })}
      {renderField({
        id: 'endTime',
        label: 'Termin',
        type: 'date',
        InputLabelProps: { shrink: true },
      })}
      {renderField({ id: 'description', label: 'Opis' })}
      <FormControl fullWidth>
        <InputLabel id="user-label">Wykonawca</InputLabel>
        <Select
          labelId="user-label"
          id="userId"
          name="userId"
          defaultValue={formik.values.userId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          disabled={!employees.length}
        >
          {employees.map(renderUserName)}
        </Select>
      </FormControl>
    </Modal>
  );

  const renderBoard = ({ name, _id, lanes }) => {
    const customComponents = {
      Card: (props) => (
        <Task
          {...props}
          onRemoveClick={handleRemoveTask}
          onEditClick={handleEditTask}
        />
      ),
    };
    return (
      <OrderBoard key={_id}>
        <OrderBoardHeader>
          <OrderTitle onClick={toggleOrder(_id)}>{name}</OrderTitle>
          {isAdmin && visibleOrder === _id && (
            <Button color="primary" onClick={handleShowDialog({ orderId: _id })}>
              Dodaj zadanie
            </Button>
          )}
        </OrderBoardHeader>
        {visibleOrder === _id && (
          <Board
            key={_id}
            data={{ lanes }}
            components={customComponents}
            cardDraggable
            laneDraggable={false}
            onCardMoveAcrossLanes={handleStatusChange}
          />
        )}
      </OrderBoard>
    );
  };

  const renderEmptyState = renderWhenTrue(() => (
    <Paragraph>Brak aktywnych zleceń</Paragraph>
  ));

  return (
    <Container>
      {boards.map(renderBoard)}
      {renderEmptyState(!boards.length)}
      {renderAddCompanyDialog()}
    </Container>
  );
};

