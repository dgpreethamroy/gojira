import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./task";
const Container = styled.div`
  margin: 8px;
  border: 2px solid lightgrey;
  border-radius: 2px;
  width: 320px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
// const Container = ({ children, ...props }) => {
//   return (
//     <div
//       {...props}
//       className="m-2 border border-gray-300 rounded w-80 flex flex-col bg-white"
//     >
//       {children}
//     </div>
//   );
// };

console.log("CC", Container);
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${(props) =>
    props.isDraggingOver ? "lightgrey" : "inherit"};
`;
const column = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Title>{props.column.title}</Title>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default column;
