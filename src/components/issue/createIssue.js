import { useEffect, useState } from "react";
import { Modal, Button, SelectPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Issuedata, status_data, labels_data } from "../../assets/CommonData";
import customAxios from "../../api/axios";
import Avatar from "react-avatar";
export default function CreateIssue({
  modal,
  setModal,
  projectinfo,
  user,
  setIssuecreated,
  setIsMinimized,
}) {
  const handleClose = () => setModal(false);
  console.log("Create Issue");
  console.log(status_data);
  const assignee = projectinfo?.projectmembers?.map((member) => {
    return { label: member.name, value: member.id, email: member.email };
  });
  const [warn, setWarn] = useState(false);
  const [status, setStatus] = useState(" Select an option ");
  const [issuetype, setIssuetype] = useState("Select an option");
  const [Assignee, setAssignee] = useState("UnAssigned");
  const [labels, setLabels] = useState("Select an option");
  const [icon, setIcon] = useState("UnAssigned");
  const [issueIcon, setIssueIcon] = useState(Issuedata[0].icon);
  const defaultvalues = {
    issuetype: "Bug",
    status: "To Do",
    summary: "TADA",
    description: "Only Lights",
  };
  const URL = "/issues/";

  const renderMenuItem = (label, item) => {
    return (
      <div className="inline-flex items-center ">
        <div className="pr-5">{item.icon}</div>
        <div className="font-semibold">{label}</div>
      </div>
    );
  };
  const handleCreateIssue = async () => {
    if (
      status === "Select an option" ||
      issuetype === "Select an option" ||
      Assignee === "Select an option" ||
      document.getElementById("summary").value === "" ||
      document.getElementById("description").value === ""
    ) {
      alert("Please fill all the required fields");
      return;
    }
    try {
      const response = await customAxios.post(URL, {
        project_id: projectinfo._id,
        issuetype: issuetype,
        status: status,
        summary: document.getElementById("summary").value,
        description: document.getElementById("description").value,
        assignee: Assignee,
        labels: labels,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setModal(false);
    setIssuecreated((prev) => !prev);
    console.log("Issue Created");
  };
  const handleWarning = () => {
    return (
      <Modal backdrop="static" open={warn}>
        <Modal.Title>Your Changes won't be saved</Modal.Title>
        <Modal.Body>
          We won’t be able to save your data if you move away from this page.
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setWarn(false);
              document.getElementsByClassName(
                "rs-modal-wrapper"
              )[0].style.zIndex = "1050";
            }}
          >
            Go Back
          </Button>
          <Button
            onClick={() => {
              setWarn(false);
              setModal(false);
            }}
          >
            Discard issue
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Modal backdrop="static" open={modal} size="55rem">
      <Modal.Header as="h3" className="text-black" closeButton={false}>
        Create issue
        <Button
          className="float-right rs-btn-bgwhite"
          onClick={() => {
            setModal(false);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <path
              d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z"
              fill="currentColor"
            ></path>
          </svg>
        </Button>
        <Button
          onClick={() => {
            setIsMinimized((prev) => !prev);
            handleClose();
          }}
          className="float-right rs-btn-bgwhite"
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios-filled/50/minus-math.png"
            alt="minus-math"
          />
        </Button>
      </Modal.Header>
      <hr />
      <Modal.Body className="text-black">
        <div className="after:content-['*'] after:text-red-800">
          Required fields are marked with an asterisk{" "}
        </div>
        <br />
        <div className="flex flex-col">
          <label
            className="after:content-['*'] after:text-red-800  font-semibold"
            htmlFor="type"
          >
            Issue Type
          </label>
          <SelectPicker
            data={Issuedata}
            value={issuetype}
            onChange={setIssuetype}
            style={{ width: 280 }}
            label={issueIcon}
            onSelect={(value, item) => {
              setIssueIcon(item.icon);
            }}
            renderMenu={(menu) => <div>{menu}</div>}
            renderMenuItem={(label, item) => renderMenuItem(label, item)}
          />
        </div>
        <br />
        <hr />
        <div className="flex flex-col">
          <label
            className="after:content-['*'] after:text-red-800  font-semibold"
            htmlFor="type"
          >
            Status
          </label>
          <SelectPicker
            searchable={false}
            data={status_data}
            value={status}
            onChange={setStatus}
            placeholder="To Do"
            style={{ width: 280 }}
          />
          <span className="text-xs">
            This is the issue's initial status upon creation
          </span>
        </div>
        <br />
        <div>
          <label
            className="after:content-['*'] font-semibold after:text-red-800"
            htmlFor="title"
          >
            Summary{" "}
          </label>
          <input
            type="text"
            id="summary"
            name="title"
            placeholder="Title"
            className="w-full p-2 border-2 border-gray-200 rounded-md"
          />
        </div>
        <br />
        <div>
          <label
            className="after:content-['*'] font-semibold after:text-red-800"
            htmlFor="description"
          >
            Description{" "}
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            className="w-full p-2 border-2 border-gray-200 rounded-md"
          ></textarea>
        </div>
        <br />
        <div className="flex flex-col">
          <label className=" font-semibold" htmlFor="priority">
            Assignee{" "}
          </label>
          <SelectPicker
            searchable={true}
            data={assignee}
            value={Assignee}
            placeholder={Assignee}
            onChange={setAssignee}
            onSelect={(value, item) => {
              setIcon(item.label);
            }}
            style={{ width: 280 }}
            label={
              <Avatar textSizeRatio={2} name={icon} size="30" round={true} />
            }
            renderMenu={(menu) => <div>{menu}</div>}
            renderMenuItem={(label, props) => (
              <div className="inline-flex items-center ">
                <div className="pr-5">
                  <Avatar
                    textSizeRatio={2}
                    name={label}
                    size="30"
                    round={true}
                  />
                </div>
                <div>
                  <p className="font-semibold">{label}</p>
                  <p className="text-xs mt-0">{props.email}</p>
                </div>
              </div>
            )}
          />
          <span
            onClick={() => {
              setIcon(user.name);
              setAssignee(user.name);
            }}
            className="font-bold w-[14%] text-base text-blue-600 hover:underline hover:cursor-pointer"
          >
            Assign to me
          </span>
        </div>
        <br />
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="type">
            Labels
          </label>
          <SelectPicker
            data={labels_data}
            value={labels}
            onChange={setLabels}
            placeholder="Select an option"
            style={{ width: 280 }}
          ></SelectPicker>
        </div>
        <br />
        <div></div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setWarn(true);
            document.getElementsByClassName(
              "rs-modal-wrapper"
            )[0].style.zIndex = "999";
          }}
        >
          Cancel
        </Button>
        {handleWarning()}
        <Button onClick={handleCreateIssue} appearance="primary">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
