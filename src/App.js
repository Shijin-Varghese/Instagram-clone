import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Feed from "./Components/Feed";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import Ioa from "./Components/Ioa";
import { AuthProvider } from "./Context/AuthContext";
function App() {
  return (
    <>
      {/* <Feed /> */}{" "}
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:id" element={<Profile></Profile>} />
            <Route path="/" element={<Feed></Feed>} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
