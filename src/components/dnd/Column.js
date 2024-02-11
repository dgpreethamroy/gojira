import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
const Container = styled.div`
  margin: 8px;
  border-radius: 7px;
  background-color: white;
  border: 2px solid lightgrey;
  padding-top: 10px;
  min-height: 320px;
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h5`
  background-color: white;
  border-radius: 2px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const TaskList = styled.div`
  padding: 8px;
  border-radius: 7px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  background-color: white;
  align-items: center;
  min-height: 100px;
`;

const Column = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Title>
            <div
              className={`inline-flex px-2 rounded whitespace-pre-wrap
            ${
              (props.column.title === "To Do" &&
                "text-[#42526E]  bg-[#EAE6FF]") ||
              (props.column.title === "In Progress" &&
                "text-[#0052CC] bg-[#e3efff]") ||
              (props.column.title === "In Review" &&
                "text-[#A22E24] bg-[#f4d1ce]") ||
              (props.column.title === "Done" && "text-[#006644] bg-[#d2fbd0]")
            }`}
            >
              <p id={props.column.id}>
                {props.tasks.length ? ` ${props.tasks.length} - ` : ""}
              </p>
              <span
                onFocus={(e) => {
                  document.getElementById(props.column.id).style.display =
                    "none";
                  e.target.children[0].style.width =
                    e.target.parentElement.parentElement.offsetWidth + "px";
                  e.target.children[0].style.padding = "8px";
                }}
                onBlur={(e) => {
                  document.getElementById(props.column.id).style.display =
                    "block";
                  e.target.children[0].style.width = "auto";
                  e.target.children[0].style.padding = "0px";
                }}
                contenteditable="true"
              >
                <p className="hover:cursor-pointer">{props.column.title}</p>
              </span>
            </div>
          </Title>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    parenttitle={props.column.title}
                    projectmembers={props.projectmembers}
                  />
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

export default Column;
