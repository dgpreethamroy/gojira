import React, { useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import customAxios from "../../api/axios";
export default function Profile() {
  const { currentUser, auth } = React.useContext(AuthContext);
  const URL = "/requestaccess";
  const map = {
    "REQUEST EDITOR ACCESS": "Editor",
    "REQUEST ADMIN ACCESS": "Admin",
  };
  useEffect(() => {
    const fetchRoles = async () => {
      if (currentUser) {
        if (roles.includes(1984) && roles.includes(5150)) return;
        {
          try {
            const result = await customAxios.get(
              `/requestaccess/${auth.info.id}`
            );
            if (result.data.requestroles.includes("Admin")) {
              document.getElementById("admin-access").disabled = true;
              document.getElementById("admin-access").innerText =
                "ADMIN ACCESS REQUESTED";
            }
            if (result.data.requestroles.includes("Editor")) {
              document.getElementById("editor-access").disabled = true;
              document.getElementById("editor-access").innerText =
                "EDITOR ACCESS REQUESTED";
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    };
    fetchRoles();
  }, [currentUser]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const result = await customAxios.post(URL, {
        userid: auth?.info?.id,
        requestroles: [map[e.target.innerText]],
      });
      alert("Request for Access Sent");
      if (result.data.requestroles.includes("Admin")) {
        document.getElementById("admin-access").disabled = true;
        document.getElementById("admin-access").innerText =
          "ADMIN ACCESS REQUESTED";
      }
      if (result.data.requestroles.includes("Editor")) {
        document.getElementById("editor-access").disabled = true;
        document.getElementById("editor-access").innerText =
          "EDITOR ACCESS REQUESTED";
      }
      alert("Request for Access Sent");
    } catch (e) {
      console.log(e);
    }
  };
  const username = auth?.info?.username;
  const id = auth?.info?.id;
  const roles = auth?.info?.roles;

  return currentUser ? (
    <>
      <div className="h-screen  py-5 mt-16 px-3 bg-white dark:bg-gray-800 items-center">
        <div className="bg-white dark:bg-gray-800">
          <h4 className="flex justify-center p-3 text-[22px] dark:text-white">
            Profile Details
          </h4>
          <div className="md:grid grid-cols-12 flex flex-col md:items-center gap-4 p-4">
            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                Username
              </span>
              <input
                type="text"
                placeholder={username.substring(0, username.indexOf("@"))}
                readOnly
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
                readOnly
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
                readOnly
                className="text-[13px] h-12 text-gray-700 dark:bg-gray-800 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div className="col-span-6 relative">
              <span className="absolute bg-white dark:bg-gray-800 dark:text-white left-3 -top-[12px] px-2">
                Admin
              </span>
              <input
                type="text"
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
                placeholder={
                  roles.find((role) => role === 2001)
                    ? "ACCESS GRANTED"
                    : "ACCESS DENIED"
                }
                className="text-[13px] h-12 w-full text-gray-700 dark:bg-gray-800  border-2 px-2  pr-4 rounded-sm"
              />
            </div>
          </div>

          <div className="px-4 text-right py-2">
            {!roles.includes(5150) && (
              <button
                id="admin-access"
                onClick={handleEdit}
                className="h-10 mr-2 w-64 rounded-sm shadow-md text-white text-[16px] hover:bg-green-700 bg-green-500"
              >
                REQUEST ADMIN ACCESS
              </button>
            )}
            {!roles.includes(1984) && (
              <button
                id="editor-access"
                onClick={handleEdit}
                className="h-10 w-64  rounded-sm shadow-md text-white text-[16px] hover:bg-green-700 bg-green-500"
              >
                REQUEST EDITOR ACCESS
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>
      <Link to="/">
        <h2 className="mt-24 text-3xl text-center tracking-tight font-light dark:text-white">
          Please Login
        </h2>
      </Link>
    </div>
  );
}
