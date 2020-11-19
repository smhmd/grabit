import React from 'react';

import Post from './Post';

function Posts({ posts, message, title }) {
  return (
    <div className="w-full max-w-sm px-3 mx-auto mb-5 space-y-3">
      <h3 className="font-semibold capitalize text-brand-gray">{title}</h3>

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <h4 className="flex items-center justify-center h-24 pt-3 space-x-2 text-xs border-t border-gray-400 border-dashed text-brand-gray">
          <svg
            className="inline mb-px"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M7 4.5V5h1v-.5H7zm1-.01v-.5H7v.5h1zM8 11V7H7v4h1zm0-6.5v-.01H7v.01h1zM6 8h1.5V7H6v1zm0 3h3v-1H6v1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zM1 7.5A6.5 6.5 0 017.5 1V0A7.5 7.5 0 000 7.5h1zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zm0 1A7.5 7.5 0 0015 7.5h-1A6.5 6.5 0 017.5 14v1z"
              fill="currentColor"
            ></path>
          </svg>
          <span>{message}</span>
        </h4>
      )}
    </div>
  );
}

export default Posts;
