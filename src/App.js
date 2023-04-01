import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Feed from "./Components/Feed";
// import PrivateRoute from "./Components/PrivateRoute";

import { AuthProvider } from "./Context/AuthContext";
function App() {
  return (
    <>
      <Feed />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Feed />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
