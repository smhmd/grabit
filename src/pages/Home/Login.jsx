import React from 'react';
import useUser from '../../hooks/useUser';

export default function Login({ type, children }) {
  const { setUsertype } = useUser();
  return (
    <div
      role="button"
      onClick={() => {
        setUsertype(type);
      }}
      className="flex-col w-full p-8 whitespace-no-wrap border border-white rounded md:flex md:space-y-5"
    >
      {children}
      <div className="flex items-center justify-between">
        <span>Register as a {type.slice(0, -1)}</span>
        <svg
          className="inline w-4 h-4 text-white fill-current md:ml-16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8-8-8z" />
        </svg>
      </div>
    </div>
  );
}
