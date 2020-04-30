import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { ResponsiveThemeProvider as ThemeProvider } from '../shared/components/responsiveThemeProvider';

import { GlobalStyle } from '../theme/global';
import { selectUserId } from '../modules/auth';
import { OrdersActions } from '../modules/orders';
import { CompanyActions } from '../modules/company';
import { StartupActions } from '../modules/startup';
import { TasksActions } from '../modules/tasks';
import { NotificationsActions } from '../modules/notifications';
import initializeFontFace from '../theme/initializeFontFace';
import theme from '../theme/theme';
import { Menu } from '../shared/components/menu';
import { Content } from './app.styles';

export const App = ({ children }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(StartupActions.startup());
    initializeFontFace();
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(CompanyActions.fetchInitialData());
      dispatch(OrdersActions.getOrders());
      dispatch(TasksActions.getTasks());
      dispatch(NotificationsActions.getNotifications());
      setInterval(() => {
        dispatch(NotificationsActions.getNotifications());
      }, 30 * 1000);
    }
  }, [userId]);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet titleTemplate={'%s - Task planner'} />

        <GlobalStyle />
        <Menu />
        <Content>{React.Children.only(children)}</Content>
      </Fragment>
    </ThemeProvider>
  );
};

App.propTypes = {
  children: PropTypes.node,
};
