import React, { useEffect } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Avatar from "react-avatar";
import { Issuedata, menu_icon_dots, Delete_Icon } from "../../assets/CommonData";
import customAxios from "../../api/axios";
import IssueModal from "../issue/issueModal";
import Menu from "../ui/menu/Menu";
import { useParams, useSearchParams } from "react-router-dom";
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 7px;
  padding: 8px;
  padding-bottom: 0px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "#b3ffb3" : "rgb(250,250,250)")};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.02);
  &:hover {
    background-color: #99ccff;
  }
`;

const Task = (props) => {
  const [showIssue, setShowIssue] = React.useState(false);
  const [showassignee, setShowassignee] = React.useState(false);
  const [selectIssue, setSelectIssue] = useSearchParams({
    selectedIssue: null,
  });
  const assignee_name = props.projectmembers.filter((obj) => obj.id === props.task.assignee)[0]
    .name;
  const Icon = Issuedata.filter((obj) => obj.label === props.task.issuetype)[0].icon;

  /// handle selectIssue Filter
  const selectedIssue = selectIssue.get("selectedIssue");
  useEffect(() => {
    if (selectedIssue !== "null" && selectedIssue === props.task.id) {
      setShowIssue(true);
    }
    // Check if the unwanted query parameter exists and remove it
    if (selectIssue.has("selectedIssue") && selectIssue.get("selectedIssue") === "false") {
      // const updatedParams = new URLSearchParams(selectIssue);
      // updatedParams.delete("selectedIssue");
      // // Update the URL without the selectedIssue
      // window.history.replaceState(
      //   {},
      //   "",
      //   `${window.location.pathname}?${updatedParams}`
      // );
      window.history.replaceState({}, "", `${window.location.pathname}`);
    }
  }, [selectedIssue, selectIssue]);

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
  const menu_data = [
    {
      label: Delete_Icon,
      value: "Delete",
    },
  ];

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <>
          <Container
            className="shake hover-crap" //shake here
            onClick={(e) => {
              !["customMenu", "TaskMenu", "customMenuOption"].some((className) =>
                e.target.classList.contains(className)
              ) && setSelectIssue({ selectedIssue: props.task.id });
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}>
            <div className="flex items-center justify-between">
              <p className="text-black font-semibold py-2">{props.task.summary}</p>
              <div className=" hidenow">
                <Menu
                  name={menu_icon_dots}
                  data={menu_data}
                  downIcon={false}
                  buttonStyle={true}
                  align="left"
                  onClick={(e) => {
                    e.target.innerText === "Delete" && handleDelete(e);
                  }}
                />
              </div>
            </div>

            <div className=" flex flex-wrap gap-2 py-2">
              {props.task.labels.map(
                (label) =>
                  label && (
                    <span className="bg-gray-200 text-black px-2 mx-[1px] rounded" key={label}>
                      {label}
                    </span>
                  )
              )}
            </div>
            <div className="flex flex-col details">
              <div className="pt-2 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-5 w-5 flex items-center">{Icon}</div>
                  <span
                    className={`font-semibold text-black text-sm px-1 ${
                      props.parenttitle === "Done" && "line-through"
                    }`}>
                    {props.task.id.toUpperCase()}
                  </span>
                </div>
                <div
                  onMouseEnter={() => setShowassignee(true)}
                  onMouseLeave={() => setShowassignee(false)}>
                  <Avatar
                    className=" cursor-pointer"
                    name={assignee_name}
                    textSizeRatio={2}
                    size="28"
                    round={true}
                  />
                </div>
              </div>
              {showassignee ? (
                <span
                  className=" flex  justify-end py-1  text-black italic font-bold"
                  id="assignee">
                  Assignee: {assignee_name}
                </span>
              ) : (
                <div className="py-4"></div>
              )}
            </div>
          </Container>
          {showIssue && (
            <IssueModal
              details={props}
              showIssue={showIssue}
              setShowIssue={setShowIssue}
              setSelectIssue={setSelectIssue}
              state={props.state}
            />
          )}
        </>
      )}
    </Draggable>
  );
};
export default Task;
