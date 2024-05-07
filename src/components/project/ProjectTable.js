import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import customAxios from "../../api/axios";
import Table from "../ui/table/Table2";
import CreateProject from "./createProject";
const PROJECT_URL = "/users";

export default function ProjectTable() {
  console.log("ProjectTable Component");
  const { auth, currentUser } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const handleOpenproject = (e) => {
    let id = e.target.parentElement.id;
    navigate(`/projects/${id}`);
  };

  useEffect(() => {
    console.log("ProjectTable useEffect");

    const fetchData = async () => {
      if (currentUser) {
        try {
          const result = await customAxios.get(PROJECT_URL + "/" + auth.info.id);
          setProjects(...projects, result.data.projects);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [currentUser]);

  if (!currentUser)
    setTimeout(() => {
      return (
        <div>
          <Link to="/">
            <h2 className="mt-24 text-3xl text-center tracking-tight font-light dark:text-white">
              Please LogingTa
            </h2>
          </Link>
        </div>
      );
    }, 50);

  return (
    <div className=" pt-20 bg-white-800">
      <div id="main" className="px-4">
        <div className=" flex justify-between p-5">
          <p className=" text-2xl text-black font-medium float-left hover:cursor-pointer tracking-tight  dark:text-white">
            Projects
          </p>
          {/* <button className="text-white bg-blue-700 float-right  hover:bg-blue-800 ml-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create New Project
          </button> */}
          <div className=" w-15 h-5">
            <CreateProject />
          </div>
        </div>

        {projects.length > 0 ? (
          <Table
            labels={["Name", "Key", "Type", "Lead"]}
            data={projects}
            keys={["projectname", "projectkey", "projecttype", "projectlead"]}
            onClick={[handleOpenproject, "", "", ""]}
            sort={true}
            id="_id"
            search={true}
          />
        ) : (
          <p>NO PROJECTS</p>
        )}
      </div>
    </div>
  );
}
