import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectFullEmployeesList, selectIsCompanyAdmin } from '../../modules/company/company.selectors';
import { selectUserId } from '../../modules/auth/auth.selectors';
import { CompanyActions } from '../../modules/company';
import { ExtendedList } from '../../shared/components/extendedList';
import { Container, Employee, Name, Details, Detail, BasicData, ActionButton, Actions } from './employees.styles';

export const Employees = () => {
  const employees = useSelector(selectFullEmployeesList);
  const isAdmin = useSelector(selectIsCompanyAdmin);
  const currentUserId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleAccept = (employeeId) => () => {
    dispatch(CompanyActions.accept(employeeId));
  };
  const handleDelete = (employeeId) => () => {
    dispatch(CompanyActions.leave(employeeId));
  };

  // eslint-disable-next-line react/prop-types
  const renderListItem = ({ _id, name, lastname, email, pending }) => {
    return (
      <Employee>
        <BasicData>
          <Name>{name} {lastname}</Name>
          <Details>
            <Detail>{email}</Detail>
          </Details>
        </BasicData>
        <Actions>
          {pending && isAdmin && (
            <ActionButton onClick={handleAccept(_id)}>
              Akceptuj
            </ActionButton>
          )}
          {(isAdmin || currentUserId === _id) && (
            <ActionButton onClick={handleDelete(_id)}>
              { isAdmin ? 'Usuń' : 'Opuść' }
            </ActionButton>
          )}
        </Actions>
      </Employee>
    );
  };

  return (
    <Container>
      <ExtendedList
        data={employees}
        renderItem={renderListItem}
      />
    </Container>
  );
};
