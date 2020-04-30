import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { selectUserId } from '../../modules/auth/auth.selectors';
import { selectCompanies, CompanyActions } from '../../modules/company';
import { ExtendedList } from '../../shared/components/extendedList';
import { Modal } from '../../shared/components/modal';
import { Paragraph } from '../../theme/typography';
import { Container, CompanyItem, Name, ActionButton } from './companyList.styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('To pole jest wymagane'),
});

export const CompanyList = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanies);
  const userId = useSelector(selectUserId);
  const initialValues = useMemo(() => ({
    name: '',
  }), []);

  const handleHideDialog = useCallback(() => setShowAddDialog(false), []);

  const handleSubmit = useCallback(({ name }) => {
    dispatch(CompanyActions.create(name, handleHideDialog));
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleShowDialog = useCallback(() => setShowAddDialog(true), []);

  const handleJoin = (companyId) => () => dispatch(CompanyActions.join(companyId));

  // eslint-disable-next-line react/prop-types
  const renderListItem = ({ _id, name, pendingUsers }) => {
    const isPending = pendingUsers.includes(userId);
    return (
      <CompanyItem>
        <Name>{name}</Name>
        {isPending && (<Paragraph>Oczekuje na akceptację</Paragraph>)}
        {!isPending && (<ActionButton onClick={handleJoin(_id)}>Dołącz</ActionButton>)}
      </CompanyItem>
    );
  };

  const renderAddCompanyDialog = () => (
    <Modal
      title="Nowa firma"
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
    </Modal>
  );

  return (
    <Container>
      <ExtendedList
        data={companies}
        renderItem={renderListItem}
        onAddClick={handleShowDialog}
      />
      {renderAddCompanyDialog()}
    </Container>
  );
};
