import Immutable from 'seamless-immutable';

import { reducer as notificationsReducer, NotificationsActions, NotificationsTypes } from '../notifications.redux';

describe('Notifications: redux', () => {
  const defaultState = Immutable({});

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(notificationsReducer(undefined, {})).toEqual(defaultState);
    });

    it('should return state on unknown action', () => {
      expect(notificationsReducer(defaultState, { type: 'unknown-action' })).toEqual(defaultState);
    });
  });
});
