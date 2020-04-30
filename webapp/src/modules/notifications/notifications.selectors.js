import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const selectNotificationsDomain = prop('notifications');

export const selectNotifications = createSelector(
  selectNotificationsDomain, prop('notificationsList')
);

export const selectNotificationsCouter = createSelector(
  selectNotifications, (notifications) => {
    return notifications.filter(({ read }) => read).length;
  }
);
