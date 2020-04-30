import { all, put, takeLatest, select } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';

import { CompanyTypes, CompanyActions } from './company.redux';
import { selectUserId } from '../auth/auth.selectors';
import { api } from '../../shared/services/api';
import { selectCompanyId } from './company.selectors';

function* fetchInitialData() {
  try {
    const { data: initialData } = yield api.get('/companies');
    yield put(CompanyActions.fetchInitialDataSuccess(initialData));
  } catch (error) {
    reportError(error);
  }
}

function* create({ name, onFinish }) {
  try {
    const { data } = yield api.post('/companies', { name });
    yield put(CompanyActions.createSuccess(data));
    onFinish();
  } catch (error) {
    reportError(error);
  }
}

function* join({ companyId }) {
  try {
    const userId = yield select(selectUserId);
    yield api.post(`/companies/${companyId}/join`);
    yield put(CompanyActions.joinSuccess(companyId, userId));
  } catch (error) {
    reportError(error);
  }
}

function* accept({ userId }) {
  try {
    const companyId = yield select(selectCompanyId);
    yield api.post(`/companies/${companyId}/accept`, { userId });
    yield put(CompanyActions.acceptSuccess(userId));
  } catch (error) {
    reportError(error);
  }
}

function* leave({ userId }) {
  try {
    const companyId = yield select(selectCompanyId);
    yield api.delete(`/companies/${companyId}/${userId}`);
    yield put(CompanyActions.leaveSuccess(userId));
  } catch (error) {
    reportError(error);
  }
}

export function* watchCompany() {
  yield all([
    takeLatest(CompanyTypes.FETCH_INITIAL_DATA, fetchInitialData),
    takeLatest(CompanyTypes.CREATE, create),
    takeLatest(CompanyTypes.JOIN, join),
    takeLatest(CompanyTypes.ACCEPT, accept),
    takeLatest(CompanyTypes.LEAVE, leave),
  ]);
}
