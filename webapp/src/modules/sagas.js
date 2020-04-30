import { all, fork } from 'redux-saga/effects';

import reportError from '../shared/utils/reportError';
import { watchStartup } from './startup/startup.sagas';
import { watchCompany } from './company/company.sagas';
import { watchAuth } from './auth/auth.sagas';
import { watchOrders } from './orders/orders.sagas';
import { watchTasks } from './tasks/tasks.sagas';
import { watchNotifications } from './notifications/notifications.sagas';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  try {
    yield all([
      fork(watchStartup),
      fork(watchCompany),
      fork(watchAuth),
      fork(watchOrders),
      fork(watchTasks),
      fork(watchNotifications),
      //<-- INJECT MODULE SAGA -->
    ]);
  } catch (e) {
    yield reportError(e);
  }
}
