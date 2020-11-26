import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { firebase } from '../firebase';

import logoDark from '../assets/logo-dark.svg';
import Dropdown from '../components/Dropdown';
import useUser from '../hooks/useUser';

function Header() {
  const { user } = useUser();
  const { push } = useHistory();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="z-10 flex-shrink-0 bg-white shadow">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-10 mx-auto">
        <Link to="/">
          <img src={logoDark} alt="logo" className="block w-32" />
        </Link>
        <nav className="flex items-center py-5 space-x-3">
          <img
            className="inline-block w-8 h-8 rounded-full shadow-sm"
            src={user.photoURL}
            alt={user.displayName + 'profile picture'}
          />
          <Dropdown
            isDropdownOpen={isDropdownOpen}
            setDropdownOpen={setDropdownOpen}
          >
            <span className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-gray-700">
                {user.displayName.split(' ')[0]}
              </span>
              <svg
                className="text-gray-400"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
              >
                <path
                  d="M7.5 10.207L11.707 6H3.293L7.5 10.207z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <div>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  push('/account');
                }}
                className="block w-full px-4 py-2 text-sm text-left cursor-pointer hover:bg-brand-red hover:text-white focus:outline-none"
                href="#"
              >
                <svg
                  className="inline mr-2"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                >
                  <path
                    clipRule="evenodd"
                    d="M10.5 3.498a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998zm2 10.992h-10v-1.996a3 3 0 013-3h4a3 3 0 013 3v1.997z"
                    stroke="currentColor"
                    strokeLinecap="square"
                  ></path>
                </svg>
                Account
              </button>
              <button
                className="block w-full px-4 py-2 text-sm text-left cursor-pointer hover:bg-brand-red hover:text-white focus:outline-none"
                onClick={() => firebase.auth().signOut()}
              >
                <svg
                  className="inline mr-2"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 1h7v1H2v11h6v1H1V1zm9.854 3.146l3.34 3.34-3.327 3.603-.734-.678L12.358 8H4V7h8.293l-2.147-2.146.708-.708z"
                    fill="currentColor"
                  ></path>
                </svg>
                Log out
              </button>
            </div>
          </Dropdown>
        </nav>
      </div>
    </header>
  );
}

export default Header;
