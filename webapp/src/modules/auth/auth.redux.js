import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types: AuthTypes, Creators: AuthActions } = createActions(
  {
    login: ['email', 'password'],
    loginSuccess: ['user'],
    logoutSuccess: [],
    register: ['user', 'onFinish'],
    setIsLogging: ['isLogging'],
    logout: [],
  },
  { prefix: 'AUTH/' }
);

export const INITIAL_STATE = new Immutable({
  isLogging: false,
  ...JSON.parse(localStorage.getItem('user')),
});

const setIsLogging = (state, { isLogging }) => state.set('isLogging', isLogging);

const loginSuccess = (state, { user }) => state.merge({ ...user, isLogging: false });

const logoutSuccess = () => new Immutable({
  isLogging: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [AuthTypes.SET_IS_LOGGING]: setIsLogging,
});
