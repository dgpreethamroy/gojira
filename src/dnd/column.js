import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
const Container = styled.div`
  margin: 8px;
  border-radius: 7px;
  background-color: white ;
  border: 2px solid lightgrey;
  padding-top:10px;
  min-height:320px;
  width: 320px;
  display: flex;
  flex-direction: column;
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
const Title = styled.h5`
  background-color: white ;
  border-radius:2px;
  padding-left:10px;
  padding-top:10px;
  padding-bottom:10px;
`;
const TaskList = styled.div`
  padding-left:8px;
  padding-right:8px;
  padding-top:8px;
  padding-bottom:8px;
  border-radius:7px;
 
  transition: background-color 0.2s ease;
  flex-grow: 1;
  background-color:white;
  align-items:center;
  min-height: 100px;
 
`;

// background-color: ${(props) =>
//   props.isDraggingOver ? "lightgrey" : "inherit"};

  const column = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Title>
            <div className={`inline-flex px-2 rounded  
            ${(props.column.title==='To Do' && 'text-[#42526E]  bg-[#EAE6FF]') ||
            (props.column.title==='In Progress' && 'text-[#0052CC] bg-[#e3efff]')||
            (props.column.title==='In Review' &&'text-[#A22E24] bg-[#f4d1ce]')||
            (props.column.title==='Done' && 'text-[#006644] bg-[#d2fbd0]')
            }`}>
            {props.column.title} {props.tasks.length ? `- ${props.tasks.length}`:''}
            </div>  
          </Title>
          <Droppable
          
           droppableId={props.column.id} type="task"  >
            {(provided, snapshot) => (
              <TaskList
              className={` 
              ${(props.column.title==='To Do' && 'scrollbar1') ||
              (props.column.title==='In Progress' && 'scrollbar2')||
              
              (props.column.title==='In Review' && 'scrollbar2')||
              (props.column.title==='Done' && 'scrollbar2')
              }`}
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
