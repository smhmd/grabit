import React from 'react';
import useUser, { UserProvider } from './hooks/useUser';

export default function App() {
  return (
    <UserProvider>
      <Loader />
    </UserProvider>
  );
}

function Loader() {
  const { user } = useUser();
  return user === 'loading' ? (
    <div>loading</div>
  ) : user ? (
    <div>user</div>
  ) : (
    <div>landing page</div>
  );
}
