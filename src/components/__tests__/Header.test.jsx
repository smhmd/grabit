import React from 'react';
import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { firebase } from '../../firebase';

import Header from '../Header';

jest.mock('../../firebase');

test('<Header /> should have account button', () => {
  render(<Header />);

  const dropdownButton = screen.getByTestId('dropdown-button');
  userEvent.click(dropdownButton);
  const accountButton = screen.getByRole('button', { name: /account/i });
  userEvent.click(accountButton);
  expect(accountButton).not.toBeInTheDocument();
});

test('<Header /> should sign out', () => {
  render(<Header />);
  firebase.auth = jest.fn().mockReturnThis();
  firebase.signOut = jest.fn();

  const dropdownButton = screen.getByTestId('dropdown-button');
  userEvent.click(dropdownButton);
  const logoutButton = screen.getByRole('button', { name: /log out/i });
  userEvent.click(logoutButton);

  expect(firebase.auth().signOut).toHaveBeenCalledTimes(1);
});
