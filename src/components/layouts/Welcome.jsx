import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import CreateProject from "../project/createProject";
const PROJECT_URL = "/users";
export default function Welcome() {
  console.log("Welcome");
  const { auth, currentUser } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const handleOpenproject = (e) => {
    let id = e.target.parentElement.id;
    navigate(`/projects/${id}`);
  };
  const PAGESIZE = 5;
  const [CURRENTPAGE, setCurrentPage] = useState(1);
  const handleSearch = (e) => {
    setInputSearch(e.target.value);
  };
  const resultProjects = projects.filter((project) => {
    return project.projectname
      .toLowerCase()
      .includes(inputSearch.toLowerCase());
  });

  const filteredProjects = resultProjects.slice(
    (CURRENTPAGE - 1) * PAGESIZE,
    CURRENTPAGE * PAGESIZE
  );
  useEffect(() => {
    console.log("Welcome useEffect");

    const fetchData = async () => {
      try {
        if (currentUser) {
          const result = await axios.get(PROJECT_URL + "/" + auth.info.id, {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          });
          setProjects(...projects, result.data.projects);
        }
      } catch (e) {
        console.log(e);
        alert("Session Timed Out, Please Login Again");
      }
    };
    fetchData();
  }, [currentUser]);
  return (
    <div className=" pt-20 bg-white-800">
      <div id="main" className="px-4">
        <div className="flow-root p-5">
          {" "}
          <p className=" text-2xl font-medium float-left hover:cursor-pointer tracking-tight  dark:text-white">
            Projects
          </p>
          <button
            type="button"
            className="text-white bg-blue-700 float-right  hover:bg-blue-800 ml-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setModal(true)}
          >
            Create Project
          </button>
          {modal && <CreateProject modal={modal} setModal={setModal} />}
        </div>
        <div
          id="projectsdisplay"
          className="px-5  rounded-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="w-full mx-auto text-black">
            <div className="w-full divide-y-2 ">
              <div className="flex py-2 w-[20%] h-10 justify-center border-2 border-gray-300 items-center">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  className="w-[90%] text-md font-light text-gray-600 placeholder-gray-400  dark:bg-gray-800 dark:text-slate-100  focus:outline-none focus:border-blue-500 px-4  my-4"
                />
                <div className="">
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <table className="w-full text-sm divide-y-2 ">
                  <thead>
                    <tr key="head">
                      <td className="px-4 py-2 dark:text-slate-50">Name</td>
                      <td className="px-4 py-2 dark:text-slate-50">Key</td>
                      <td className="px-4 py-2 dark:text-slate-50">Type</td>
                      <td className="px-4 py-2 dark:text-slate-50">Lead</td>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr
                        key={project._id}
                        id={project._id}
                        className="hover:bg-gray-200 dark:hover:bg-gray-500"
                      >
                        <td
                          className="border-none dark:text-slate-50 underline text-blue-700 hover:cursor-pointer px-4 py-2"
                          onClick={handleOpenproject}
                        >
                          {project.projectname}
                        </td>
                        <td className="border-none dark:text-slate-50 px-4 py-2">
                          {project.projectkey}
                        </td>
                        <td className="border-none dark:text-slate-50 px-4 py-2">
                          {project.projecttype}
                        </td>
                        <td className="border-none dark:text-slate-50 px-4 py-2">
                          {project.projectlead}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav
                  className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                  aria-label="Table navigation"
                >
                  <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                      <button
                        id="prev"
                        disabled={CURRENTPAGE === 1}
                        onClick={() => {
                          setCurrentPage(CURRENTPAGE - 1);
                        }}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        {"<"}
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {CURRENTPAGE}
                      </button>
                    </li>

                    <li>
                      <button
                        id="next"
                        disabled={
                          CURRENTPAGE ===
                          Math.ceil(resultProjects.length / PAGESIZE)
                        }
                        onClick={() => {
                          setCurrentPage(CURRENTPAGE + 1);
                        }}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        {">"}
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
