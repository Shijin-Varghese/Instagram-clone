import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
function PrivateRoute({ Component: Component }) {
  // const { user } = useContext(AuthContext);
  // return <>{Component ? <Component /> : <div>hi</div>}</>;
}

export default PrivateRoute;
