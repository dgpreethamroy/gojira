import React, { useRef } from "react";
import Modal from "../ui/modal/Modal";
import { Issuedata, status_data, checkIcon, closeIcon } from "../../assets/CommonData";
import { useState } from "react";
import Dropdown from "../ui/dropdown/Dropdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Avatar from "react-avatar";
import { PriorityIcons } from "../../assets/CommonData";
import Popover from "../ui/popover/Popover";

const IssueModal = ({ details, showIssue, setShowIssue, setSelectIssue = null, state }) => {
  const [summary, setSummary] = useState(details?.task?.summary ? details.task.summary : "Summary");
  const [description, setDescription] = useState(
    details?.task?.description ? details.task.description : "Description"
  );

  const [isopened, setIsOpen] = useState(false);
  const [status, setStatus] = useState(status_data[0]);
  const [isdetailsOpened, setDetailsOpen] = useState(true);
  const [value, onChange] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);

  const issueRef = useRef(null);
  const quillRef = useRef(null);
  const handleClickDescription = () => {
    setIsOpen(true);
  };
  const handleCloseDescription = () => {
    setIsOpen(false);
  };
  const handleSaveDescription = () => {
    setDescription(quillRef.current.getEditor().getText());
    setIsOpen(false);
  };
  const makeBidirectionalLinks = (tasks) => {
    const bidirectionalTasks = {};

    // Create bidirectional links
    Object.keys(tasks).forEach((taskId) => {
      const task = tasks[taskId];
      const linkedTasks = task.linkedtasks || [];

      linkedTasks.forEach((linkedTaskId) => {
        if (!bidirectionalTasks[linkedTaskId]) {
          bidirectionalTasks[linkedTaskId] = { "blocked by": [], blocks: [] };
        }
        if (!bidirectionalTasks[taskId]) {
          bidirectionalTasks[taskId] = { "blocked by": [], blocks: [] };
        }
        if (!bidirectionalTasks[linkedTaskId]["blocked by"].includes(taskId)) {
          bidirectionalTasks[linkedTaskId]["blocked by"].push(taskId);
        }
        if (!bidirectionalTasks[taskId]["blocks"].includes(linkedTaskId)) {
          bidirectionalTasks[taskId]["blocks"].push(linkedTaskId);
        }
      });

      // Add tasks with no linked tasks
      if (!bidirectionalTasks[taskId]) {
        bidirectionalTasks[taskId] = { "blocked by": [], blocks: [] };
      }
    });

    return bidirectionalTasks;
  };
  const linkedtasksMap = makeBidirectionalLinks(state);
  return (
    <Modal
      isOpen={showIssue}
      setIsOpen={setShowIssue}
      handleClosed={() => {
        if (setSelectIssue)
          setSelectIssue((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("selectedIssue", false);
            return newParams;
          });
      }}
      bodyHeight={350}>
      <Modal.Header close={true}>
        <div className="flex items-center my-2  ">
          <div className="flex items-center ">
            {Issuedata.map((item) => {
              if (item.value === details.task.issuetype) {
                return item.icon;
              }
              return null;
            })}
            <p className="text-sm text-gray-500 p-2">{details.task.id.toUpperCase()}</p>
          </div>
        </div>
      </Modal.Header>
      <div className="flex h-full">
        <div className="w-[60%] overflow-y-auto p-1">
          <div id="Issuesummary">
            <p className=" text-gray-500 ">Summary </p>
            <input
              className="w-full p-2 h-10 font-medium text-xl  outline-none bg-white hover:bg-slate-200 rounded border-2 border-gray-200 focus:border-blue-500 focus:border-2"
              onBlur={() => {
                issueRef.current.style.display = "none";
              }}
              onFocus={(e) => {
                issueRef.current.style.marginLeft = e.currentTarget.offsetWidth - 70 + "px";
                issueRef.current.style.display = "flex";
              }}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <div className="items-center float-right h-0 absolute hidden  mt-6" ref={issueRef}>
              {checkIcon} {closeIcon}
            </div>
          </div>
          <div id="IssueDescription" className="">
            <p className=" mt-5 text-gray-500">Description</p>
            {isopened ? (
              <div className="flex flex-col">
                <div className=" my-2">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={description}
                    className=" bg-gray-200 h-40 overflow-y-scroll border-red-700 "
                  />
                </div>
                <div className=" ">
                  <button
                    className="px-4 py-1 bg-blue-700 text-white rounded m-1 cursor-pointer"
                    onClick={handleSaveDescription}>
                    Save
                  </button>
                  <button
                    className="px-4 py-1 text-black bg-white hover:bg-slate-200 rounded m-1 cursor-pointer"
                    onClick={handleCloseDescription}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p
                className="px-2 py-2  border-2 border-gray-200  rounded hover:bg-slate-200"
                onClick={handleClickDescription}>
                {description}
              </p>
            )}
          </div>
          <div id="IssueLinks">
            <p className=" mt-4 text-gray-500 ">LinkedTasks </p>
            {linkedtasksMap[details.task.id]["blocked by"].length > 0 && (
              <div className="ml-2 flex flex-col gap-1">
                <p className=" text-blue-800">Is blocked by </p>
                {linkedtasksMap[details.task.id]["blocked by"].map((link) => (
                  <div className=" w-full bg-slate-200 rounded flex justify-between px-2 py-1">
                    <div className="flex items-center">
                      <div className="p-1">
                        {Issuedata.map((item) => {
                          if (item.value === state[link]["issuetype"]) {
                            return item.icon;
                          }
                          return null;
                        })}
                      </div>
                      <p className="p-1 uppercase">{link}</p>
                      <p className="p-1">{state[link].summary}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="p-1 size-10">{PriorityIcons[state[link]["priority"]]}</div>
                      {details.projectmembers.map(
                        (member) =>
                          member.id === state[link]["assignee"] && (
                            <Avatar name={member.name} round size="30" />
                          )
                      )}
                      {closeIcon}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {linkedtasksMap[details.task.id]["blocks"].length > 0 && (
              <div className="ml-2 flex flex-col gap-1">
                <p className=" text-blue-800">Blocks </p>
                {linkedtasksMap[details.task.id]["blocks"].map((link) => (
                  <div className=" w-full bg-slate-200 rounded flex justify-between px-2 py-1">
                    <div className="flex items-center">
                      <div className="p-1">
                        {Issuedata.map((item) => {
                          if (item.value === state[link]["issuetype"]) {
                            return item.icon;
                          }
                          return null;
                        })}
                      </div>
                      <p className="p-1 uppercase">{link}</p>
                      <p className="p-1">{state[link].summary}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="p-1 size-10">{PriorityIcons[state[link]["priority"]]}</div>
                      {details.projectmembers.map(
                        (member) =>
                          member.id === state[link]["assignee"] && (
                            <Avatar name={member.name} round size="30" />
                          )
                      )}
                      {closeIcon}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {linkedtasksMap[details.task.id]["blocked by"].length === 0 &&
              linkedtasksMap[details.task.id]["blocks"].length === 0 && (
                <p className=" p-1 font-medium text-red-800">No Linked Tasks</p>
              )}
          </div>
        </div>
        <div className="w-[40%]  overflow-y-auto p-1">
          <div className="text-sm text-gray-500">
            STATUS
            <Dropdown data={status_data} drop={status} setDrop={setStatus} />
          </div>
          <div className="mt-11">
            <div className="py-2 px-4  border-2 border-[#DFE1E6] rounded-t  overflow-hidden hover:bg-slate-200">
              <div
                className="flex items-center justify-between hover:cursor-pointer "
                onClick={() => setDetailsOpen(!isdetailsOpened)}>
                <div className="w-[95%]">
                  {isdetailsOpened ? (
                    <p className="text-gray-900 font-semibold w-full">Details</p>
                  ) : (
                    <div className="flex items-center w-full">
                      <p className="text-gray-900 font-semibold">Details</p>
                      <span className="truncate w-full px-2 text-xs">
                        Assignee,Reporter,Created,Updated,Priority,Labels,Watchers,Due Date
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-[5%]">
                  <img
                    width="16"
                    height="16"
                    src={`https://img.icons8.com/ios/50/${
                      isdetailsOpened ? "collapse" : "expand"
                    }-arrow--v1.png`}
                    alt="expand-arrow--v1"
                  />
                </div>
              </div>
            </div>
            {isdetailsOpened && (
              <div className="py-2 border border-x-[2px] border-b-2 border-t-0  border-[#DFE1E6] ">
                <div className="flex px-4 py-1 items-center">
                  <p className="w-1/2 text-sm font-semibold text-gray-900">Assignee</p>
                  {details.projectmembers.map((item) => {
                    if (item.id === details.task.assignee) {
                      return (
                        <div className="flex h-10 hover:bg-slate-200 w-1/2 rounded items-center overflow-hidden">
                          <Avatar key={item.id} name={item.name} round size="30" />
                          <p className="pl-2">{item.name}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex px-4 py-1 items-center">
                  <p className="w-1/2 text-sm font-semibold text-gray-900">Labels</p>
                  <div className="w-1/2 flex flex-wrap hover:bg-slate-300  min-h-10 items-center rounded overflow-hidden">
                    {details.task.labels.map((item) => {
                      return (
                        <p className="text-sm text-blue-600 m-1 p-1 w-auto bg-slate-200 hover:underline rounded">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="flex px-4 py-1 items-center">
                  <p className="w-1/2 text-sm font-semibold text-gray-900">Created</p>
                  <div className="w-1/2">
                    <p
                      id="Created"
                      className=" flex items-center  p-1 hover:bg-slate-200 rounded h-10 overflow-hidden hover:cursor-pointer">
                      {details.task.createdAt}
                    </p>
                    <Popover target="Created" dir="right">
                      <p>'asassd'</p>
                    </Popover>
                  </div>
                </div>
                <div className="flex px-4 py-1 items-center">
                  <p className="text-sm font-semibold w-1/2 text-gray-900 ">Due Date</p>

                  <div className="w-1/2 ">
                    <p
                      id="Due"
                      className="flex items-center  p-1 hover:bg-slate-200 rounded h-10  hover:cursor-pointer">
                      {details.task.DueDate}
                    </p>
                    <Popover target="Due" dir="right">
                      <p>'asassd'</p>
                    </Popover>
                  </div>
                </div>
                <div className="flex px-4 py-1 items-center">
                  <p className="text-sm font-semibold w-1/2">Priority</p>

                  <div className=" flex items-center pr-2 hover:bg-slate-200 rounded h-10 w-1/2">
                    <div className="w-5 h-5 mx-1">{PriorityIcons[details.task.priority]}</div>
                    <div className="pl-2">{details.task.priority}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Modal.Footer close={true}>Required Fields are marked *</Modal.Footer> */}
    </Modal>
  );
};
export default IssueModal;
