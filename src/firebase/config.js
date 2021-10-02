import firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// const firebaseConfig = {
//       apiKey: "AIzaSyB1qM62HAk2fAoQWd7_e0soUbjBzpMlxpY",
//       authDomain: "crud-reactjs-f5288.firebaseapp.com",
//       projectId: "crud-reactjs-f5288",
//       storageBucket: "crud-reactjs-f5288.appspot.com",
//       messagingSenderId: "96305317322",
//       appId: "1:96305317322:web:d4f5ef99522cced91a3b33"
// };
const firebaseConfig = {
      apiKey: "AIzaSyAMBZ7AXkbql2z3bPAJheT3w17IqERNSN8",
      authDomain: "cellshop-06.firebaseapp.com",
      projectId: "cellshop-06",
      storageBucket: "cellshop-06.appspot.com",
      messagingSenderId: "863044928542",
      appId: "1:863044928542:web:09eae54cd28acd2abcda0f"
    };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {auth, db, storage};
export default firebase;