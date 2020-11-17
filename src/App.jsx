import React from 'react';
import useUser, { UserProvider } from './hooks/useUser';

import LoadingScreen from './components/LoadingScreen';

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
    <LoadingScreen />
  ) : user ? (
    <div>user</div>
  ) : (
    <div>landing page</div>
  );
}
