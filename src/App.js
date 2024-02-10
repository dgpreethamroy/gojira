import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/accounts/login";
import Register from "./components/accounts/register";
import ProjectTable from "./components/project/ProjectTable";
import Header from "./components/layouts/Header";
import Profile from "./components/accounts/profile";
import ProjectDetails from "./components/project/ProjectDetails";
import { Dashboard } from "./components/dashboard/Dashboard";
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
            <Route exact path="/projects" element={<ProjectTable />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
