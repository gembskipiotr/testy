import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { App } from './app.component';
import { Home } from './home';
import { NotFound } from './notFound';
import { ROUTES } from './app.constants';
import { Register } from './register';
import { Login } from './login';
import { About } from './about';
import { Planner } from './planner';
import { Company } from './company';
import { PrivateRoute } from '../shared/components/privateRoute';

export default () => {
  return (
    <App>
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />
        <PrivateRoute exact path={ROUTES.planner} component={Planner} />
        <PrivateRoute path={ROUTES.company} component={Company} />
        <Route exact path={ROUTES.register} component={Register} />
        <Route exact path={ROUTES.login} component={Login} />
        <Route exact path={ROUTES.about} component={About} />

        <Route component={NotFound} />
      </Switch>
    </App>
  );
};
