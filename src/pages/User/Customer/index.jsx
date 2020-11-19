import React from 'react';

import useCollection from '../../../hooks/useCollection';

import CreatePost from './CreatePost';
import Posts from '../../../components/Posts';
import useUser from '../../../hooks/useUser';

export default function Customer() {
  // query posts made by the user by comparing "author" to an actual reference of the user
  // see Stackoverflow: https://stackoverflow.com/questions/53140913/querying-by-a-field-with-type-reference-in-firestore/53141199
  const { user, usertype } = useUser();
  const posts = useCollection('posts', ['author', '==', user.ref]).sort(
    (a, b) => a.orderedAt.seconds - b.orderedAt.seconds,
  );
  return (
    <div className="flex flex-col space-y-2">
      <CreatePost user={user} />
      <div className="flex flex-col border-l border-r border-gray-400 border-dashed lg:flex-row">
        <Posts
          usertype={usertype}
          title="Ongoing"
          posts={posts
            .filter((post) => post.status === 'ongoing')
            .slice(0) // because reverse mutates the array, use slice to create a shallow clone.
            .reverse()}
          message="No currently ongoing requests."
          user={user}
        />
        <span className="w-0 h-full bg-gray-400 border-l border-dashed "></span>
        <Posts
          usertype={usertype}
          title="My requests"
          posts={posts
            .filter((post) => post.status === 'new')
            .slice(0) // because reverse mutates the array, use slice to create a shallow clone.
            .reverse()}
          message="make a request now!"
          user={user}
        />
      </div>
    </div>
  );
}
