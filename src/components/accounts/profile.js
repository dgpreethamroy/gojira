import React from "react";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";
export default function Profile() {
  const { currentUser, auth } = React.useContext(AuthContext);
  const [edit, setEdit] = React.useState(false);
  const handleEdit = (e) => {
    setEdit((prev) => !prev);
    setVisible((prev) => !prev);
  };
  const username = auth?.info?.username;
  const id = auth?.info?.id;
  const roles = auth?.info?.roles;
  const [visible, setVisible] = React.useState(false);

  return currentUser ? (
    <>
      <div className="h-screen  py-5 px-3 bg-white dark:bg-gray-800 items-center">
        <div className="bg-white dark:bg-gray-800">
          <h4 className="flex justify-center p-3 text-[22px] dark:text-white">
            {edit ? "Edit" : ""} Details
          </h4>
          <div className="md:grid grid-cols-12 flex flex-col md:items-center gap-4 p-4">
            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                Username
              </span>
              <input
                type="text"
                placeholder={username.substring(0, username.indexOf("@"))}
                className="text-[13px] h-12 text-white dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                Roles
              </span>
              <input
                type="text"
                placeholder="Request Admin to get access"
                className="text-[13px] h-12 text-gray-700 dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                ID
              </span>
              <input
                type="text"
                placeholder={id}
                className="text-[13px] h-12 text-gray-700 dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                Admin
              </span>
              <input
                type="text"
                placeholder={
                  roles.find((role) => role === 5150)
                    ? "ACCESS GRANTED"
                    : "ACCESS DENIED"
                }
                className="text-[13px] h-12 text-gray-700 dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                Email
              </span>
              <input
                type="text"
                placeholder={username}
                className="text-[13px] h-12 text-gray-700 dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                Editor
              </span>
              <input
                type="text"
                placeholder={
                  roles.find((role) => role === 1984)
                    ? "ACCESS GRANTED"
                    : "ACCESS DENIED"
                }
                className="text-[13px] h-12 text-gray-700 dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                Godzilla-URL
              </span>
              <input
                type="text"
                placeholder="http://localhost:3000/"
                className="text-[13px] h-12 text-gray-700 dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                User
              </span>
              <input
                type="text"
                placeholder={
                  roles.find((role) => role === 2001)
                    ? "ACCESS GRANTED"
                    : "ACCESS DENIED"
                }
                className="text-[13px] h-12 text-gray-700 dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>
          </div>

          <div className="px-4 text-right py-2">
            <button
              className={
                visible
                  ? "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded visible"
                  : "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded invisible"
              }
            >
              SAVE
            </button>
            <button
              onClick={(e) => {
                handleEdit(e);
              }}
              className="h-10 w-32 rounded-sm shadow-md text-white text-[16px] hover:bg-red-700 bg-red-600"
            >
              EDIT
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>
      <Link to="/">
        <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
          Please Login
        </h2>
      </Link>
    </div>
  );
}
