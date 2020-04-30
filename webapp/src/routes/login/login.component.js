import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { TextField, Typography } from '@material-ui/core';

import { SubmitButton } from '../../theme/typography';
import { Container } from './login.styles';
import { AuthActions } from '../../modules/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Wprowadź poprawny adres email').required('To pole jest wymagane'),
  password: Yup.string().required('To pole jest wymagane'),
});

export const Login = () => {
  const initialValues = useMemo(() => ({
    email: '',
    password: '',
  }), []);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(({ email, password }) => {
    dispatch(AuthActions.login(email, password));
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <Container>
      <Typography variant="h5">Logowanie</Typography>
      <form>
        <TextField
          margin="dense"
          fullWidth
          id="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && !!formik.errors.email}
        />
        <TextField
          margin="dense"
          fullWidth
          id="password"
          label="Hasło"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && !!formik.errors.password}
          type="password"
        />

        <SubmitButton
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Zaloguj się
        </SubmitButton>
      </form>
    </Container>
  );
};

Login.propTypes = {};
