import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

const _ = require("lodash");
export const AuthContext = React.createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  // console.log;
  const [loading, setLoading] = useState(true);
  async function signup(email, password) {
    let users = {};
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        users = userCredential.user;
        let x = JSON.stringify(users);
        localStorage.setItem("usersss", x);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
    return users;
  }
  async function login(email, password) {
    let a;
    let e;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        a = userCredential.user;
        let x = JSON.stringify(a);
        localStorage.setItem("usersss", x);
        // navigate("/feed");
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
  async function logout(email, password) {
    await signOut(auth)
      .then(() => {
        console.log("signed out", user);
        localStorage.removeItem("usersss");
        localStorage.removeItem("user");
        // setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const auth = getAuth();
    const unsub = auth.onAuthStateChanged(async (user) => {
      setLoading(false);

      let c = JSON.parse(localStorage.getItem("usersss"));
      //  localStorage.getItem("");
      // if (!_.isEmpty(c)) setUser(c);
      // if (c.length > 0)
      return () => {
        unsub();
      };
    });
  }, []);
  const store = { user, signup, login, logout, loading };
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
