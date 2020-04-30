/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, FormControl, InputLabel, Select, Chip, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import { OrdersActions, selectOrders } from '../../modules/orders';
import { selectIsCompanyAdmin, selectEmployees } from '../../modules/company/company.selectors';
import { ExtendedList } from '../../shared/components/extendedList';
import { Modal } from '../../shared/components/modal/modal.component';
import { Container, Order, Name, Actions, ActionButton, Details, Detail, BasicData } from './orders.styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('To pole jest wymagane'),
  users: Yup.array(),
});

export const Orders = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const employees = useSelector(selectEmployees);
  const isAdmin = useSelector(selectIsCompanyAdmin);
  const initialValues = useMemo(() => ({
    _id: '',
    name: '',
    users: [],
  }), []);

  const handleSubmit = useCallback(({ _id, name, users }) => {
    if (_id) {
      dispatch(OrdersActions.updateOrder(_id, name, users, handleHideDialog));
    } else {
      dispatch(OrdersActions.createOrder(name, users, handleHideDialog));
    }
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleShowDialog = useCallback(() => setShowAddDialog(true), []);
  const handleHideDialog = useCallback(() => {
    formik.resetForm();
    setShowAddDialog(false);
  }, []);

  const handleRemove = (orderId) => () => dispatch(OrdersActions.removeOrder(orderId));
  const handleEdit = (order) => () => {
    formik.setValues({
      _id: order._id,
      name: order.name,
      users: order.users,
    });
    handleShowDialog();
  };

  // eslint-disable-next-line react/prop-types
  const renderListItem = (order) => {
    const { _id, name, createdAt } = order;
    return (
      <Order>
        <BasicData>
          <Name>{name}</Name>
          <Details>
            <Detail>Data utworzenia: {dayjs(createdAt).format('DD.MM.YYYY [o] HH:mm')}</Detail>
          </Details>
        </BasicData>
        {isAdmin && (
          <Actions>
            <ActionButton onClick={handleEdit(order)}>Edytuj</ActionButton>
            <ActionButton onClick={handleRemove(_id)}>Usuń</ActionButton>
          </Actions>
        )}
      </Order>
    );
  };

  const renderValue = (selected) => {
    return employees.reduce((chips, { _id, name, lastname }) => {
      if (selected.includes(_id)) {
        chips.push(<Chip key={_id} label={`${name} ${lastname}`} />);
      }
      return chips;
    }, []);
  };

  const renderUserName = ({ _id, name, lastname }) => (
    <MenuItem key={name} value={_id}>
      <Checkbox checked={formik.values.users.includes(_id)} />
      <ListItemText primary={`${name} ${lastname}`} />
    </MenuItem>
  );

  const renderAddCompanyDialog = () => (
    <Modal
      title="Nowe zlecenie"
      onClose={handleHideDialog}
      open={showAddDialog}
      disabledSubmit={formik.isSubmitting || !formik.isValid}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        margin="dense"
        fullWidth
        id="name"
        label="Nazwa"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.name && formik.errors.name}
        error={formik.touched.name && !!formik.errors.name}
      />
      <FormControl fullWidth>
        <InputLabel id="users-label">Przypisani pracownicy</InputLabel>
        <Select
          labelId="users-label"
          id="users"
          name="users"
          multiple
          disabled={!employees.length}
          value={formik.values.users}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          renderValue={renderValue}
        >
          {employees.map(renderUserName)}
        </Select>
      </FormControl>
    </Modal>
  );

  return (
    <Container>
      <ExtendedList
        data={orders}
        onAddClick={isAdmin ? handleShowDialog : null}
        renderItem={renderListItem}
      />
      {renderAddCompanyDialog()}
    </Container>
  );
};
