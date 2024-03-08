import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import customAxios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import CreateIssue from "../issue/CreateIssue";
import { Sidebar } from "../layouts/Sidebar";
import { ListIssues } from "../list/ListIssues";
import Dnd from "../dnd/Dnd";
import Tabs from "../ui/tabs/Tabs";
import SearchBox from "../ui/filter/Search";
import Calendar from "../calendar/Calendar";
export default function ProjectDetails() {
  const { auth, currentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState({});
  const [modal, setModal] = useState(false);
  const [ready, setReady] = useState(false);
  const [issuecreated, setIssuecreated] = useState(false);
  const [inputSearch, setSearchinput] = useState("");
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

  const Board = (
    <>
      <div className="flex m-1 sticky top-0 ">
        <SearchBox
          placeholder={"Board"}
          inputSearch={inputSearch}
          setSearchinput={setSearchinput}
        />
      </div>
      <div
        id="DnDParent"
        style={{ maxHeight: window.innerHeight - 200 }}
        className={`pt-0 border-2 overflow-y-auto   border-gray-200  rounded-lg dark:border-gray-700`}
      >
        {
          <Dnd
            state={state}
            setState={setState}
            projectmembers={todos.projectmembers}
            project_id={id}
            inputSearch={inputSearch}
            setSearchinput={setSearchinput}
          />
        }
      </div>
    </>
  );
  const List = (
    <div id="ListParent">
      <ListIssues
        state={state}
        setState={setState}
        project_id={id}
        info={todos}
      />
    </div>
  );
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
        className="fixed left-0  w-64 h-screen  delay-75 transition-transform -translate-x-full "
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>
      <div
        id="main"
        className=" h-[100%] min-h-[91.6vh] p-4  bg-[#EAE6FF] dark:bg-gray-900"
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
          <div className="flex items-center">
            <h2 className="py-2 text-2xl text-black dark:text-white font-semibold">
              SCRUM SPRINT 1
            </h2>
            <button
              type="button"
              className="text-white bg-blue-700   hover:bg-blue-800 ml-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                setModal(true);
              }}
            >
              Create Issue
            </button>
          </div>

          {
            <CreateIssue
              modal={modal}
              setModal={setModal}
              projectinfo={todos}
              user={auth.info}
              setIssuecreated={setIssuecreated}
            />
          }
          <Tabs
            tabs={[
              "Summary",
              "Board",
              "List",
              "Calendar",
              "Timeline",
              "Approvals",
              "Forms",
              "Pages",
              "Issues",
              "Reports",
              "Project settings",
            ]}
            displays={[
              <h2 className="text-center text-slate-500">
                Not yet implemented
              </h2>,
              Board,
              List,
              <Calendar tasks={state.tasks} user={currentUser} />,
              <h2 className="text-center text-slate-500">
                Not yet implemented
              </h2>,
              <h2 className="text-center text-slate-500">
                Not yet implemented
              </h2>,
              <h2 className="text-center text-slate-500">
                Not yet implemented
              </h2>,
              <h2 className="text-center text-slate-500">
                Not yet implemented
              </h2>,
              <h2 className="text-center text-slate-500">
                Not yet implemented
              </h2>,
              <h2 className="text-center text-slate-500">
                Not yet implemented
              </h2>,
              <h2 className="text-center text-slate-500">
                Not yet implemented
              </h2>,
            ]}
            open="Calendar"
          />
        </div>
      </div>
    </div>
  );
}
