import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "#EAE6FF" : "white")};
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.02);
&:hover{
  background-color: #EAE6FF;
}
`;
const task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          className="shake"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.summary}
          <br />
          {props.task.description}
          <br />
          {props.task.issuetype}
          <br />
          {props.task.assignee}
        </Container>
      )}
    </Draggable>
  );
};
export default task;








