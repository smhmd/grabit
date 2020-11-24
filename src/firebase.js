import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const projectId = 'gemo-grabit';

firebase.initializeApp({
  apiKey: 'AIzaSyCdP4O0S4UtCyd4nc0W8iNP0TSCjZ71YZM',
  authDomain: 'gemo-grabit.firebaseapp.com',
  databaseURL: 'https://gemo-grabit.firebaseio.com',
  projectId,
  storageBucket: 'gemo-grabit.appspot.com',
  messagingSenderId: '867155060257',
  appId: '1:867155060257:web:aa67ac653505c5830ae560',
});

const app = firebase.app();

const db = firebase.firestore(app);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  process.env.GCLOUD_PROJECT = projectId;
  db.useEmulator('localhost', 9090);
  // firebase.auth().useEmulator('http://localhost:9099');
}

const storage = firebase.storage(app);

export { firebase, db, storage };
