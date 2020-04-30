import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from '@material-ui/core';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCompanies, selectName } from '../../modules/company';
import { renderWhenTrue } from '../../shared/utils/rendering';

import { CompanyList } from '../companyList';
import { ROUTES } from '../app.constants';
import { Container, Content } from './company.styles';
import { Employees } from '../employees';
import { Orders } from '../orders';
import { Notifications } from '../notifications';

const MenuItems = [{
  label: 'Pracownicy',
  url: ROUTES.employees,
}, {
  label: 'Zlecenia',
  url: ROUTES.orders,
}, {
  label: 'Powiadomienia',
  url: ROUTES.notifications,
}];

export const Company = ({ match }) => {
  const companies = useSelector(selectCompanies);
  const companyName = useSelector(selectName);
  const history = useHistory();

  const renderCompanies = renderWhenTrue(() => <CompanyList />);

  const renderCompany = renderWhenTrue(() => (
    <>
      <List>
        {MenuItems.map(({ label, url }) => (
          <ListItem
            key={url}
            button
            onClick={() => history.push(`${match.url}${url}`)}
          >
            {label}
          </ListItem>
        ))}
      </List>
      <Content>
        <Switch>
          <Route path={`${match.url}${ROUTES.employees}`} component={Employees} />
          <Route path={`${match.url}${ROUTES.orders}`} component={Orders} />
          <Route path={`${match.url}${ROUTES.notifications}`} component={Notifications} />
          <Redirect to={`${match.url}${ROUTES.employees}`} />
        </Switch>
      </Content>
    </>
  ));

  return (
    <Container>
      {renderCompanies(!!(companies.length || !companyName))}
      {renderCompany(!!companyName)}
    </Container>
  );
};

Company.propTypes = {
  match: PropTypes.any,
};
