import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import customAxios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import CreateIssue from "../issue/CreateIssue";
import { Sidebar } from "../layouts/Sidebar";
import { ListIssues } from "../list/ListIssues";
import { Gnatt_Chart } from "../timeline/Gnatt_Chart";
import Dnd from "../dnd/Dnd";
import SearchBox from "../ui/filter/Search";
import CalendarComponent from "../calendar/Calendar";
import { TestSummary } from "../summary/TestSummary";
import {
  colorPallete,
  closeIcon,
  gradientColors,
  solidColors,
  solidColorsHexCodes,
  gradientColorsHexCodes,
} from "../../assets/CommonData";
import Popover from "../ui/popover/Popover";
const navItems = [
  "Summary",
  "Board",
  "List",
  "Timeline",
  "Calendar",
  "Approvals",
  "Forms",
  "Pages",
  "Issues",
  "Reports",
  "ProjectSettings",
];
export default function ProjectDetails(props) {
  console.log("project Details Component");
  const { auth, currentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState({});
  const [modal, setModal] = useState(false);
  const [ready, setReady] = useState(false);
  const [issuecreated, setIssuecreated] = useState(false);
  const [inputSearch, setSearchinput] = useState("");
  const [defaultTab, setDefaultTab] = useState("Summary");
  const [state, setState] = useState({
    tasks: {},
    columns: {
      "column-1": { id: "column-1", title: "To Do", taskIds: [] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
      "column-3": { id: "column-3", title: "Done", taskIds: [] },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  });
  const Parentref = useRef(null);
  const id = useParams();
  const navigate = useNavigate();
  document.body.style.backgroundColor = colorPallete[navItems.indexOf(defaultTab)];
  if (!id.tab) {
    console.log("Navigating to default Tab");
    navigate(`/projects/${id.pid}/${defaultTab}`);
  } else {
    const tab = id.tab;
    if (tab !== defaultTab) setDefaultTab(tab);
  }
  useEffect(() => {
    console.log("project Details useEffect");
    const getProjects = async () => {
      if (currentUser) {
        console.log("Fetching project details for project id:", id.pid);
        try {
          // Get Project Details
          const response = await customAxios.get(`/projects/${id.pid}`);
          setTodos(response.data);
          if (response.data.projectissues.tasks) setState(response.data.projectissues);
          if (!ready) setReady(true);
          //
        } catch (error) {
          console.log(error);
        }
      }
    };
    getProjects();
    const mainDiv = document.getElementById("main");
    if (mainDiv)
      mainDiv.style.backgroundImage = `linear-gradient(to bottom right, ${gradientColorsHexCodes[4].start},${gradientColorsHexCodes[4].middle}, ${gradientColorsHexCodes[4].end})`;
  }, [currentUser, issuecreated, id.pid]);

  //

  const Board = (
    <div className="p-3">
      <div className="flex sticky top-0 ">
        <SearchBox
          placeholder={"Board"}
          inputSearch={inputSearch}
          setSearchinput={setSearchinput}
        />
      </div>
      <br />
      <div
        id="DnDParent"
        ref={Parentref}
        style={{ maxHeight: window.innerHeight - 200 }}
        className={` overflow-y-auto  dark:border-gray-700 `}>
        <Dnd
          parent={Parentref}
          state={state}
          setState={setState}
          projectmembers={todos.projectmembers}
          project_id={id}
          inputSearch={inputSearch}
          setSearchinput={setSearchinput}
        />
      </div>
    </div>
  );
  const List = (
    <div id="ListParent" className="p-3">
      <ListIssues state={state} setState={setState} project_id={id} info={todos} />
    </div>
  );
  const Timeline = (
    <div className=" p-3">
      <Gnatt_Chart data={state} user={currentUser} projectmembers={todos.projectmembers} />
    </div>
  );
  const Summary = (
    <div className=" p-3 overflow-hidden flex-grow">
      <TestSummary
        data={state}
        user={currentUser}
        project_id={id.pid}
        username={auth?.info?.name}
        projectmembers={todos.projectmembers}
      />
    </div>
  );

  const Calendar = (
    <div className="p-3">
      <CalendarComponent
        tasks={state.tasks}
        user={currentUser}
        projectmembers={todos.projectmembers}
      />
    </div>
  );
  const Approvals = <h2 className="text-center text-slate-500">Not yet implemented</h2>;
  const Forms = <h2 className="text-center text-slate-500">Not yet implemented</h2>;
  const Pages = <h2 className="text-center text-slate-500">Not yet implemented</h2>;
  const Issues = <h2 className="text-center text-slate-500">Not yet implemented</h2>;
  const Reports = <h2 className="text-center text-slate-500">Not yet implemented</h2>;
  const ProjectSettings = <h2 className="text-center text-slate-500">Not yet implemented</h2>;
  if (!currentUser) {
    setTimeout(
      () => (
        <div>
          <Link to="/">
            <h2 className="mt-24 text-3xl text-center tracking-tight font-light dark:text-white">
              Please LoginDe
            </h2>
          </Link>
        </div>
      ),
      1000
    );
    return <h1 className="pt-40">Loading</h1>;
  }

  const colorPalletehtml = (
    <span className="rounded-full p-1 hover:bg-gray-400  ">
      <svg width="30" height="30" viewBox="0 0 24 24" role="presentation">
        <path
          d="M7.818 12.56l4.243 4.243 4.242-4.242-4.242-4.243-4.243 4.243zm-1.414 1.415a1.995 1.995 0 010-2.828l4.243-4.243a1.995 1.995 0 012.828 0l4.243 4.243c.78.78.786 2.041 0 2.828l-4.243 4.243a1.996 1.996 0 01-2.828 0l-4.243-4.243zM6.5 13h11l-5.44 5.218L6.5 13zm2.732-8.925a1 1 0 011.414 0l3.536 3.536-1.414 1.414L9.232 5.49a1 1 0 010-1.415zM18 16s1.5 2 1.5 3.5c0 1-1 1.5-1.5 1.5s-1.5-.4-1.5-1.5C16.5 18 18 16 18 16z"
          fill="purple"></path>
      </svg>
    </span>
  );
  const handleColorChange = (e) => {
    if (e.target.closest(".colorPalle")) {
      const color = e.target.closest(".colorPalle").getAttribute("for").split("-");

      document.getElementById("main").style.backgroundImage = "none";

      if (color[0] === "solidColors") {
        document.getElementById("main").style.backgroundColor =
          solidColorsHexCodes[parseInt(color[1])];
      } else if (color[0] === "gradientColors") {
        document.getElementById("main").style.backgroundImage = `linear-gradient(to bottom right, ${
          gradientColorsHexCodes[color[1]].start
        }, ${
          gradientColorsHexCodes[color[1]].middle !== undefined
            ? gradientColorsHexCodes[color[1]].middle + " ,"
            : ""
        } ${gradientColorsHexCodes[color[1]].end})`;
      } else document.getElementById("main").style.backgroundColor = "white";
    }
  };

  return (
    <div className="pt-[60px] bg-white-800">
      <aside
        id="default-sidebar"
        className="fixed left-0  w-64 h-screen  delay-75 transition-transform -translate-x-full "
        aria-label="Sidebar">
        <Sidebar />
      </aside>
      <div id="main" className=" h-[100%] min-h-[91.6vh] p-4  bg-[#EAE6FF] dark:bg-gray-900">
        <div className="flow-root">
          <ol>
            <li className="inline-block">
              <a
                href="/projects"
                className="after:content-['/'] after:px-2 text-black dark:text-white">
                <span>Projects</span>
              </a>
            </li>
            <li className="inline-block">
              <a href={`/projects/${id.pid}`} className="text-black dark:text-white">
                <span>{todos.projectname}</span>
              </a>
            </li>
          </ol>
          <div className="flex items-center ">
            <h2 className="py-2 text-2xl text-black dark:text-white font-semibold items-center">
              SCRUM SPRINT 1
            </h2>
            <Popover label={colorPalletehtml} plain width="w-[350px]">
              <div>
                <div className="px-2 justify-between flex items-center">
                  <p className="font-semibold text-base px-1">Project background</p>
                  <span className="closePopover">{closeIcon}</span>
                </div>
                <div className="px-2 text-sm font-medium">
                  <p className="p-1">GRADIENTS</p>

                  <div className="flex flex-wrap p-1">
                    {gradientColors.map((color, index) => (
                      <div className="flex" onClick={handleColorChange}>
                        <input id={"gradientColors-" + index} type="radio" className="hidden " />
                        <label
                          htmlFor={"gradientColors-" + index}
                          className={`w-6 h-6 colorPalle bg-gradient-to-br ${color.start} ${color.middle} ${color.end} border-[1px] rounded border-gray-300 flex justify-center items-center cursor-pointer mr-2`}></label>
                      </div>
                    ))}
                  </div>
                </div>
                <br />
                <div className="px-2 text-sm font-medium">
                  <p className="px-1">COLORS</p>
                  <div className="flex flex-wrap p-1">
                    {solidColors.map((color, index) => (
                      <div className="flex py-1 items-center " onClick={handleColorChange}>
                        <input id={"solidColors-" + index} type="radio" className="hidden " />
                        <label
                          htmlFor={"solidColors-" + index}
                          className={`w-6 h-6 colorPalle ${color} border-[1px] rounded border-gray-300  flex justify-center items-center cursor-pointer mr-2`}></label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-2 text-sm font-medium mb-5">
                  <div className="flex flex-wrap">
                    <div className="flex p-1 items-center" onClick={handleColorChange}>
                      <input id={"nocolor"} type="radio" className="hidden " />
                      <label
                        htmlFor={"nocolor"}
                        className={`w-6 h-6 colorPalle bg-white border-[1px] rounded border-gray-300  flex justify-center items-center cursor-pointer mr-2`}></label>
                      <p className="font-medium text-xs">No background</p>
                    </div>
                  </div>
                </div>
              </div>
            </Popover>
            <button
              type="button"
              className="text-white bg-blue-700   hover:bg-blue-800 ml-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                setModal(true);
              }}>
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

          <div className="relative top-[2px]">
            {navItems.map((item, index) => (
              <button
                className={`py-2 px-5 hover:cursor-pointer ${
                  item === defaultTab ? "border-b-2 " : "dark:text-white"
                } `}
                style={{
                  borderColor: colorPallete[index],
                  color: item === defaultTab ? colorPallete[index] : "inherit",
                }}
                onClick={() => {
                  document.body.style.backgroundColor = colorPallete[index];
                  navigate(`/projects/${id.pid}/${item}`);
                }}>
                {item}
              </button>
            ))}
          </div>
          <div className="  w-full border-[1px] z-0 border-gray-400"></div>
          <div
            style={{
              height: window.innerHeight - 192,
              ...(defaultTab === "Summary" && { overflowY: "scroll" }),
            }}>
            {eval(defaultTab)}
          </div>
        </div>
      </div>
    </div>
  );
}
