import { createSelector } from 'reselect';
import { prop, equals } from 'ramda';
import { selectUserId } from '../auth/auth.selectors';

export const selectCompanyDomain = prop('company');

export const selectEmployees = createSelector(
  selectCompanyDomain, prop('users'),
);

export const selectPendingEmployees = createSelector(
  selectCompanyDomain, prop('pendingUsers'),
);

export const selectFullEmployeesList = createSelector(
  selectEmployees, selectPendingEmployees,
  (employees, pendingEmployees) => {
    return employees.concat(pendingEmployees.map((employee) => ({
      ...employee,
      pending: true,
    })));
  },
);

export const selectCompanies = createSelector(
  selectCompanyDomain, prop('companies'),
);

export const selectName = createSelector(
  selectCompanyDomain, prop('name'),
);

export const selectCompanyId = createSelector(
  selectCompanyDomain, prop('_id'),
);

export const selectCreatorId = createSelector(
  selectCompanyDomain, prop('creatorId'),
);

export const selectIsCompanyAdmin = createSelector(
  selectCreatorId, selectUserId, equals,
);
