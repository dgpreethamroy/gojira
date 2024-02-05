import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import CreateIssue from "../issue/createIssue";
import { Sidebar } from "./sidebar";
import "rsuite/dist/rsuite.min.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export default function Project(props) {
  const [todos, setTodos] = React.useState({});
  const { auth, currentUser } = React.useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [td, setTd] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);
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
      if (td.length === 0 && todolist) setTd(todolist);
      if (inprogress.length === 0 && inprogresslist)
        setInprogress(inprogresslist);
      if (done.length === 0 && donelist) setDone(donelist);
      console.log("ISSUES", groupByStatus(todos.projectissues));
    }
  }
  const handleOnDragEnd = (result) => {
    const items = Array.from(td);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setTd(items);
    }
  };
  const id = useParams();
  useEffect(() => {
    const getProjects = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`/projects/${id.id}`, {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          });
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
              token={auth.accessToken}
            />
          )}

          <div
            id="projectsdisplay"
            className="p-4  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
          >
            <div className="grid grid-cols-3 gap-3  mb-4">
              <div className="col-span-1  ">
                <p className="font-bold text-md">TODO - {td.length}</p>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {td.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                >
                                  <div id="card1">
                                    {
                                      <Card
                                        head={"TO DO"}
                                        key={item._id}
                                        issuetype={item.issuetype}
                                        issuedescription={item.description}
                                        issuelabel={item.labels}
                                      />
                                    }
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              <div className="col-span-1">
                <p className="font-bold text-md">
                  IN PROGRESS - {inprogress.length}
                </p>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {inprogress.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                >
                                  <div id="card1">
                                    {
                                      <Card
                                        head={"TO DO"}
                                        key={item._id}
                                        issuetype={item.issuetype}
                                        issuedescription={item.description}
                                        issuelabel={item.labels}
                                      />
                                    }
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              <div className="col-span-1">
                <p className="font-bold text-md">
                  DONE - {done.length && done.length}
                </p>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {done.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                >
                                  <div id="card1">
                                    {
                                      <Card
                                        head={"TO DO"}
                                        key={item._id}
                                        issuetype={item.issuetype}
                                        issuedescription={item.description}
                                        issuelabel={item.labels}
                                      />
                                    }
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
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
