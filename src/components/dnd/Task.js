import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import IssueDetails from "../issue/IssueDetails";
import Avatar from "react-avatar";
import { Issuedata } from "../../assets/CommonData";
import { Dropdown, IconButton } from "rsuite";
import MoreIcon from "@rsuite/icons/More";
import customAxios from "../../api/axios";
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 7px;
  padding: 8px;
  padding-bottom: 0px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging ? "#b3ffb3" : "rgb(250,250,250)"};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.02);
  &:hover {
    background-color: #99ccff;
  }
`;
const renderIconButton = (props, ref) => {
  return (
    <IconButton
      style={{ padding: "0em" }}
      {...props}
      ref={ref}
      icon={
        <MoreIcon
          style={{
            fontSize: "2em",
            color: "rgb(0, 0, 0)",
            background: "rgb(255, 255, 255)",
          }}
        />
      }
    />
  );
};
const Task = (props) => {
  const [showIssue, setShowIssue] = React.useState(false);
  const assignee_name = props.projectmembers.filter(
    (obj) => obj.id === props.task.assignee
  )[0].name;
  const Icon = Issuedata.filter((obj) => obj.label === props.task.issuetype)[0]
    .icon;

  // handle Delete Event

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await customAxios.delete("/issues", {
        data: { id: props.task.id },
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
    e.preventDefault();
    return false; // prevent the default form submission behavior
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          className="shake hover-crap" //shake here
          onClick={(e) =>
            !e.target.classList.contains("rs-icon") &&
            !e.target.classList.contains("rs-dropdown-item") &&
            setShowIssue(!showIssue)
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="flex items-center justify-between">
            <p className="text-black font-semibold py-2">
              {props.task.summary}
            </p>
            <div className="z-10 hidenow">
              <Dropdown renderToggle={renderIconButton}>
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <div className="py-2">
            {props.task.labels.map(
              (label) =>
                label && (
                  <span
                    className="bg-gray-200 text-black px-2 mx-1 py-1 rounded"
                    key={label}
                  >
                    {label}
                  </span>
                )
            )}
          </div>
          <div className="pt-2 flex justify-between items-start">
            <div className="flex items-center">
              {Icon}
              <span
                className={`font-semibold text-black ${
                  props.parenttitle === "Done" && "line-through"
                }`}
              >
                {props.task.issuetype.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col items-end justify-end">
              <Avatar
                className="hover-div"
                name={assignee_name}
                textSizeRatio={2}
                size="28"
                round={true}
              />
              <span className=" hide-div text-black italic font-bold">
                Assignee: {assignee_name}
              </span>
            </div>
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
