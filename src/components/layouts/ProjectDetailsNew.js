import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import customAxios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import CreateIssue from "../issue/createIssue";
import { Sidebar } from "./sidebar";
import "rsuite/dist/rsuite.min.css";
import Dnd from "./dnd";
export default function ProjectDetails(props) {
  const [todos, setTodos] = React.useState({});
  const { auth, currentUser } = React.useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [td, setTd] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);
  const groupBy = (keys) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = keys.map((key) => obj[key]).join("-");
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  if (todos.projectissues) {
    if (todos.projectissues.length) {
      const groupByStatus = groupBy(["status"]);
      let todolist = groupByStatus(todos.projectissues)["To Do"];
      let inprogresslist = groupByStatus(todos.projectissues)["In Progress"];
      let donelist = groupByStatus(todos.projectissues)["Done"];
      if (td.length === 0 && todolist) {
        setTd(todolist);
        setReady(true);
      }
      if (inprogress.length === 0 && inprogresslist) {
        setInprogress(inprogresslist);
        setReady(true);
      }
      if (done.length === 0 && donelist) {
        setDone(donelist);
        setReady(true);
      }

      console.log("ISSUES", groupByStatus(todos.projectissues));
    }
  }

  const id = useParams();
  useEffect(() => {
    const getProjects = async () => {
      if (currentUser) {
        try {
          const response = await customAxios.get(`/projects/${id.id}`);
          setTodos(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getProjects();
  }, [currentUser]);
  return currentUser ? (
    <div className=" pt-20 bg-white-800">
      <aside
        id="default-sidebar"
        className="fixed left-0  w-64 h-screen sm:translate-x-0 delay-75 transition-transform -translate-x-full "
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>
      <div id="main" className="p-4 sm:ml-64">
        <div className="flow-root">
          <ol>
            <li className="inline-block">
              <a
                href="/"
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
            <button
              type="button"
              className="text-white bg-blue-700   hover:bg-blue-800 ml-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => setModal(true)}
            >
              Create Issue
            </button>
          </div>

          {modal && (
            <CreateIssue
              modal={modal}
              setModal={setModal}
              projectinfo={todos}
              user={auth.info}
            />
          )}

          <div
            id="projectsdisplay"
            className="p-4  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
          >
            {ready && (
              <Dnd
                td={td}
                inprogress={inprogress}
                done={done}
                projectinfo={todos}
                user={auth.info}
              />
            )}
          </div>
        </div>
      </div>
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
}
