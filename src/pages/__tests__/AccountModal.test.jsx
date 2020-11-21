import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, cleanup, screen } from '@testing-library/react';
import AccountModal from '../User/AccountModal';

jest.mock('../../hooks/useUser', () => {
  const userObject = {
    user: {
      displayName: 'Adam',
      photoURL: 'photo.png',
    },
    setUser: jest.fn(() => {}),
    usertype: 'drivers',
  };

  return () => userObject;
});

afterEach(cleanup);

test("<AccountModal /> shouldn't render on urls other than /account", () => {
  const { baseElement } = render(
    <MemoryRouter initialEntries={['/request']}>
      <AccountModal />
    </MemoryRouter>,
  );
  expect(baseElement).toMatchSnapshot();
});

test('<AccountModal /> renders', () => {
  render(
    <MemoryRouter initialEntries={['/account']}>
      <AccountModal />
    </MemoryRouter>,
  );
  // debug();
  const nameInput = screen.getByLabelText('Update your name');
  expect(nameInput.placeholder).toBe('Adam');
});
