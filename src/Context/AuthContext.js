import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
export const AuthContext = React.createContext();
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  // console.log;
  const [loading, setLoading] = useState(true);
  async function signup(email, password) {
    let users = {};
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        users = userCredential.user;
        return users;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        return error;
      });
    return users;
  }
  async function login(email, password) {
    let a;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        a = userCredential.user;
        navigate("/feed");
        return a;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        return error;
      });
    return a;
  }
  function logout(email, password) {
    signOut(auth)
      .then(() => {
        console.log("signed out", user);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    const auth = getAuth();
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
        setUser(user);
        console.log(user, "er");
      }

      return () => {
        unsub();
      };
    });
  }, []);
  const store = { user, signup, login, logout, loading };
  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
