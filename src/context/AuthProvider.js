import { createContext, useEffect, useState } from "react";
import { login, logout } from "../config/Authentication";
import { NetworkHandler } from "../components/handlers/Network";
import customAxios from "../api/axios";
import loaderGif from "../assets/Settings.gif";
import { useRef } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  console.log("AuthProvider");
  const [auth, setAuth] = useState({});
  const [currentUser, setCurrentUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({});
  const loaderRef = useRef(null);

  useEffect(() => {
    console.log("AuthProvider useEffect");
    const local_auth = localStorage.getItem("auth");
    if (local_auth) {
      async function verifytoken() {
        try {
          const result = await customAxios.request({
            timeout: 5000,
            method: "GET",
            url: `/ping`,
          });
          console.log(result.data.message);
          setAuth(JSON.parse(local_auth));
          setCurrentUser(JSON.parse(local_auth).info.id);
        } catch (err) {
          debugger;
          if (err.response) {
            if (err.response.status === 401) {
              logout();
            }
          }
          setIsOpen(true);
          if (err.code === "ERR_NETWORK" || "ECONNABORTED") {
            if (!navigator.onLine)
              setError({
                node: "Client",
                msg: ` Something is temporarily wrong with your network connection. 
              Please make sure you are connected to the internet and then reload your browser.`,
              });
            else
              setError({
                node: "Server",
                msg: ` Servers are down.
                Please try again later`,
              });

            console.error("Ping ", err);
          }
        }
      }

      verifytoken();
    }
    loaderRef.current.style.display = "none";
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, currentUser, setCurrentUser }}>
      <NetworkHandler isOpen={isOpen} setIsOpen={setIsOpen} error={error} />
      <div
        ref={loaderRef}
        className="items-center bg-white  justify-center flex h-screen w-screen ">
        <img src={loaderGif} alt="Your GIF" />
      </div>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
