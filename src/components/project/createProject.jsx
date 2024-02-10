import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const CreateProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    projectKey: "",
    projectType: "",
    projectLead: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setIsOpen(false);
  };

  const fields = [
    { name: "projectName", label: "Project Name", type: "text" },
    { name: "projectDescription", label: "Project Description", type: "text" },
    {
      name: "projectKey",
      label: "Project Key",
      type: "select",
      options: ["Agile", "Scrum", "Waterfall"],
    },
    {
      name: "projectType",
      label: "Project Type",
      type: "select",
      options: ["Team-Managed Software", "Client-Managed Software"],
    },
    { name: "projectLead", label: "Project Lead", type: "text" },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Create Project
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />

        <div className="flex items-center justify-center h-full">
          <div className="bg-white text-black rounded-lg p-8 w-full max-w-md z-50">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-2xl">Create Project</Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.name}
                className={`mb-4 ${index === 1 ? "mt-4" : ""}`}
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                {field.type === "text" && (
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                )}
                {field.type === "select" && (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="mr-2 bg-gray-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateProject;
