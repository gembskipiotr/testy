import React, { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { TextField, Typography } from '@material-ui/core';

import { SubmitButton } from '../../theme/typography';
import { Container } from './register.styles';
import { AuthActions } from '../../modules/auth';
import { ROUTES } from '../app.constants';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('To pole jest wymagane'),
  lastname: Yup.string().required('To pole jest wymagane'),
  email: Yup.string().email('Wprowadź poprawny adres email').required('To pole jest wymagane'),
  emailRepeat: Yup.string()
    .oneOf([Yup.ref('email'), null], 'Adresy email muszą się zgadzać').required('To pole jest wymagane'),
  password: Yup.string().required('To pole jest wymagane'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać').required('To pole jest wymagane'),
});

export const Register = () => {
  const initialValues = useMemo(() => ({
    name: '',
    lastname: '',
    email: '',
    emailRepeat: '',
    password: '',
    passwordRepeat: '',
  }), []);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = useCallback((values) => {
    dispatch(AuthActions.register(values, () => {
      history.push(ROUTES.login);
    }));
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <Container>
      <Typography variant="h5">Rejestracja</Typography>
      <form>
        <TextField
          margin="dense"
          autoFocus
          fullWidth
          id="name"
          label="Imię"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.name && formik.errors.name}
          error={formik.touched.name && !!formik.errors.name}
        />
        <TextField
          margin="dense"
          fullWidth
          id="lastname"
          label="Nazwisko"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.lastname && formik.errors.lastname}
          error={formik.touched.lastname && !!formik.errors.lastname}
        />
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
          id="emailRepeat"
          label="Powtórz email"
          value={formik.values.emailRepeat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.emailRepeat && formik.errors.emailRepeat}
          error={formik.touched.emailRepeat && !!formik.errors.emailRepeat}
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
        <TextField
          margin="dense"
          fullWidth
          id="passwordRepeat"
          label="Powtórz hasło"
          value={formik.values.passwordRepeat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
          error={formik.touched.passwordRepeat && !!formik.errors.passwordRepeat}
          type="password"
        />

        <SubmitButton
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Utwórz konto
        </SubmitButton>
      </form>
    </Container>
  );
};
