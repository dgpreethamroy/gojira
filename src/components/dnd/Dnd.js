import React, { useEffect, useRef, useState } from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import axios from "../../api/axios";
import { XIcon, CheckIcon } from "@heroicons/react/solid";

const Container = styled.div`
  display: flex;
`;
const handleToggleNew = (e) => {
  console.log("handleToggleNew");
  document.getElementById("createColumn").style.display = "none";
  document.getElementById("createColumnDiv").style.display = "block";
  document.getElementById("DnDParent").scrollLeft =
    document.getElementById("DnDParent").scrollWidth;
  document.getElementById("createColumnInput").focus();
};

const handleCancelEdit = (e) => {
  document.getElementById("createColumn").style.display = "block";
  document.getElementById("createColumnDiv").style.display = "none";
};
const Dnd = ({
  state,
  setState,
  project_id,
  projectmembers,
  inputSearch,
  parent,
}) => {
  const [minimapwidth, setMiniMapWidth] = useState(0);
  const miniMap = useRef(null);

  useEffect(() => {
    const mapwidth =
      parent?.current?.clientWidth / parent?.current?.scrollWidth;
    if (mapwidth !== NaN) setMiniMapWidth(mapwidth);
  }, []);
  const handleColumnDelete = (deletecolumn) => {
    let NewState = {
      ...state,
      columnOrder: state.columnOrder.filter(
        (column) => column !== deletecolumn
      ),
      columns: { ...state.columns, [deletecolumn]: undefined },
    };
    setState(NewState);
    handlenewState(NewState);
    //window.location.reload();
  };

  console.log("Dnd Component");
  const handleSaveChanges = (e) => {
    console.log("handleSaveChanges");
    const columnTitle = document.getElementById("createColumnInput").value;
    const columnId = `column-${Object.keys(state.columns).length + 1}`;
    const newColumn = {
      id: columnId,
      title: columnTitle,
      taskIds: [],
    };
    const newState = {
      ...state,
      columns: { ...state.columns, [columnId]: newColumn },
      columnOrder: [...state.columnOrder, columnId],
    };
    debugger;
    setState(newState);
    handlenewState(newState);
    document.getElementById("createColumn").style.display = "block";
    document.getElementById("createColumnDiv").style.display = "none";
  };
  const onDragStart = (event) => {
    // console.log("onDragStart", event);
  };

  const onDragUpdate = (update) => {
    /// const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(state.tasks).length
    //   : 0;
    //document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    //document.body.style.backgroundColor= '#EAE6FF'
    //document.body.style.color = "orange";
  };

  const handlenewState = async (newState) => {
    console.log("newState", newState);
    try {
      const response = await axios.put("/projects", {
        project_id: project_id.id,
        issues: newState,
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      handlenewState(newState);
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(newTaskIds.indexOf(draggableId), 1);
      newTaskIds.splice(
        destination.index +
          (start.taskIds.length -
            mod_state.columns[source.droppableId].taskIds.length),
        0,
        draggableId
      );
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      handlenewState(newState);
      return;
    }
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(startTaskIds.indexOf(draggableId), 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    handlenewState(newState);
  };
  const searchAndFilterTasks = (tasks, columns, search_term) => {
    const matched_tasks = [];
    for (const task_id in tasks) {
      const task_details = tasks[task_id];
      const summary = task_details.summary || "";
      const description = task_details.description || "";
      const task_id_lower = task_id.toLowerCase();
      if (
        summary.toLowerCase().includes(search_term.toLowerCase()) ||
        description.toLowerCase().includes(search_term.toLowerCase()) ||
        task_id_lower.includes(search_term.toLowerCase())
      ) {
        matched_tasks.push(task_details);
      }
    }
    if (search_term === "") return columns;
    // Filter columns based on matched tasks
    const filtered_columns = {};
    for (const column_id in columns) {
      const column = columns[column_id];
      const filtered_taskIds = column.taskIds.filter((taskId) =>
        matched_tasks.some((task) => task.id === taskId)
      );
      if (filtered_taskIds.length > 0) {
        filtered_columns[column_id] = { ...column, taskIds: filtered_taskIds };
      } else {
        filtered_columns[column_id] = { ...column, taskIds: [] };
      }
    }

    // return { matched_tasks, filtered_columns };
    return filtered_columns;
  };
  const mod_state = {
    ...state,
    columns: searchAndFilterTasks(state.tasks, state.columns, inputSearch),
  };
  let mouseDown = false;
  let startX;
  const offsetLeft = miniMap?.current?.offsetLeft;
  const handleStartDrag = (e) => {
    console.log("handleStartDrag", e);
    mouseDown = true;
    startX = e.pageX - miniMap.current.offsetLeft;
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleStopDrag);
  };
  const handleStopDrag = (e) => {
    console.log("handleStopDrag", e);
    mouseDown = false;
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleStopDrag);
  };
  const handleMove = (e) => {
    e.preventDefault();
    if (!mouseDown) return;
    if (
      e.pageX - startX + miniMap.current.clientWidth <
        mod_state.columnOrder.length * 24 &&
      offsetLeft <= e.pageX - startX
    ) {
      miniMap.current.style.left = e.pageX - startX + "px";
      parent.current.scrollLeft =
        (e.pageX - startX - offsetLeft) *
        ((parent.current.scrollWidth - parent.current.clientWidth) / 60);
    }
  };
  return (
    <>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={(e) => onDragStart(e)}
        onDragUpdate={onDragUpdate}
      >
        <Droppable droppableId="sfdaf" direction="horizantal" type="column">
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {mod_state.columnOrder.map((columnId, index) => {
                const column = mod_state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => mod_state.tasks[taskId]
                );
                return (
                  <Column
                    handleColumnDelete={handleColumnDelete}
                    projectmembers={projectmembers}
                    key={column.id}
                    column={column}
                    index={index}
                    tasks={tasks}
                  />
                );
              })}
              <div className="py-2 ">
                <button
                  onClick={handleToggleNew}
                  id="createColumn"
                  className="border-2 border-gray-300 w-8 rounded-md"
                >
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/plus-math.png" />
                </button>
                <div id="createColumnDiv" className="hidden ">
                  <input
                    id="createColumnInput"
                    className="mt-1 mb-1 px-2 h-14 border font-semibold text-lg border-gray-300 rounded-md w-[300px] "
                  />
                  <button
                    onClick={handleCancelEdit}
                    className="ml-2 p-2 text-red-600 hover:text-red-700 focus:outline-none bg-white"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="ml-2 p-2 text-green-600 hover:text-green-700 focus:outline-none bg-white"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      <div className="fixed bottom-10 right-20 flex bg-white p-2 shadow-2xl rounded">
        {mod_state.columnOrder.map((columnId, index) => {
          return (
            <div className=" my-1  mx-[2px] bg-gray-300 w-5 h-10 rounded"></div>
          );
        })}
        <div
          ref={miniMap}
          className="border-2 border-blue-800 h-12 rounded  absolute hover:cursor-move"
          style={{ width: 24 * mod_state.columnOrder.length * minimapwidth }}
          onMouseDown={handleStartDrag}
        ></div>
      </div>
    </>
  );
};
export default Dnd;
