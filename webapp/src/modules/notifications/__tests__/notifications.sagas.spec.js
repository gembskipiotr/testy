import { expectSaga } from 'redux-saga-test-plan';
import Immutable from 'seamless-immutable';

import { watchNotifications } from '../notifications.sagas';
import { NotificationsActions, NotificationsTypes } from '../notifications.redux';

describe('Notifications: sagas', () => {
  const defaultState = Immutable({});

  it('should implement a test', async () => {
    await expectSaga(watchStartup)
      .withState(defaultState)
      .put(NotificationsActions.noop())
      .dispatch(StartupActions.startup())
      .silentRun();

    expect(sagaTester.getCalledActions()).to.deep.equal([NotificationsActions.noop()]);
  });
});
