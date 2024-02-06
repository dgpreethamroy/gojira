import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
export const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? (
    <div className="mt-16">
      Dashboard not yet implemented
      <br />
      <Link to="/projects">Click here to go to projects</Link>
    </div>
  ) : (
    <div>
      <Link to="/">
        <h2 className="mt-24 text-3xl text-center tracking-tight font-light dark:text-white">
          Please Login
        </h2>
      </Link>
    </div>
  );
};
