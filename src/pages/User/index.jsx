import React from 'react';
import { Route } from 'react-router-dom';

import useUser from '../../hooks/useUser';

import Header from '../../components/Header';

import Navbar from './Navbar';
import AccountModal from './AccountModal';
import Customer from './Customer';
import Driver from './Driver';

export default function User() {
  const { usertype } = useUser();
  return (
    <div className="flex flex-col h-screen bg-opacity-25 bg-brand-blue">
      <Header />
      <div className="flex flex-col flex-1 overflow-hidden sm:flex-row">
        <div className="order-2 overflow-y-auto bg-white shadow sm:order-none sm:w-48 sm:block">
          <Navbar />
        </div>
        <div className="flex flex-col flex-1 h-full col-span-2 px-8 py-6 space-y-4 overflow-y-scroll User">
          <Route path="/">
            {usertype === 'customers' ? <Customer /> : <Driver />}
          </Route>
        </div>
        <div className="flex-shrink hidden w-64 bg-white shadow md:block"></div>
      </div>
      <AccountModal />
    </div>
  );
}
