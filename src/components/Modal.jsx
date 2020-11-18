import React from 'react';
import ReactDOM from 'react-dom';
import { Route, useHistory } from 'react-router-dom';

export default function Modal({ path, children, title }) {
  const { push } = useHistory();
  return ReactDOM.createPortal(
    <Route path={path}>
      <div // overlay
        onClick={(e) => e.target === e.currentTarget && push('/')}
        aria-hidden="true"
        className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div // wrapper
          aria-modal
          role="dialog"
          className="fixed inset-x-0 bottom-0 max-h-screen overflow-hidden bg-white rounded shadow-md cursor-auto sm:static sm:mb-0"
        >
          <h2 // title
            className="p-8 space-y-3 text-2xl font-bold text-gray-800 capitalize bg-gray-100 border-b sm:px-24 sm:py-4"
          >
            {title}
          </h2>
          <div // content
            className="flex flex-col p-8 space-y-3 sm:px-24 sm:py-8"
          >
            {children}
          </div>
        </div>
      </div>
    </Route>,
    document.body,
  );
}
