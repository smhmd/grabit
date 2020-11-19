import React from 'react';
import { Link } from 'react-router-dom';

import useUser from '../../../hooks/useUser';
import RequestModal from '../RequestModal';

function CreatePost() {
  const { user } = useUser();
  return (
    <div aria-label="create a post" className="self-center w-full max-w-md">
      <Link
        to="/request"
        className="flex items-center w-full p-2 space-x-4 text-sm text-left text-gray-700 border-2 border-gray-600 border-dashed rounded-md cursor-text focus:outline-none focus:bg-gray-100"
      >
        <img
          className="inline-block w-12 h-12 rounded-full shadow-sm cursor-pointer"
          src={user.photoURL}
          alt={user.displayName + 'profile picture'}
        />
        <span className="block">
          What's on your mind, {user.displayName.split(' ')[0]}?
        </span>
      </Link>
      <RequestModal />
    </div>
  );
}

export default CreatePost;
