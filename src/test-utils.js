import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from './hooks/useUser';
import faker from 'faker';
import { render as rtlrender } from '@testing-library/react';

const fakeUser = () => ({
  displayName: faker.internet.userName(),
  photoURL: faker.image.avatar(),
  uid: faker.random.uuid(),
});

const initialUser = {
  displayName: 'Adam',
  photoURL: 'photo.png',
  uid: 'testing-uid',
};

// function render(ui, options = {}, p = '/') {
function render(
  ui,
  { path = '/', initialUsertype = 'drivers', ...options } = {},
) {
  const Wrapper = ({ children }) => {
    const [user, setUser] = useState(initialUser);
    const [usertype, setUsertype] = useState(initialUsertype);
    return (
      <MemoryRouter initialEntries={[path]}>
        <UserContext.Provider value={{ user, setUser, usertype, setUsertype }}>
          {children}
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  return rtlrender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { render, fakeUser, initialUser };
