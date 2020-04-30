import Immutable from 'seamless-immutable';

import { selectNotificationsDomain } from '../notifications.selectors';

describe('Notifications: selectors', () => {
  const defaultState = Immutable({
    notifications: {},
  });

  describe('selectNotificationsDomain', () => {
    it('should select a domain', () => {
      expect(selectNotificationsDomain(defaultState)).toEqual(defaultState.notifications);
    });
  });
});
