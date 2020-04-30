import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const selectAuthDomain = prop('auth');

export const selectUserId = createSelector(
  selectAuthDomain, prop('_id'),
);
