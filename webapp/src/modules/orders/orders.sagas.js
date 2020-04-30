import { all, put, takeLatest, select } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';
import { api } from '../../shared/services/api';

import { selectCompanyId } from '../company/company.selectors';
import { selectUserId } from '../auth/auth.selectors';
import { OrdersTypes, OrdersActions } from './orders.redux';

function* getOrders() {
  try {
    const { data } = yield api.get('/orders');
    yield put(OrdersActions.getOrdersSuccess(data));
  } catch (error) {
    reportError(error);
  }
}

function* createOrder({ name, users, onFinish }) {
  try {
    const userId = yield select(selectUserId);
    const companyId = yield select(selectCompanyId);
    const { data } = yield api.post('/orders', { name, creatorId: userId, companyId, users });
    yield put(OrdersActions.createOrderSuccess(data));
    onFinish();
  } catch (error) {
    reportError(error);
  }
}

function* removeOrder({ orderId }) {
  try {
    yield api.delete(`/orders/${orderId}`);
    yield put(OrdersActions.removeOrderSuccess(orderId));
  } catch (error) {
    reportError(error);
  }
}

function* updateOrder({ orderId, name, users, onFinish }) {
  try {
    const { data } = yield api.put(`/orders/${orderId}`, { name, users });
    yield put(OrdersActions.updateOrderSuccess(data));
    onFinish();
  } catch (error) {
    reportError(error);
  }
}

export function* watchOrders() {
  yield all([
    takeLatest(OrdersTypes.GET_ORDERS, getOrders),
    takeLatest(OrdersTypes.CREATE_ORDER, createOrder),
    takeLatest(OrdersTypes.REMOVE_ORDER, removeOrder),
    takeLatest(OrdersTypes.UPDATE_ORDER, updateOrder),
  ]);
}
