import { createContext, useEffect, useState } from "react";
import { login, logout } from "../config/Authentication";
import axios from "../api/axios";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  console.log("AuthProvider");
  const [auth, setAuth] = useState({});
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    console.log("AuthProvider useEffect");
    const local_auth = localStorage.getItem("auth");
    if (local_auth) {
      async function verifytoken() {
        try {
          const result = await axios.get("/ping", {
            headers: {
              Authorization: `Bearer ${JSON.parse(local_auth).accessToken}`,
            },
          });
          console.log(result.data.message);
          setAuth(JSON.parse(local_auth));
          setCurrentUser(JSON.parse(local_auth).info.id);
        } catch (err) {
          logout();
        }
      }

      verifytoken();
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
