import React from 'react';
import useUser, { UserProvider } from './hooks/useUser';

import LoadingScreen from './components/LoadingScreen';
import User from './pages/User';
import Home from './pages/Home';

export default function App() {
  return (
    <UserProvider>
      <Loader />
    </UserProvider>
  );
}

function Loader() {
  const { user } = useUser();
  return user === 'loading' ? <LoadingScreen /> : user ? <User /> : <Home />;
}
