import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import useUser, { UserProvider } from './hooks/useUser';

import LoadingScreen from './components/LoadingScreen';
import User from './pages/User';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Route path="/">
          <Loader />
        </Route>
      </UserProvider>
    </BrowserRouter>
  );
}

function Loader() {
  const { user } = useUser();
  return user === 'loading' ? <LoadingScreen /> : user ? <User /> : <Home />;
}
