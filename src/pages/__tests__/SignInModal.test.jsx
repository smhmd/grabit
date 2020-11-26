import React from 'react';
import { render, cleanup, screen } from '../../test-utils';
import SignInModal from '../Home/SignInModal';
import userEvent from '@testing-library/user-event';

import * as u from '../../hooks/useUser';

afterEach(cleanup);

const authenticate = jest.spyOn(u, 'authenticate');

test('<SignInModal /> should render sign up view in /signup route', () => {
  render(<SignInModal />, { path: '/signup/drivers' });
  expect(screen.getByTestId('modal-title').textContent).toMatchInlineSnapshot(
    `"Hello there! 👋"`,
  );
});

test('<SignInModal /> should render login view in /login route', () => {
  render(<SignInModal />, { path: '/login' });
  expect(screen.getByTestId('modal-title').textContent).toMatchInlineSnapshot(
    `"Welcome back! 🎉"`,
  );
});

test('<SignInModal /> should log user in', () => {
  render(<SignInModal />, { path: '/login' });
  const singInButton = screen.getByRole('button', {
    name: /continue with facebook/i,
  });
  userEvent.click(singInButton);
  expect(authenticate).toHaveBeenCalledTimes(1);
});

test('<SignInModal /> should change usertype', () => {
  render(<SignInModal />, { path: '/login', initialUsertype: 'drivers' });
  const customersRadio = screen.getByRole('radio', { name: /customers/i });
  const driversRadio = screen.getByRole('radio', { name: /drivers/i });

  expect(driversRadio).toBeChecked();
  userEvent.click(customersRadio);
  expect(driversRadio).not.toBeChecked();
  expect(customersRadio).toBeChecked();
});

test('<SignInModal /> should unmount on cancel button click', () => {
  const { baseElement } = render(<SignInModal />, { path: '/login' });

  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  userEvent.click(cancelButton);

  expect(baseElement.outerHTML).toBe('<body><div></div></body>');
});
