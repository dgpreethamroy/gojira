import { createContext, useEffect, useState } from "react";
import { login, logout } from "../config/Authentication";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  console.log("AuthProvider");
  const [auth, setAuth] = useState({});
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    console.log("AuthProvider useEffect");
    const local_auth = localStorage.getItem("auth");
    if (local_auth) {
      console.log("AuthProvider useEffect local_auth");
      setAuth(JSON.parse(local_auth));
      setCurrentUser(JSON.parse(local_auth).info.id);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, logout, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
