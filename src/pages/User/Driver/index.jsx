import React from 'react';
import useCollection from '../../../hooks/useCollection';

import Posts from '../../../components/Posts';

export default function Driver({ user, usertype }) {
  const posts = useCollection('posts', ['status', '!=', 'done']).sort(
    (a, b) => b.orderedAt.seconds - a.orderedAt.seconds,
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col border-l border-r border-gray-400 border-dashed lg:flex-row">
        <Posts
          usertype={usertype}
          title="My deliveries"
          posts={posts.filter((post) => post.status === 'ongoing')}
          message="No currently ongoing requests."
          user={user}
        />

        <span className="w-0 h-full bg-gray-400 border-l border-dashed "></span>

        <Posts
          usertype={usertype}
          title="All requests"
          posts={
            posts.filter((post) => post.status === 'new')
            // .sort((a, b) => a.orderedAt.seconds - b.orderedAt.seconds)
          }
          message="No currently ongoing requests."
          user={user}
        />
      </div>
    </div>
  );
}
