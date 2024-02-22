import { useState } from "react";
import { SelectPicker } from "rsuite";
import Modal from "../ui/modal/Modal";
import "rsuite/dist/rsuite.min.css";
import { Issuedata, status_data, labels_data } from "../../assets/CommonData";
import customAxios from "../../api/axios";
import Avatar from "react-avatar";
import Dropdown from "../ui/dropdown/Dropdown";
export default function CreateIssue({
  modal,
  setModal,
  projectinfo,
  user,
  setIssuecreated,
}) {
  console.log("Create Issue");
  console.log(status_data);
  const [drop1, setDrop1] = useState(Issuedata[0]);
  const [drop2, setDrop2] = useState(status_data[0]);

  const assignee = projectinfo?.projectmembers?.map((member) => {
    return { label: member.name, value: member.id, email: member.email };
  });
  const [warn, setWarn] = useState(false);
  const [status, setStatus] = useState(" Select an option ");
  const [issuetype, setIssuetype] = useState("Select an option");
  const [Assignee, setAssignee] = useState("UnAssigned");
  const [labels, setLabels] = useState([]);
  const [issueIcon, setIssueIcon] = useState(Issuedata[0].icon);

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
        labels: [labels],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setModal(false);
    setIssuecreated((prev) => !prev);
    console.log("Issue Created");
    window.location.reload();
    return false; // prevent the default form submission behavior
  };
  const handleWarning = () => {
    return (
      <Modal isOpen={warn} setIsOpen={setWarn} small>
        <Modal.Header>Your Changes won't be saved</Modal.Header>
        <span className="text-lg ">
          We won’t be able to save your data if you move away from this page
        </span>
        <Modal.Footer>
          <button
            onClick={() => {
              setWarn(false);
            }}
            className="text-lg  px-4 py-2 text-gray-500 font-bold underline"
          >
            Go Back
          </button>
          <button
            onClick={() => {
              setWarn(false);
              setModal(false);
            }}
            className="px-2 py-1 text-white bg-blue-800 rounded font-bold text-lg"
          >
            Discard issue
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Modal isOpen={modal} setIsOpen={setModal}>
      <Modal.Header close={true} minimize={true}>
        Create issue
      </Modal.Header>
      <>
        <div className="after:content-['*'] after:text-red-800">
          Required fields are marked with an asterisk{" "}
        </div>
        <br />
        <p className="font-semibold">Issue type</p>
        <Dropdown
          data={Issuedata}
          drop={drop1}
          setDrop={setDrop1}
          icon={true}
        />
        <br />
        <p className="font-semibold">Status</p>
        <Dropdown data={status_data} drop={drop2} setDrop={setDrop2} />
        <br />
        <p className="font-semibold">Summary</p>
        <input
          type="text"
          id="summary"
          name="title"
          placeholder="Title"
          className="w-full p-2 border-2 border-gray-200 rounded"
        />
        <br />
        <p className="font-semibold">Description</p>{" "}
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          className="w-full p-2 border-2 border-gray-200 rounded-md"
        ></textarea>
        <br />
        <div className="flex flex-col">
          <p className="font-semibold">Assignee </p>
          <Dropdown
            data={assignee}
            drop={Assignee}
            setDrop={setAssignee}
            option="label"
            splitOption="email"
            avatar={true}
          />
          <span
            onClick={() => {
              setAssignee({ label: user.name, id: user.id });
            }}
            className="font-bold w-[14%] text-base text-blue-600 hover:underline hover:cursor-pointer"
          >
            Assign to me
          </span>
        </div>
        <br />
        <p className="font-semibold">Labels</p>
        <Dropdown
          data={labels_data}
          drop={labels}
          setDrop={setLabels}
          option="label"
          multiple={true}
        />
        <br />
      </>
      <Modal.Footer>
        <button
          className=" bg-blue-800 text-white px-2 py-2 rounded font-bold text-lg"
          onClick={() => setWarn(true)}
        >
          Cancel
        </button>
        {handleWarning()}
      </Modal.Footer>
    </Modal>
  );
}
