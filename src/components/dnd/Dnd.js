import React from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import axios from "../../api/axios";
import PlusIcon from "@rsuite/icons/Plus";
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
const Dnd = ({ state, setState, project_id, projectmembers }) => {
  const handleColumnDelete = (e) => {
    debugger;
    let deletecolumn =
      e.target.parentElement.parentElement.parentElement.previousSibling
        .children[0].id;
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
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
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
    startTaskIds.splice(source.index, 1);
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

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={(e) => onDragStart(e)}
      onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="sfdaf" direction="horizantal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
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
                className="border-2 border-gray-300  rounded-md"
              >
                <PlusIcon
                  style={{
                    borderRadius: "6px",
                    fontSize: "2em",
                    color: "rgb(50, 50, 50)",
                    background: "rgb(240, 240, 240)",
                  }}
                />
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
  );
};
export default Dnd;
