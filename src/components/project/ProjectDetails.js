import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import customAxios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import CreateIssue from "../issue/CreateIssue";
import { Sidebar } from "../layouts/Sidebar";
import Dnd from "../dnd/Dnd";
import "rsuite/dist/rsuite.min.css";
import { Issuedata } from "../../assets/CommonData";
import Modal from "../ui/modal/Modal";
export default function ProjectDetails() {
  const { auth, currentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState({});
  const [modal, setModal] = useState(false);
  const [ready, setReady] = useState(false);
  const [issuecreated, setIssuecreated] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [state, setState] = useState({
    tasks: {},
    columns: {
      "column-1": { id: "column-1", title: "To Do", taskIds: [] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
      "column-3": { id: "column-3", title: "Done", taskIds: [] },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  });

  const id = useParams();
  useEffect(() => {
    const getProjects = async () => {
      if (currentUser) {
        console.log("Fetching project details for project id:", id.id);
        try {
          // Get Project Details
          const response = await customAxios.get(`/projects/${id.id}`);
          setTodos(response.data);
          if (response.data.projectissues.tasks)
            setState(response.data.projectissues);
          if (!ready) setReady(true);
          //
        } catch (error) {
          console.log(error);
        }
      }
    };
    getProjects();
  }, [currentUser, issuecreated, id.id]);

  if (!currentUser)
    return (
      <div>
        <Link to="/">
          <h2 className="mt-24 text-3xl text-center tracking-tight font-light dark:text-white">
            Please Login
          </h2>
        </Link>
      </div>
    );

  return (
    <div className="pt-[60px] bg-white-800">
      <aside
        id="default-sidebar"
        className="fixed left-0  w-64 h-screen sm:translate-x-0 delay-75 transition-transform -translate-x-full "
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>
      <div
        id="main"
        className=" h-[100%] min-h-[91.6vh] p-4 sm:ml-64 bg-[#EAE6FF] dark:bg-gray-900"
      >
        <div className="flow-root">
          <ol>
            <li className="inline-block">
              <a
                href="/projects"
                className="after:content-['/'] after:px-2 text-black dark:text-white"
              >
                <span>Projects</span>
              </a>
            </li>
            <li className="inline-block">
              <a
                href={`/projects/${id.id}`}
                className="text-black dark:text-white"
              >
                <span>{todos.projectname}</span>
              </a>
            </li>{" "}
          </ol>
          <div className="flex">
            <h2 className="py-2 text-2xl dark:text-white font-semibold">
              SCRUM SPRINT 1
            </h2>
            {/* <button
              type="button"
              className="text-white bg-blue-700   hover:bg-blue-800 ml-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                if (!isMinimized) setModal(true);
                else {
                  setIsMinimized(false);
                  setModal(true);
                }
              }}
            >
              Create Issue
            </button> */}
            <Modal className="ml-auto">
              <Modal.Header close={true} minimize={true}>
                headlessui modal
              </Modal.Header>
              This is Modal Body
              <Modal.Footer close={true} />
            </Modal>
          </div>

          {
            <CreateIssue
              modal={modal}
              setModal={setModal}
              projectinfo={todos}
              user={auth.info}
              setIssuecreated={setIssuecreated}
              setIsMinimized={setIsMinimized}
            />
          }

          <div
            id="DnDParent"
            //style={{ maxHeight: window.innerHeight - 260 }}
            className={`p-4 border-2 overflow-y-auto   border-gray-200 border-dashed rounded-lg dark:border-gray-700`}
          >
            {
              <Dnd
                state={state}
                setState={setState}
                projectmembers={todos.projectmembers}
                project_id={id}
              />
            }
          </div>
        </div>
        {isMinimized && (
          <div
            onClick={() => {
              setModal(true);
              setIsMinimized(false);
            }}
            className=" bg-white hover:cursor-pointer border-2 shadow-2xl items-center fixed top-[102px]  rounded-md right-52 w-[20%] h-12 flex "
          >
            <div className="inline-block px-4  ">{Issuedata[0].icon}</div>
            <span className="inline-block  bg-white  text-black font-bold rounded">
              New task
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
