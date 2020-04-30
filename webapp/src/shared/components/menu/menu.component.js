import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { AuthActions, selectUserId } from '../../../modules/auth';
import { renderWhenTrue } from '../../utils/rendering';
import { ROUTES } from '../../../routes/app.constants';
import { Divider } from './menu.styles';

const Url = (props) => (
  <Button component={Link} color="inherit" {...props} />
);

export const Menu = () => {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(AuthActions.logout()), []);

  const renderPublicUrls = () => (
    <>
      <Url to={ROUTES.home}>Start</Url>
      <Url to={ROUTES.about}>O nas</Url>
    </>
  );


  const renderAuthUrls = renderWhenTrue(() => (
    <>
      <Url to={ROUTES.login}>Zaloguj się</Url>
      <Url to={ROUTES.register}>Zarejestruj się</Url>
    </>
  ));

  const renderUserUrls = renderWhenTrue(() => (
    <>
      <Url to={ROUTES.company}>Twoja firma</Url>
      <Url to={ROUTES.planner}>Planner</Url>
      <Button color="inherit" onClick={handleLogout}>Wyloguj sie</Button>
    </>
  ));

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">Task planner</Typography>
      </Toolbar>
      <Toolbar>
        {renderPublicUrls()}
        <Divider />
        {renderAuthUrls(!userId)}
        {renderUserUrls(!!userId)}
      </Toolbar>
    </AppBar>
  );
};

Menu.propTypes = {};
