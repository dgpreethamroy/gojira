import React from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import axios from "../../api/axios";
const Container = styled.div`
  display: flex;
`;

const Dnd = ({ state, setState, project_id, projectmembers }) => {
  console.log("Dnd Component");

  const onDragStart = (event) => {
    // console.log("onDragStart", event);
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
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
                  projectmembers={projectmembers}
                  key={column.id}
                  column={column}
                  index={index}
                  tasks={tasks}
                />
              );
            })}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Dnd;
