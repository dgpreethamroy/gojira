import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NetworkHandler } from "../handlers/Network";
import AuthContext from "../../context/AuthProvider";
export default function Login() {
  const { setAuth, login, currentUser, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  console.log("Login Component");
  useEffect(() => {
    console.log("Login useEffect");
    if (currentUser) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [currentUser]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const Guest = e.target.closest(".guest") ? true : false;

    const response = !Guest ? await login(email, password) : await login("Guest", "guest");

    if (response?.isAxiosError) {
      setIsOpen(true);
      if (response.code === "ERR_NETWORK") {
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
      } else if (response.response.status === 401) {
        setError({
          node: "Credentials",
          msg: ` Invalid credentials. 
            Please try again.`,
        });
        return null;
      }
    } else {
      setSuccess(true);
      setAuth(response.data);
      setCurrentUser(response.data.info.id);
    }
  }

  return (
    <>
      {success ? (
        navigate("/projects")
      ) : (
        <>
          <NetworkHandler isOpen={isOpen} setIsOpen={setIsOpen} error={error} />
          <div className="min-h-full mt-16 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
                  Login to your account
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900">
                    Login
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline dark:text-blue-500">
                      Don't have an account? Register
                    </Link>
                  </div>
                </div>
              </form>
              <div
                className="bg-sky-800 guest hover:bg-sky-900 text-center text-sm text-white p-2 rounded-md font-medium hover:cursor-pointer"
                onClick={handleFormSubmit}>
                Login as Guest
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
