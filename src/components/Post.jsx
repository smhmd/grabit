import React, { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import Dropdown from './Dropdown';
import { db } from '../firebase';
import useUser from '../hooks/useUser';

function Post({ post }) {
  const { user, usertype } = useUser(); // get user to display it when the post is made by the user, and usertype to render the actual user conditionally (see the logic in useEffect)
  const [author, setAuthor] = useState({
    displayName: '',
    photoURL: 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=', // blank image
  });
  const [requestSeenInFull, setRequestSeenInFull] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isCustomer = usertype === 'customers';
  const isNew = post.status === 'new';
  useEffect(() => {
    let stillMounted = true; // stillMounted used to not update the state on cleanup

    let authorPath;
    if (isCustomer && isNew) {
      setAuthor(user);
      return;
    } else if (isCustomer && !isNew) {
      authorPath = post.courier.path;
    } else if (!isCustomer) {
      authorPath = post.author.path;
    }

    // NOTE TO SELF: get() used instead of .onSnapshot because we don't need realtime for docs. Get them once and move on with your life.
    // if the promise of db.doc().get() is not in pendingCache[path], put it there. (Bit of a hotshot, eh? it's similar to using && to do the next thing.)
    db.doc(authorPath)
      .get()
      .then((doc) => {
        if (stillMounted) {
          const data = {
            ...doc.data(),
            id: doc.id,
          };
          setAuthor(data);
        }
      });

    return () => {
      stillMounted = false;
    };
  }, [
    isCustomer,
    isNew,
    post?.author?.path,
    post?.courier?.path,
    setAuthor,
    user,
  ]);

  return (
    <div className="p-4 mb-5 space-y-4 bg-white rounded shadow">
      <div className="flex items-start justify-between space-x-3">
        <div className="inline-flex space-x-2">
          <img
            className="flex-none w-10 h-10 rounded-full shadow-sm "
            src={author && author.photoURL}
            alt={author && author.displayName + ' profile picture'}
          />
          <div className="flex flex-col">
            <span className="text-sm text-brand-gray">
              {isNew
                ? 'New request from '
                : isCustomer
                ? 'Picked up by '
                : 'You picked '}
              <span className="font-semibold">
                {author && author.displayName}
              </span>
              {!isNew && !isCustomer && "'s request"}
            </span>
            <time className="text-xs text-black text-opacity-50">
              {formatDistance(
                new Date(),
                new Date(
                  isNew
                    ? post.orderedAt.seconds * 1000
                    : post.pickedAt.seconds * 1000,
                ),
              )}
            </time>
          </div>
        </div>
        <Dropdown
          isDropdownOpen={isDropdownOpen}
          setDropdownOpen={setDropdownOpen}
          position="mt-1"
        >
          <svg
            className="text-gray-800"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
          >
            <path
              d="M3 7.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 0a.5.5 0 11-1 0 .5.5 0 011 0zm5 0a.5.5 0 11-1 0 .5.5 0 011 0z"
              stroke="currentColor"
            ></path>
          </svg>
          <div>
            <DropdownMenu
              author={author}
              id={post.id}
              status={post.status}
              setDropdownOpen={setDropdownOpen}
            />
          </div>
        </Dropdown>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 text-black text-opacity-75">
          <Fieldset legend="Summary" className="col-span-2">
            <div>{post.summary}</div>
          </Fieldset>
          <Fieldset legend="Payment">
            <div className="font-semibold">${post.cost}</div>
          </Fieldset>
          <Fieldset legend="Expected by">
            <div>{post.date}</div>
          </Fieldset>
          {requestSeenInFull && (
            <div className="contents">
              <Fieldset legend="Orders">
                <ul className="ml-5 list-disc">
                  {post.orders.map((order, index) => (
                    <li key={index}>{order}</li>
                  ))}
                </ul>
              </Fieldset>
              <Fieldset legend="Destination">
                <svg
                  className="w-full h-16 mt-2 fill-current"
                  preserveAspectRatio="xMinYMid meet"
                  viewBox="0 0 10 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="5.5" cy="5.5" r="4" className="text-gray-700" />
                  <circle cx="5.5" cy="5.5" r="2" className="text-gray-400" />
                  <line
                    x1="5.5"
                    y1="8"
                    x2="5.5"
                    strokeDasharray="2"
                    strokeLinecap="round"
                    y2="34"
                    className="stroke-current text-brand-gray"
                  />
                  <rect
                    x="1.5"
                    y="35"
                    width="8"
                    height="8"
                    className="text-gray-700"
                  />
                  <rect
                    x="3.5"
                    y="37"
                    width="4"
                    height="4"
                    className="text-gray-400"
                  />
                  <text className="text-xs text-brand-gray" x="20" y="10">
                    {post.from}
                  </text>
                  <text className="text-xs text-brand-gray" x="20" y="42">
                    {post.to}
                  </text>
                </svg>
              </Fieldset>
            </div>
          )}
        </div>
        <button
          onClick={() => setRequestSeenInFull(!requestSeenInFull)}
          className="block mt-1 mb-2 text-xs font-semibold text-opacity-75 underline text-brand-black hover:text-brand-red "
        >
          {requestSeenInFull ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
}

function DropdownMenu({
  setDropdownOpen,
  status,
  id,
  // author
}) {
  const { user, usertype } = useUser();
  let action, text, path;
  if (usertype === 'customers' && status === 'new') {
    action = () => {
      db.collection('posts')
        .doc(id)
        .delete()
        .catch((e) => console.error(e));
    };
    text = 'Delete';
    path = (
      <path
        d="M4 .5H1.5a1 1 0 00-1 1V4M6 .5h3m2 0h2.5a1 1 0 011 1V4M.5 6v3m14-3v3m-14 2v2.5a1 1 0 001 1H4M14.5 11v2.5a1 1 0 01-1 1H11m-7-7h7m-5 7h3"
        stroke="currentColor"
      ></path>
    );
  } else if (status === 'ongoing') {
    action = () => {
      // const {uid: otherUID} = author;
      // const {uid: myUID} = user;

      db.collection('chat').add({ messages: [] });
      // .then((room) =>
      //   [user, author].forEach((person) => {
      //     db.collection(person.usertype).doc(person.uid).collection('rooms').add({with: otherUID});
      //   }),
      // );
    };
    text = 'Chat';
    path = (
      <path
        d="M5.5 11.493l.416-.278a.5.5 0 00-.416-.222v.5zm2 2.998l-.416.277a.5.5 0 00.832 0l-.416-.277zm2-2.998v-.5a.5.5 0 00-.416.222l.416.278zm-4.416.277l2 2.998.832-.555-2-2.998-.832.555zm2.832 2.998l2-2.998-.832-.555-2 2.998.832.555zM9.5 11.993h4v-1h-4v1zm4 0c.829 0 1.5-.67 1.5-1.5h-1c0 .277-.223.5-.5.5v1zm1.5-1.5V1.5h-1v8.994h1zM15 1.5c0-.83-.671-1.5-1.5-1.5v1c.277 0 .5.223.5.5h1zM13.5 0h-12v1h12V0zm-12 0C.671 0 0 .67 0 1.5h1c0-.277.223-.5.5-.5V0zM0 1.5v8.993h1V1.5H0zm0 8.993c0 .83.671 1.5 1.5 1.5v-1a.499.499 0 01-.5-.5H0zm1.5 1.5h4v-1h-4v1zM7 7h1V6H7v1zM4 7h1V6H4v1zm6 0h1V6h-1v1z"
        fill="currentColor"
      ></path>
    );
  } else if (usertype === 'drivers' && status === 'new') {
    action = () => {
      db.collection('posts')
        .doc(id)
        .set(
          {
            courier: db.collection('drivers').doc(user.uid),
            status: 'ongoing',
            pickedAt: new Date(),
          },
          { merge: true },
        );
    };
    text = 'Deliver';
    path = (
      <path
        d="M14.5 6.497h.5v-.139l-.071-.119-.429.258zm-14 0l-.429-.258L0 6.36v.138h.5zm2.126-3.541l-.429-.258.429.258zm9.748 0l.429-.258-.429.258zM3.5 11.5V11H3v.5h.5zm8 0h.5V11h-.5v.5zM14 6.497V12.5h1V6.497h-1zM.929 6.754l2.126-3.54-.858-.516L.071 6.24l.858.515zM5.198 2h4.604V1H5.198v1zm6.747 1.213l2.126 3.541.858-.515-2.126-3.54-.858.514zM2.5 13h-1v1h1v-1zm.5-1.5v1h1v-1H3zM13.5 13h-1v1h1v-1zm-1.5-.5v-1h-1v1h1zm-.5-1.5h-8v1h8v-1zM1 12.5V6.497H0V12.5h1zm11.5.5a.5.5 0 01-.5-.5h-1a1.5 1.5 0 001.5 1.5v-1zm-10 1A1.5 1.5 0 004 12.5H3a.5.5 0 01-.5.5v1zm-1-1a.5.5 0 01-.5-.5H0A1.5 1.5 0 001.5 14v-1zM9.802 2a2.5 2.5 0 012.143 1.213l.858-.515A3.5 3.5 0 009.802 1v1zM3.055 3.213A2.5 2.5 0 015.198 2V1a3.5 3.5 0 00-3 1.698l.857.515zM14 12.5a.5.5 0 01-.5.5v1a1.5 1.5 0 001.5-1.5h-1zM2 10h3V9H2v1zm11-1h-3v1h3V9zM3 7h9V6H3v1z"
        fill="currentColor"
      ></path>
    );
  }
  return (
    <div>
      <button
        className="block w-full px-4 py-2 text-sm text-left cursor-pointer hover:bg-brand-red hover:text-white focus:outline-none"
        onClick={() => {
          action();
          setDropdownOpen(false);
        }}
      >
        <svg
          className="inline mr-2"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
        >
          {path}
        </svg>
        <span>{text}</span>
      </button>
      {usertype === 'drivers' && status === 'ongoing' && (
        <button
          onClick={() => {
            db.collection('posts').doc(id).update({ status: 'done' });
          }}
          className="block w-full px-4 py-2 text-sm text-left cursor-pointer hover:bg-brand-red hover:text-white focus:outline-none"
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
              d="M1 7l4.5 4.5L14 3"
              stroke="currentColor"
              strokeLinecap="square"
            ></path>
          </svg>
          <span>Done</span>
        </button>
      )}
    </div>
  );
}

function Fieldset({ legend, children, className }) {
  return (
    <fieldset className={className}>
      <legend className="text-xs text-gray-600 capitalize">{legend}</legend>
      {children}
    </fieldset>
  );
}

export default Post;
