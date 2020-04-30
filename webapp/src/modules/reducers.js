import { combineReducers } from 'redux';

import { reducer as startupReducer } from './startup/startup.redux';
import { reducer as companyReducer } from './company/company.redux';
import { reducer as authReducer } from './auth/auth.redux';
import { reducer as ordersReducer } from './orders/orders.redux';
import { reducer as tasksReducer } from './tasks/tasks.redux';
import { reducer as notificationsReducer } from './notifications/notifications.redux';
//<-- IMPORT MODULE REDUCER -->

export default function createReducer() {
  return combineReducers({
    startup: startupReducer,
    company: companyReducer,
    auth: authReducer,
    orders: ordersReducer,
    tasks: tasksReducer,
    notifications: notificationsReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
