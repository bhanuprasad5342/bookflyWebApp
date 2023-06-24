
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCDaeGWN-yDVccRNK6Gzd2ZdGD8YBytHHk",
  authDomain: "bookfly-4504c.firebaseapp.com",
  projectId: "bookfly-4504c",
  storageBucket: "bookfly-4504c.appspot.com",
  messagingSenderId: "313868846670",
  appId: "1:313868846670:web:40df5adc74ce94c164651f"
  };
   
  firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = getAuth(app);
  export { db, auth };
  export default firebase;