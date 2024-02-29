import React, { useState } from "react";
import Dropdown from "./dropdown/Dropdown";
import Table from "./table/Table";
import Modal from "./modal/Modal";
import Menu from "./menu/Menu";
import Popover from "./popover/Popover2";
import Tabs from "./tabs/Tabs";
const menu_data = [
  {
    label: (
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
      </svg>
    ),
    value: "Edit",
    onClick: function () {
      alert("Clic9ed");
    },
  },
  {
    label: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 4H12V12H4V4Z"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <path
          d="M8 8H16V16H8V8Z"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
      </svg>
    ),
    value: "Duplicate",
    onClick: "",
  },
  {
    label: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="5"
          y="8"
          width="10"
          height="8"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="4"
          width="12"
          height="4"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    ),
    value: "Archive",
    onClick: "",
  },
  {
    label: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
        <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
        <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
      </svg>
    ),
    value: "Move",
    onClick: "",
  },
  {
    label: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="5"
          y="6"
          width="10"
          height="10"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
        <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    ),
    value: "Delete",
    onClick: "",
  },
];
const table_data = [
  {
    projectissues: {
      tasks: {
        "task-18": {
          id: "task-18",
          summary: "TEst 22",
          description: "fsvbdsiuvbdjksvdu",
          issuetype: "Story",
          assignee: "65b3adff112f8c8b512da4f5",
          labels: ["research"],
        },
        "task-19": {
          id: "task-19",
          summary: "ffds",
          description: "ewdfdsdfdsdfdw",
          issuetype: "Bug",
          assignee: "65b3adff112f8c8b512da4f5",
          labels: ["content"],
        },
        "task-20": {
          id: "task-20",
          summary: "dfg",
          description: "egfgdfgfdgfdg",
          issuetype: "Bug",
          assignee: "65b3adff112f8c8b512da4f5",
          labels: ["customer-access"],
        },
        "task-21": {
          id: "task-21",
          summary: "vdsfds",
          description: "qdgfgfg",
          issuetype: "Bug",
          assignee: "65b3adff112f8c8b512da4f5",
          labels: ["design"],
        },
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "To Do",
          taskIds: ["task-21", "task-18", "task-19", "task-20"],
          _id: "65d0836286b40c3299c45f19",
        },
        "column-2": {
          id: "column-2",
          title: "In Progress",
          taskIds: [],
          _id: "65d0cc9acc02d9fb3b6260c8",
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: [],
          _id: "65d0421b76deee9240cb7ff1",
        },
        "column-4": {
          id: "column-4",
          title: "In Review",
          taskIds: [],
          _id: "65d0986f6d6d83e2adb413af",
        },
        "column-6": {
          id: "column-6",
          title: "take later",
          taskIds: [],
          _id: "65d091e26d6d83e2adb41245",
        },
      },
      columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-6"],
    },
    _id: "65b7c7978a75e6506833da80",
    projectname: "Fronx",
    projectdescription: "Modify the real axle to support extra weight",
    __v: 55,
    projectkey: "SCRUM",
    projecttype: "Team-managed software",
    projectlead: "Preetham Roy",
    projecttasks: [],
    projectmembers: [
      {
        id: "65b3adff112f8c8b512da4f5",
        name: "Preetham Roy",
        _id: "65c631200a7cdaa55ae92ecf",
        email: "preetham.roy2@gmail.com",
      },
      {
        id: "65c12653308c67170f17e2e0",
        name: "Pavan Mandala",
        _id: "65c63264643ee4d1c26fd86a",
        email: "pavankalyanm23@gmail.com",
      },
    ],
    projecttemplate: "SCRUM",
  },
  {
    projectissues: {
      tasks: {},
      columns: {
        "column-1": {
          id: "column-1",
          title: "To Do",
          taskIds: [],
          _id: "65d18bade383bef347a64b67",
        },
        "column-2": {
          id: "column-2",
          title: "In Progress",
          taskIds: [],
          _id: "65d18bade383bef347a64b68",
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: [],
          _id: "65d18bade383bef347a64b69",
        },
      },
      columnOrder: ["column-1", "column-2", "column-3"],
    },
    _id: "65b90f760c8ca73180ca1138",
    projectname: "Fortuner",
    projectdescription: "New Hybrid Break issues",
    projecttype: "Team-managed software",
    projectkey: "AGILE",
    __v: 3,
    projectlead: "Preetham Roy",
    projecttasks: [],
    projectmembers: [
      {
        id: "65b3adff112f8c8b512da4f5",
        name: "Preetham Roy",
        _id: "65c62e4e6a75b2c85ae10f7d",
      },
    ],
    projecttemplate: "SCRUM",
  },
  {
    projectissues: {
      tasks: {},
      columns: {
        "column-1": {
          id: "column-1",
          title: "To Do",
          taskIds: [],
          _id: "65d18bade383bef347a64b6c",
        },
        "column-2": {
          id: "column-2",
          title: "In Progress",
          taskIds: [],
          _id: "65d18bade383bef347a64b6d",
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: [],
          _id: "65d18bade383bef347a64b6e",
        },
      },
      columnOrder: ["column-1", "column-2", "column-3"],
    },
    _id: "65be77acc5e6691ec054bc8b",
    projectname: "Test1",
    projectdescription: "Testing",
    projecttasks: [],
    __v: 0,
    projectkey: "WATERFALL",
    projecttype: "Client-managed software",
    projectlead: "Pavan",
    projecttemplate: "SCRUM",
  },
];
const data = [
  {
    id: 1,
    option: "Wade Cooper",
    label: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
        <path
          fillRule="evenodd"
          d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 2,
    option: "Arlene Mccoy",
    label: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a6.715 6.715 0 0 0-3.722 1.118.75.75 0 1 1-.828-1.25 8.25 8.25 0 0 1 12.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 0 1-1.395-.551A21.69 21.69 0 0 0 18.75 10.5 6.75 6.75 0 0 0 12 3.75ZM6.157 5.739a.75.75 0 0 1 .21 1.04A6.715 6.715 0 0 0 5.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 0 1-1.27-.8A6.715 6.715 0 0 0 3.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 0 1 1.04-.211ZM12 7.5a3 3 0 0 0-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 1 1-1.112-1.008A10.459 10.459 0 0 0 7.5 10.5a4.5 4.5 0 1 1 9 0c0 .547-.022 1.09-.067 1.626a.75.75 0 0 1-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 0 0-3-3Zm0 2.25a.75.75 0 0 1 .75.75c0 3.908-1.424 7.485-3.781 10.238a.75.75 0 0 1-1.14-.975A14.19 14.19 0 0 0 11.25 10.5a.75.75 0 0 1 .75-.75Zm3.239 5.183a.75.75 0 0 1 .515.927 19.417 19.417 0 0 1-2.585 5.544.75.75 0 0 1-1.243-.84 17.915 17.915 0 0 0 2.386-5.116.75.75 0 0 1 .927-.515Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 3,
    option: "Devon Webb",
    label: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
        <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
      </svg>
    ),
  },
  {
    id: 4,
    option: "Tom Cook",
    label: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.25 6a.75.75 0 0 0-1.5 0v4.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V9.75Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 5,
    option: "Tanya Fox",
    label: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 0 1-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 0 1 6.126 3.537ZM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 0 1 0 .75l-1.732 3c-.229.397-.76.5-1.067.161A5.23 5.23 0 0 1 6.75 12a5.23 5.23 0 0 1 1.37-3.536ZM10.878 17.13c-.447-.098-.623-.608-.394-1.004l1.733-3.002a.75.75 0 0 1 .65-.375h3.465c.457 0 .81.407.672.842a5.252 5.252 0 0 1-6.126 3.539Z" />
        <path
          fillRule="evenodd"
          d="M21 12.75a.75.75 0 1 0 0-1.5h-.783a8.22 8.22 0 0 0-.237-1.357l.734-.267a.75.75 0 1 0-.513-1.41l-.735.268a8.24 8.24 0 0 0-.689-1.192l.6-.503a.75.75 0 1 0-.964-1.149l-.6.504a8.3 8.3 0 0 0-1.054-.885l.391-.678a.75.75 0 1 0-1.299-.75l-.39.676a8.188 8.188 0 0 0-1.295-.47l.136-.77a.75.75 0 0 0-1.477-.26l-.136.77a8.36 8.36 0 0 0-1.377 0l-.136-.77a.75.75 0 1 0-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 0 0-1.3.75l.392.678a8.29 8.29 0 0 0-1.054.885l-.6-.504a.75.75 0 1 0-.965 1.149l.6.503a8.243 8.243 0 0 0-.689 1.192L3.8 8.216a.75.75 0 1 0-.513 1.41l.735.267a8.222 8.222 0 0 0-.238 1.356h-.783a.75.75 0 0 0 0 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 0 0 .513 1.41l.735-.268c.197.417.428.816.69 1.191l-.6.504a.75.75 0 0 0 .963 1.15l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 0 0 1.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.77a.75.75 0 0 0 1.477.261l.137-.772a8.332 8.332 0 0 0 1.376 0l.136.772a.75.75 0 1 0 1.477-.26l-.136-.771a8.19 8.19 0 0 0 1.294-.47l.391.677a.75.75 0 0 0 1.3-.75l-.393-.679a8.29 8.29 0 0 0 1.054-.885l.601.504a.75.75 0 0 0 .964-1.15l-.6-.503c.261-.375.492-.774.69-1.191l.735.267a.75.75 0 1 0 .512-1.41l-.734-.267c.115-.439.195-.892.237-1.356h.784Zm-2.657-3.06a6.744 6.744 0 0 0-1.19-2.053 6.784 6.784 0 0 0-1.82-1.51A6.705 6.705 0 0 0 12 5.25a6.8 6.8 0 0 0-1.225.11 6.7 6.7 0 0 0-2.15.793 6.784 6.784 0 0 0-2.952 3.489.76.76 0 0 1-.036.098A6.74 6.74 0 0 0 5.251 12a6.74 6.74 0 0 0 3.366 5.842l.009.005a6.704 6.704 0 0 0 2.18.798l.022.003a6.792 6.792 0 0 0 2.368-.004 6.704 6.704 0 0 0 2.205-.811 6.785 6.785 0 0 0 1.762-1.484l.009-.01.009-.01a6.743 6.743 0 0 0 1.18-2.066c.253-.707.39-1.469.39-2.263a6.74 6.74 0 0 0-.408-2.309Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 6,
    option: "Hellen Schmidt",
    label: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z" />
        <path d="M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z" />
      </svg>
    ),
  },
];

const handleOpenproject = (e) => {
  alert("clicked");
};

const Test = () => {
  const [drop1, setDrop1] = useState(data[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="text-center" onClick={() => setIsOpen(true)}>
        <div className="bg-blue-500 hover:cursor-pointer text-white font-bold py-2 px-4 rounded">
          Open Modal
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Header close={true} minimize={true}>
          Testing Js
        </Modal.Header>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-black font-semibold"> Dropdown </p>
            <Dropdown
              drop={drop1}
              setDrop={setDrop1}
              data={data}
              label={true}
            />
          </div>
          <div id="cmenu">
            <p className="text-black font-semibold">Menu</p>
            <Menu
              name=":-)"
              data={menu_data}
              downIcon={false}
              buttonStyle={true}
              align="right"
            />
          </div>
        </div>
        <br />
        <div>
          <p className="text-black font-semibold"> Table </p>
          <Table
            labels={["Name", "Key", "Type", "Lead"]}
            data={table_data}
            keys={["projectname", "projectkey", "projecttype", "projectlead"]}
            onClick={[handleOpenproject, "", handleOpenproject, ""]}
            sort={true}
          />
        </div>
        <br />
        <div className="text-center">
          <div id="sample" className="">
            <span className="hover:cursor-pointer " id="meme">
              Click here to open popover
            </span>
          </div>
          <p>Fillers</p>
          <p>Fillers</p>
          <p>Fillers</p>
          <p>Fillers</p>
          <p>Fillers</p>
        </div>
        <Popover
          targetId="meme"
          trigger="click"
          content={<div>Sample Popup Demo</div>}
          position="top"
        ></Popover>
        <Popover
          targetId="meme"
          trigger="click"
          content={<div>Sample Popup Demo</div>}
          position="bottom"
        ></Popover>
        <Popover
          targetId="meme"
          trigger="click"
          content={<div>Sample Popup Demo</div>}
          position="left"
        ></Popover>
        <Popover
          targetId="meme"
          trigger="click"
          content={<div>Sample Popup Demo</div>}
          position="right"
        ></Popover>
        <Tabs
          tabs={["Tab 1", "Tab 2", "Tab 3", "Tab 4"]}
          displays={["Hello", "Moto", "LG", "SAMSUNG"]}
        />
        <Modal.Footer close={true}>Required Fields are marked *</Modal.Footer>
      </Modal>
    </>
  );
};

export default Test;
