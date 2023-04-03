import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
function PrivateRoute({ Component }) {
  const { user } = useContext(AuthContext);
  console.log("dd", user);
  return (
    <>
      {user ? (
        Component ? (
          <Component />
        ) : (
          <div>Not found-compppp</div>
        )
      ) : (
        Navigate("login")
      )}
    </>
  );
}

export default PrivateRoute;
