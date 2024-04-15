import React, { useEffect, useReducer, useRef, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import Modal from "../ui/modal/Modal";
import customAxios from "../../api/axios";
export default function Profile() {
  const { currentUser, auth } = React.useContext(AuthContext);
  const [pendingRequests, setPendingRequests] = useState(null);
  const [details, setDetails] = useState(null);
  const [openRequest, setOpenRequest] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [acknowledge, setAcknowledge] = useState(false);

  const URL = "/requestaccess";
  const map = {
    "REQUEST EDITOR ACCESS": "Editor",
    "REQUEST ADMIN ACCESS": "Admin",
  };
  useEffect(() => {
    const fetchRoles = async () => {
      if (currentUser) {
        if (!pendingRequests) {
          try {
            const result = await customAxios.get("/requestaccess");
            setPendingRequests(result.data);
          } catch (err) {
            console.log(err);
          } finally {
            const result2 = await customAxios.get(`/users/`);
            setDetails(result2.data);
          }
        }
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
  const handleOpenRequest = (request) => {
    setIsOpen(true);
    setOpenRequest(request);
  };
  const handleRequest = (e, role) => {
    const id = e.target.closest(".request").id;
    const value = e.target.innerText;
    if (value === "Approve") {
      e.target.nextSibling.style.display = "none";
      e.target.innerText = "Approved";
      e.target.disabled = true;
    } else {
      e.target.previousSibling.style.display = "none";
      e.target.innerText = "Cancelled";
      e.target.disabled = true;
    }

    //IMplement server//
    const update = async (role, id, value) => {
      try {
        const result = await customAxios
          .delete(`/requestaccess/`, {
            data: {
              id: id,
              deleterole: role,
              addrole: value === "Approve" ? true : false,
            },
          })
          .then((response) => {
            debugger;
            setPendingRequests((all) => {
              const newall = all.map((req) => {
                if (req.userid !== id) return req;
                else {
                  const newroles = req.requestroles.filter(
                    (roles) => roles !== role
                  );
                  return { ...req, requestroles: newroles };
                }
              });
              return newall;
            });
            setAcknowledge(true);

            console.log(result);
          });
      } catch (e) {
        console.log(e);
      }
    };
    update(role, id, value);
    //
  };
  return currentUser ? (
    <>
      <div className="h-screen  py-5 mt-12 px-3 bg-white dark:bg-gray-800 items-center">
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
          <div>
            {pendingRequests && pendingRequests.length > 0 && (
              <>
                <div className="text-center font-semibold">
                  <p className="p-1 text-black dark:text-white">
                    Pending requests
                  </p>
                </div>
                {pendingRequests.map((request) => (
                  <div
                    className="flex  bg-slate-200 items-center  hover:cursor-pointer"
                    onClick={(e) => handleOpenRequest(request)}
                  >
                    {details?.map((user) => {
                      return (
                        user._id === request.userid &&
                        request.requestroles.length > 0 && (
                          <p className="p-1  w-1/2 text-center">
                            {user.name}({user._id})
                          </p>
                        )
                      );
                    })}
                    <div className="flex w-1/2 justify-center">
                      {request.requestroles?.map((role) => (
                        <p className="p-1 m-1 underline">{role} Access</p>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {openRequest && (
            <div className="flex justify-center">
              <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Modal.Header
                  close={true}
                  minimize={true}
                  className="text-center"
                >
                  Approve Pending Request
                </Modal.Header>
                <p>
                  {details.map((user) => {
                    return (
                      user._id === openRequest.userid && (
                        <p className="text-nowrap p-1 m-1 font-semibold text-center">
                          {user.name}
                        </p>
                      )
                    );
                  })}
                  {openRequest.requestroles.map((role) => (
                    <div
                      className="flex justify-between request my-2"
                      id={openRequest.userid}
                    >
                      <p className="p-1 m-1 ">{role} Access</p>
                      <div>
                        <button
                          className="py-1 px-2  bg-green-700 rounded m-1 approve text-white"
                          onClick={(e) => handleRequest(e, role)}
                        >
                          Approve
                        </button>
                        <button
                          className="py-1 px-2 m-1  bg-red-700 rounded cancel text-white"
                          onClick={(e) => handleRequest(e, role)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </p>
              </Modal>
            </div>
          )}
          {acknowledge && (
            <Modal isOpen={acknowledge} setIsOpen={setAcknowledge} small>
              <Modal.Header>Your Changes are succesfully saved</Modal.Header>

              <p className="text-center">{acknowledge}</p>
              <Modal.Footer>
                <button
                  onClick={() => {
                    setAcknowledge(false);
                  }}
                >
                  OK
                </button>
              </Modal.Footer>
            </Modal>
          )}
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
