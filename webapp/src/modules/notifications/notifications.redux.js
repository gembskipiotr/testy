import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { pipe, prop, equals, complement } from 'ramda';

export const { Types: NotificationsTypes, Creators: NotificationsActions } = createActions(
  {
    markAsRead: ['notificationId'],
    markAsReadSuccess: ['notificationId'],
    removeNotification: ['notificationId'],
    removeNotificationSuccess: ['notificationId'],
    getNotifications: [],
    getNotificationsSuccess: ['notifications'],
  },
  { prefix: 'NOTIFICATIONS/' }
);

export const INITIAL_STATE = new Immutable({
  notificationsList: [],
});

export const removeNotificationSuccess = (state, { notificationId }) => {
  const hasId = pipe(prop('_id'), equals(notificationId));
  return state.set('notificationsList', state.notificationsList.filter(complement(hasId)));
};

export const markAsReadSuccess = (state, { notificationId }) => {
  const hasId = pipe(prop('_id'), equals(notificationId));
  const taskIndex = state.notificationsList.findIndex(hasId);

  return state.set('notificationsList', state.notificationsList.map((taskItem, index) => {
    if (index === taskIndex) {
      return taskItem.set('read', true);
    }
    return taskItem;
  }));
};

export const getNotificationsSuccess = (state, { notifications }) => {
  return state.set('notificationsList', Immutable(notifications));
};

export const reducer = createReducer(INITIAL_STATE, {
  [NotificationsTypes.REMOVE_NOTIFICATION_SUCCESS]: removeNotificationSuccess,
  [NotificationsTypes.MARK_AS_READ_SUCCESS]: markAsReadSuccess,
  [NotificationsTypes.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
});
