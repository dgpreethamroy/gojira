import React, { useRef } from "react";
import Modal from "../ui/modal/Modal";
import {
  Issuedata,
  status_data,
  checkIcon,
  closeIcon,
} from "../../assets/CommonData";
import { useState } from "react";
import Dropdown from "../ui/dropdown/Dropdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Avatar from "react-avatar";
import { PriorityIcons } from "../../assets/CommonData";
import Popover from "../ui/popover/Popover";

const IssueModal = ({
  details,
  showIssue,
  setShowIssue,
  setSelectIssue = null,
}) => {
  const [summary, setSummary] = useState(
    details?.task?.summary ? details.task.summary : "Summary"
  );
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
  const handleCalendar = (val, event) => {
    onChange(val);
    setIsCalendarOpen(false);
    event.stopPropagation();
  };
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
      bodyHeight={350}

    >
      <Modal.Header close={true}  >
        <div className="flex items-center my-2  ">
          <div className="flex items-center ">
            {Issuedata.map((item) => {
              if (item.value === details.task.issuetype) {
                return item.icon;
              }
              return null;
            })}
            <p className="text-sm text-gray-500 p-2">
              {details.task.id.toUpperCase()}
            </p>
          </div>
          {/* <div className="flex ">
            <button className="text-sm flex items-center px-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency/48/link.png"
                alt="link"
              />
              Copy Link
            </button>
            <button className="text-sm px-2">Give Feedback</button>
          </div> */}
        </div>
      </Modal.Header>
      <div className="flex h-full  ">
        <div className="w-[60%]">
          <div id="Issuesummary" className=" ">
            <p className="pl-2 text-gray-500 ">Summary : </p>
            <input
              className="w-full px-2 py-2 font-semibold text-xl outline-none bg-white hover:bg-slate-200 rounded border-2 border-white focus:border-blue-500 focus:border-2"
              onBlur={() => {
                issueRef.current.style.display = "none";
              }}
              onFocus={(e) => {
                issueRef.current.style.marginLeft =
                  e.currentTarget.offsetWidth - 70 + "px";
                issueRef.current.style.display = "flex";
              }}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <div
              className="items-center float-right h-0 absolute hidden  mt-6"
              ref={issueRef}
            >
              {checkIcon} {closeIcon}
            </div>
          </div>
          <div id="IssueDescription" className="">
            <p className="pl-2 mt-4 text-gray-500">Description</p>
            {isopened ? (
              <div className="flex flex-col ">
                <div className=" my-2">

                  <ReactQuill ref={quillRef} theme="snow" value={description} className=" bg-gray-200 h-40 overflow-y-scroll border-red-700 " />
                </div>
                <div className=" ">
                  <button
                    className="px-4 py-1 bg-blue-700 text-white rounded m-1 cursor-pointer"
                    onClick={handleSaveDescription}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-1 text-black bg-white hover:bg-slate-200 rounded m-1 cursor-pointer"
                    onClick={handleCloseDescription}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p
                className="px-2 py-2 hover:bg-slate-200"
                onClick={handleClickDescription}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="w-[40%] px-2 overflow-y-auto ">
          <div className="text-sm">
            STATUS
            <Dropdown data={status_data} drop={status} setDrop={setStatus} />
          </div>
          <br />
          <div className="">
            <div className="py-2 px-4  border-2 border-[#DFE1E6] rounded-t-lg   hover:bg-slate-200">
              <div
                className="flex items-center justify-between hover:cursor-pointer"
                onClick={() => setDetailsOpen(!isdetailsOpened)}
              >
                {isdetailsOpened ? (
                  <p className="text-gray-900 font-semibold">Details</p>
                ) : (
                  <span className="flex items-center">
                    <p className="text-gray-900 font-semibold">Details</p>
                    <p className="truncate w-[320px] px-2 text-xs">
                      Assignee,Reporter,Created,Updated,Priority,Labels,Watchers,Due
                      Date
                    </p>
                  </span>
                )}
                <img
                  width="16"
                  height="16"
                  src={`https://img.icons8.com/ios/50/${isdetailsOpened ? "collapse" : "expand"
                    }-arrow--v1.png`}
                  alt="expand-arrow--v1"
                />
              </div>
            </div>
            {isdetailsOpened && (
              <div className="py-2 border border-x-[2px] border-b-2 border-t-0  border-[#DFE1E6] ">
                <div className="flex px-4 py-1 items-center">
                  <p className="w-1/2 text-sm font-semibold text-gray-900">
                    Assignee
                  </p>
                  {details.projectmembers.map((item) => {
                    if (item.id === details.task.assignee) {
                      return (
                        <div className="flex p-2 hover:bg-slate-200 w-1/2 rounded items-center">
                          <Avatar
                            key={item.id}
                            name={item.name}
                            round
                            size="30"
                          />
                          <p className="pl-2">{item.name}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex px-4 py-1 items-center">
                  <p className="w-1/2 text-sm font-semibold text-gray-900">
                    Labels
                  </p>
                  <div className="w-1/2 flex flex-wrap hover:bg-slate-300  min-h-10 items-center rounded ">
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
                  <p className="w-1/2 text-sm font-semibold text-gray-900">
                    Created
                  </p>
                  {details.task.created ? (
                    details.task.created
                  ) : (
                    <p
                      id="Created"
                      className="w-1/2 flex items-center m-1 p-1 hover:bg-slate-200 rounded h-10  hover:cursor-pointer"
                      onClick={() => setIsCalendarOpen(true)}
                    >
                      {value.toDateString()}
                      <Popover target='Created' dir="right">
                        <p>'asassd'</p>
                      </Popover>
                    </p>
                  )}
                </div>
                <div className="flex px-4 py-1 items-center">
                  <p className="text-sm font-semibold w-1/2">Due Date</p>
                  {details.task.duedate ? (
                    details.task.duedate
                  ) : (
                    <p
                      id="Due"
                      className=" flex items-center m-1 p-1 hover:bg-slate-200 rounded h-10 w-auto hover:cursor-pointer"
                      onClick={() => setIsCalendarOpen(true)}
                    >
                      {value.toDateString()}
                      {isCalendarOpen && (
                        "gfn"
                      )}
                    </p>
                  )}
                </div>
                <div className="flex px-4 py-1 items-center">
                  <p className="text-sm font-semibold w-1/2">Priority</p>

                  <div className=" flex items-center pr-2 hover:bg-slate-200 rounded h-10 w-auto">
                    <div className="w-5 h-5 mx-1">
                      {PriorityIcons[details.task.priority]}
                    </div>
                    <div>
                      {details.task.priority}

                    </div>

                  </div>


                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Modal.Footer close={true}>Required Fields are marked *</Modal.Footer> */}
    </Modal >
  );
};
export default IssueModal;
