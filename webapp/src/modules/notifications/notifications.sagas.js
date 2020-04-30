import { all, put, takeLatest } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';
import { api } from '../../shared/services/api';

import { NotificationsTypes, NotificationsActions } from './notifications.redux';

function* getNotifications() {
  try {
    const { data } = yield api.get('/notifications');
    yield put(NotificationsActions.getNotificationsSuccess(data));
  } catch (error) {
    reportError(error);
  }
}

function* removeNotification({ notificationId }) {
  try {
    yield api.delete(`/notifications/${notificationId}`);
    yield put(NotificationsActions.removeNotificationSuccess(notificationId));
  } catch (error) {
    reportError(error);
  }
}

function* markAsRead({ notificationId }) {
  try {
    yield api.post(`/notifications/${notificationId}/read`);
    yield put(NotificationsActions.markAsReadSuccess(notificationId));
  } catch (error) {
    reportError(error);
  }
}

export function* watchNotifications() {
  yield all([
    takeLatest(NotificationsTypes.GET_NOTIFICATIONS, getNotifications),
    takeLatest(NotificationsTypes.REMOVE_NOTIFICATION, removeNotification),
    takeLatest(NotificationsTypes.MARK_AS_READ, markAsRead),
  ]);
}
