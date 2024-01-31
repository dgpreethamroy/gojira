import { LogoutIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import AuthContext from "../../context/AuthProvider";
import Logout from "../accounts/logout";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  const { auth, setAuth, currentUser } = React.useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const handletoggleSidebar = () => {
    const sidebar = document.getElementById("default-sidebar");
    const main = document.getElementById("main");
    if (sidebar) {
      if (main?.classList?.contains("sm:ml-64")) {
        sidebar.classList.remove("sm:translate-x-0");
        main.classList.remove("sm:ml-64");
      } else {
        main?.classList?.add("sm:ml-64");
        sidebar?.classList?.add("sm:translate-x-0");
      }
    }
  };
  console.log("Header");
  useEffect(() => {
    console.log("Header useEffect");
  }, []);
  return (
    <>
      <nav className=" fixed top-0 w-full  px-2 sm:px-4 py-1 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white">
        <div className=" mx-0 flex flex-wrap items-center justify-between">
          <div className="w-10">
            <button
              onClick={(e) => {
                handletoggleSidebar();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M4 5.01C4 4.451 4.443 4 5.01 4h1.98C7.549 4 8 4.443 8 5.01v1.98C8 7.549 7.557 8 6.99 8H5.01C4.451 8 4 7.557 4 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C8 13.549 7.557 14 6.99 14H5.01C4.451 14 4 13.557 4 12.99v-1.98zm6-6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C14 7.549 13.557 8 12.99 8h-1.98C10.451 8 10 7.557 10 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm6-6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C20 7.549 19.557 8 18.99 8h-1.98C16.451 8 16 7.557 16 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm-12 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C8 19.549 7.557 20 6.99 20H5.01C4.451 20 4 19.557 4 18.99v-1.98zm6 0c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm6 0c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98z"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <Link to="/" className="flex">
              <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                GodZilla
              </span>
            </Link>
          </div>
          {/* <div>
            <input
              id="search-dialog-input"
              placeholder="Search"
              default=""
              className="search-input "
            />
          </div> */}
          <div className="flex md:order-2">
            <ThemeToggler />

            {currentUser && (
              <>
                <button
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                  onClick={() => setModal(true)}
                >
                  <LogoutIcon className="h-8 w-8" aria-hidden="true" />
                </button>

                <Link
                  to="/profile"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-2.5"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://source.unsplash.com/random/200x200?sig=1"
                    alt=""
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}
