import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { equals, complement, prop, pipe } from 'ramda';

export const { Types: CompanyTypes, Creators: CompanyActions } = createActions(
  {
    fetchInitialData: [],
    fetchInitialDataSuccess: ['companyData'],
    create: ['name', 'onFinish'],
    createSuccess: ['companyData'],
    join: ['companyId'],
    joinSuccess: ['companyId', 'userId'],
    accept: ['userId'],
    acceptSuccess: ['userId'],
    leave: ['userId'],
    leaveSuccess: ['userId'],
    reset: [],
  },
  { prefix: 'COMPANY/' }
);

export const INITIAL_STATE = new Immutable({
  users: [],
  pendingUsers: [],
  companies: [],
  orders: [],
});

export const fetchInitialDataSuccess = (state, { companyData }) => {
  return INITIAL_STATE.merge(companyData);
};

export const createSuccess = (state, { companyData }) => {
  return INITIAL_STATE.merge({ ...companyData, companies: [] });
};

export const joinSuccess = (state, { companyId, userId }) => {
  const updatedCompanies = state.companies.map((company) => {
    if (company._id === companyId) {
      return company.set('pendingUsers', company.pendingUsers.concat(userId));
    }
    return company;
  });

  return state.set('companies', updatedCompanies);
};

export const acceptSuccess = (state, { userId }) => {
  const hasId = pipe(prop('_id'), equals(userId));
  const userData = state.pendingUsers.find(hasId);
  return state.set('users', state.users.concat(userData))
    .set('pendingUsers', state.pendingUsers.filter(complement(hasId)));
};

export const leaveSuccess = (state, { userId }) => {
  const hasId = pipe(prop('_id'), equals(userId));
  return state.set('users', state.users.filter(complement(hasId)))
    .set('pendingUsers', state.pendingUsers.filter(complement(hasId)));
};

export const reducer = createReducer(INITIAL_STATE, {
  [CompanyTypes.FETCH_INITIAL_DATA_SUCCESS]: fetchInitialDataSuccess,
  [CompanyTypes.CREATE_SUCCESS]: createSuccess,
  [CompanyTypes.JOIN_SUCCESS]: joinSuccess,
  [CompanyTypes.ACCEPT_SUCCESS]: acceptSuccess,
  [CompanyTypes.LEAVE_SUCCESS]: leaveSuccess,
});
