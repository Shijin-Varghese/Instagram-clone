import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCzUA4-Pv4hOmGnbk0tXAqLsu2PlyAxGLc",
  authDomain: "instagran-reels.firebaseapp.com",
  projectId: "instagran-reels",
  storageBucket: "instagran-reels.appspot.com",
  messagingSenderId: "140198028429",
  appId: "1:140198028429:web:4250c7406ef89b08672ec4",
  measurementId: "G-2K0ZT3H18J",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };
