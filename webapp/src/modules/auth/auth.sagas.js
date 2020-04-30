import { all, put, takeLatest } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';
import { api, setAuthHeader } from '../../shared/services/api';
import history from '../../shared/utils/history';
import { ROUTES } from '../../routes/app.constants';

import { AuthTypes, AuthActions } from './auth.redux';

function* login({ email, password }) {
  yield put(AuthActions.setIsLogging(true));
  try {
    const { data: userSession } = yield api.post('/login', { email, password });
    localStorage.setItem('user', JSON.stringify(userSession));
    setAuthHeader();
    yield put(AuthActions.loginSuccess(userSession));
    history.push(ROUTES.company);
  } catch (error) {
    reportError(error);
    yield put(AuthActions.setIsLogging(false));
  }
}

function* logout() {
  try {
    yield api.post('/logout');
    history.push(ROUTES.home);
    yield put(AuthActions.logoutSuccess());
  } catch (error) {
    reportError(error);
  }
  setAuthHeader();
  localStorage.removeItem('user');
}

function* register({ user, onFinish }) {
  try {
    yield api.post('/register', user);
    onFinish();
  } catch (error) {
    reportError(error);
  }
}

export function* watchAuth() {
  yield all([
    takeLatest(AuthTypes.LOGIN, login),
    takeLatest(AuthTypes.LOGOUT, logout),
    takeLatest(AuthTypes.REGISTER, register),
  ]);
}
