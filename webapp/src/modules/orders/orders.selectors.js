import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const selectOrdersDomain = prop('orders');

export const selectOrders = createSelector(
  selectOrdersDomain, prop('ordersList')
);
