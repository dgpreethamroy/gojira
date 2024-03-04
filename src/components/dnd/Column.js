import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { Dropdown, IconButton } from "rsuite";
import MoreIcon from "@rsuite/icons/More";

const Container = styled.div`
  border-radius: 7px;
  background-color: #f2f2f2;
  border: 2px solid lightgrey;
  border-top: 0px;
  min-height: 420px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h5`
  background-color: #f2f2f2;
  border-top: 2px solid lightgrey;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const TaskList = styled.div`
  padding: 8px;
  border-radius: 7px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  background-color: #f2f2f2;
  align-items: center;
  min-height: 100px;
`;
// const randomColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
//   Math.random() * 256
// )},${Math.floor(Math.random() * 256)})`;
// const lightrandomColor = randomColor.replace(")", ", 0.25)").replace("b", "ba");

const renderIconButton = (props, ref) => {
  return (
    <IconButton
      style={{ padding: "0em" }}
      {...props}
      ref={ref}
      icon={
        <MoreIcon
          style={{
            fontSize: "2.5em",
            color: "rgb(0, 0, 0)",
            background: "#f2f2f2",
          }}
        />
      }
    />
  );
};

const Column = (props) => {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
  const lightrandomColor = randomColor
    .replace(")", ", 0.25)")
    .replace("b", "ba");
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          className="hover-crap mx-2"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Title className="flex justify-between items-center border-b-2 border-gray-400 z-20 sticky top-[-2px]  ">
            <div
              className={`inline-flex px-2 rounded whitespace-pre-wrap 
            ${
              (props.column.title === "To Do" &&
                "text-[#42526E]  bg-[#EAE6FF]") ||
              (props.column.title === "In Progress" &&
                "text-[#0052CC] bg-[#e3efff]") ||
              (props.column.title === "In Review" &&
                "text-[#A22E24] bg-[#f4d1ce]") ||
              (props.column.title === "Done" &&
                "text-[#006644] bg-[#d2fbd0]") ||
              `text-[#006644]`
            }`}
              style={
                !["To Do", "In Progress", "In Review", "Done"].includes(
                  props.column.title
                )
                  ? { backgroundColor: lightrandomColor, color: randomColor }
                  : null
              }
            >
              <p id={props.column.id}>
                {props.tasks.length ? ` ${props.tasks.length} - ` : ""}
              </p>
              <span
                onFocus={(e) => {
                  document.getElementById(props.column.id).style.display =
                    "none";
                  e.target.children[0].style.width =
                    e.target.parentElement.parentElement.offsetWidth * 0.65 +
                    "px";
                  e.target.children[0].style.paddingLeft = "8px";
                  e.target.children[0].style.paddingRight = "8px";
                  e.target.children[0].style.paddingTop = "5px";
                  e.target.children[0].style.paddingBottom = "5px";
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

            <div className=" z-10 hide-now px-4">
              <Dropdown renderToggle={renderIconButton}>
                <Dropdown.Item onClick={props.handleColumnDelete}>
                  Delete
                </Dropdown.Item>
              </Dropdown>
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
