/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

import { renderWhenTrue } from '../../shared/utils/rendering';
import { Paragraph } from '../../theme/typography';
import { NotificationsActions, selectNotifications } from '../../modules/notifications';
import { Container, Notification, Actions, IconButton, Text, Content, DateTime } from './notifications.styles';

export const Notifications = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();

  const handleMarkAsReadClick = (notificationId) => () => {
    dispatch(NotificationsActions.markAsRead(notificationId));
  };

  const handleRemoveClick = (notificationId) => () => {
    dispatch(NotificationsActions.removeNotification(notificationId));
  };

  const renderNotification = ({ _id, createdAt, read, message }) => (
    <Notification key={_id} read={read}>
      <Content>
        <Text>{message}</Text>
        <DateTime>{dayjs(createdAt).format('DD.MM.YYYY HH:mm')}</DateTime>
      </Content>
      <Actions>
        { !read && (
          <IconButton onClick={handleMarkAsReadClick(_id)}>
            <CheckIcon />
          </IconButton>
        )}
        <IconButton onClick={handleRemoveClick(_id)}>
          <DeleteIcon />
        </IconButton>
      </Actions>
    </Notification>
  );

  const renderEmptyState = renderWhenTrue(() => (
    <Paragraph>Brak powiadomień</Paragraph>
  ));

  return (
    <Container>
      {notifications.map(renderNotification)}
      {renderEmptyState(!notifications.length)}
    </Container>
  );
};
