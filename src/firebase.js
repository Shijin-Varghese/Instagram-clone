import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBedwisHfGq-rhnf9HdwaziNCTDruKmVtg",
  authDomain: "reels-838dd.firebaseapp.com",
  projectId: "reels-838dd",
  storageBucket: "reels-838dd.appspot.com",
  messagingSenderId: "1028949266771",
  appId: "1:1028949266771:web:6c40e98223c5e9d03791a6",
  measurementId: "G-LD542E50XH",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };
