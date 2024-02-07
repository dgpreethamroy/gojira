import { useState } from "react";
import { Modal, Button, SelectPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import CloseIcon from "@rsuite/icons/Close";
import { Issuedata, status_data, labels_data } from "../../assets/CommonData";
import customAxios from "../../api/axios";
export default function CreateIssue({
  modal,
  setModal,
  projectinfo,
  user,
  setIssuecreated,
}) {
  console.log("Create Issue");
  console.log(projectinfo);
  const assignee = projectinfo.projectmembers.map((member) => {
    return { label: member, value: member };
  });
  const [warn, setWarn] = useState(false);
  const [status, setStatus] = useState("Select an option");
  const [issuetype, setIssuetype] = useState("Select an option");
  const [Assignee, setAssignee] = useState("Select an option");
  const [labels, setLabels] = useState("Select an option");
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
    console.log("Issue Created");
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
  };
  const handleWarning = () => {
    return (
      <Modal backdrop="static" open={true}>
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
              setModal(false);
            }}
          >
            Discard issue
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Modal backdrop="static" open={true} size="55rem">
      <Modal.Header as="h3" closeButton={false}>
        Create Issue
        <Button
          className="float-right"
          appearance="primary"
          onClick={() => {
            setModal(!modal);
          }}
        >
          <CloseIcon />
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
            searchable={false}
            data={assignee}
            value={Assignee}
            placeholder="Select an option"
            onChange={setAssignee}
            style={{ width: 280 }}
          />

          <span
            onClick={() => {
              setAssignee(user.username);
            }}
            className="font-bold w-[12%] text-base text-blue-600 hover:underline hover:cursor-pointer"
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
        {warn && handleWarning()}
        <Button
          onClick={() => {
            handleCreateIssue();
          }}
          appearance="primary"
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
