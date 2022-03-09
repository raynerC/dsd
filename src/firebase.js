import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDcsunMEjC44dRv7DSmcEE2gStS44JFmE",
    authDomain: "gaming-social-platform.firebaseapp.com",
    projectId: "gaming-social-platform",
    storageBucket: "gaming-social-platform.appspot.com",
    messagingSenderId: "436594708707",
    appId: "1:436594708707:web:c9ab696a54d82a50b0b5d6",
    measurementId: "G-R7FXS7TJBS"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  const firestore = getFirestore();

  export {auth, provider, firestore };
  export default db;

  