import React from "react";
import Draggable from "react-draggable";
const Container = ({ children }) => {
  return (
    <div className="rounded-xl p-2 mb-2 min-h-20 ml-2 mr-2 cursor-pointer flex justify-between flex-col">
      {children}
    </div>
  );
};
function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#FFFADA";
}

export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          isDraggable={snapshot.isDraggingOver}
          isBacklog={snapshot.draggingOverWith === "backlog"}
        >
          <div className="flex justify-start p-2 ">
            <span>
              <small>{task.id}</small>
            </span>
          </div>
          <div className="flex justify-start p-2">
            <span>
              <small>{task.title}</small>
            </span>
          </div>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
};
