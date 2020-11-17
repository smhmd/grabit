import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyCdP4O0S4UtCyd4nc0W8iNP0TSCjZ71YZM',
  authDomain: 'gemo-grabit.firebaseapp.com',
  databaseURL: 'https://gemo-grabit.firebaseio.com',
  projectId: 'gemo-grabit',
  storageBucket: 'gemo-grabit.appspot.com',
  messagingSenderId: '867155060257',
  appId: '1:867155060257:web:aa67ac653505c5830ae560',
});

const db = firebase.firestore();
const storage = firebase.storage(firebase.app());

export { firebase, db, storage };
