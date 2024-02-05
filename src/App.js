import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/accounts/login";
import Register from "./components/accounts/register";
import Welcome from "./components/layouts/Welcome";
import Header from "./components/layouts/header";
import Profile from "./components/accounts/profile";
import Project from "./components/layouts/projectNew";
import React from "react";

import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/welcome" element={<Welcome />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/projects/:id" element={<Project />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
