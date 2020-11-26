import React from 'react';

import {
  render,
  cleanup,
  screen,
  fakeUser,
  initialUser,
  waitFor,
} from '../../test-utils';
import AccountModal from '../User/AccountModal';
import userEvent from '@testing-library/user-event';
import { clearFirestoreData } from '@firebase/rules-unit-testing';

const projectId = 'gemo-grabit';

afterEach(async () => {
  cleanup();
  await clearFirestoreData({ projectId });
});

let updatedUser = fakeUser();

test('<AccountModal /> should update user name', async () => {
  render(<AccountModal />, { path: '/account' });

  const submitButton = screen.getByRole('button', { name: /update/i });
  const nameInput = screen.getByPlaceholderText(initialUser.displayName);

  userEvent.type(nameInput, updatedUser.displayName);
  userEvent.click(submitButton);

  waitFor(
    () => screen.getByPlaceholderText(updatedUser.displayName),
    // expect(nameInput).toHaveAttribute('placeholder', updatedUser.displayName),
  );
});

updatedUser = {
  displayName: 'Adam',
  photoURL: 'photo.png',
  uid: 'testing-uid',
};

test('<AccountModal /> should not update user name if no input is given', async () => {
  render(<AccountModal />, { path: '/account' });
  const submitButton = screen.getByRole('button', { name: /update/i });
  const nameInput = screen.getByPlaceholderText(updatedUser.displayName);
  userEvent.click(submitButton);
  expect(nameInput).toHaveAttribute('placeholder', updatedUser.displayName);
});
