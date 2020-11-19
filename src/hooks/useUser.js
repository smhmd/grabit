import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { firebase, db } from '../firebase';

export const authenticate = async () => {
  const provider = new firebase.auth.FacebookAuthProvider(); // login with facebook
  await firebase.auth().signInWithPopup(provider); // open facebook popup
};

export const UserContext = createContext('use a provider');

export function UserProvider(props) {
  const [user, setUser] = useState('loading');
  const [usertype, setUsertype] = useState(() => {
    const localStorageUsertype = window.localStorage.getItem('usertype');
    if (['drivers', 'customers'].includes(localStorageUsertype)) {
      return localStorageUsertype;
    } else {
      return 'drivers';
    }
  });

  const value = useMemo(() => ({ user, setUser, usertype, setUsertype }), [
    user,
    setUser,
    usertype,
    setUsertype,
  ]);

  useEffect(() => {
    // sync usertype with localStorage to get it on init
    window.localStorage.setItem('usertype', usertype);
  }, [usertype]);

  useEffect(() => {
    // return for clean up. listener on authentication.
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // create user object
        const userObject = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          usertype,
        };
        const userReference = db.collection(usertype).doc(userObject.uid); // put in a var and pass in user state becaused needed to compare in firestore's "where(q, o, val)" (as the last val. See posts.jsx)
        userReference
          .get() // get this piece of data
          .then((doc) => doc.data()) // get the content
          .then((data) => {
            if (!data) {
              // if the content is empty, the user is brand new and must be set() with the stuff that came from the authentication.
              userReference.set(userObject);
              setUser({ ...userObject, ref: userReference }); // set user state using the authentication properties and the reference.
            } else {
              setUser({ ...data, ref: userReference });
            } // set the state using the data from the server (because changable by the user) since the user is old.
          });
      } else {
        setUser(null);
      }
    });
  }, [usertype]);

  return <UserContext.Provider value={value} {...props} />;
}

export default function useUser() {
  return useContext(UserContext);
}
