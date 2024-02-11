import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import IssueDetails from "../issue/IssueDetails";
import Avatar from "react-avatar";
import { Issuedata } from "../../assets/CommonData";
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "inherit" : "white")};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.02);
  &:hover {
    background-color: #eae6ff;
  }
`;
const Task = (props) => {
  const [showIssue, setShowIssue] = React.useState(false);
  const assignee_name = props.projectmembers.filter(
    (obj) => obj.id === props.task.assignee
  )[0].name;
  const Icon = Issuedata.filter((obj) => obj.label === props.task.issuetype)[0]
    .icon;
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          className="shake"
          onClick={() => setShowIssue(!showIssue)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <p className="text-black font-semibold py-2">{props.task.summary}</p>
          <div className="py-2">
            {props.task.labels.map(
              (label) =>
                label && (
                  <span
                    className="bg-gray-200 text-black px-2 py-1 rounded"
                    key={label}
                  >
                    {label}
                  </span>
                )
            )}
          </div>
          <div className="py-2 ">
            {Icon}
            <span
              className={`font-semibold ${
                props.parenttitle === "Done" && "line-through"
              }`}
            >
              {props.task.issuetype.toUpperCase()}
            </span>
            <Avatar
              className="float-right"
              name={assignee_name}
              textSizeRatio={2}
              size="28"
              round={true}
            />
          </div>
          {showIssue && (
            <IssueDetails
              details={props}
              showIssue={showIssue}
              setShowIssue={setShowIssue}
            />
          )}
        </Container>
      )}
    </Draggable>
  );
};
export default Task;
