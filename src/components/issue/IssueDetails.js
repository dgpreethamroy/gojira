import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
import { Editor } from "primereact/editor";

const IssueDetails = ({ details, showIssue, setShowIssue }) => {
  const [editedValues, setEditedValues] = useState({});
  const [activeField, setActiveField] = useState(null); // State to track active input field
  const [task, setTask] = useState(details.task); // State to manage task object
  const taskEntries = Object.entries(task);
  const outsideClickRef = useRef(null);

  const handleChange = (key, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleValueClick = (key) => {
    setActiveField(key); // Set active field when clicked
  };

  const handleSaveChanges = () => {
    // Update task object with edited values
    const updatedTask = { ...task };
    for (const [key, value] of Object.entries(editedValues)) {
      updatedTask[key] = value;
    }

    // Reset active field and edited values
    setActiveField(null);
    setEditedValues({});

    // Update state with edited values
    setTask(updatedTask);
  };

  const handleCancelEdit = () => {
    // Reset active field and edited values
    setActiveField(null);
    setEditedValues({});
  };

  const handleModalClose = () => {
    // Close the modal
    setShowIssue(false);
  };

  // Handle click outside of the editable fields
  const handleOutsideClick = (e) => {
    if (
      outsideClickRef.current &&
      !outsideClickRef.current.contains(e.target)
    ) {
      setActiveField(null);
      setEditedValues({});
    }
  };

  // Listen for clicks outside of the editable fields
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.getElementById(activeField)?.focus();
    //document.getElementsByClassName('ql-editor')[0].children[0].focus()

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [activeField]);

  return (
    <Dialog
      open={showIssue}
      onClose={handleModalClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />

      <div className="flex items-center justify-center h-full">
        <div
          className="bg-white text-black rounded-lg p-8 w-full max-w-screen-lg mx-auto z-50"
          ref={outsideClickRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-2xl">Issue Details</Dialog.Title>
            <button
              onClick={handleModalClose}
              className="text-gray-500 hover:text-red-600 focus:outline-none"
            >
              <XIcon className="h-6 w-6 text-red-600" />
            </button>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full md:w-3/4">
              {" "}
              {/* Left side takes 3/4 width */}
              {/* Fields to be displayed on the left side */}
              {taskEntries.map(
                ([key, value]) =>
                  ["id", "summary", "description"].includes(key) && (
                    <div key={key} className="mb-4">
                      <p className="font-semibold">{key}</p>
                      <div className="edit-field">
                        {activeField === key ? (
                          <div className="flex items-center">
                            {key === "description" ? (
                              <Editor
                                style={{ height: "250px", width: "100%" }}
                                value={
                                  editedValues[key] !== undefined
                                    ? editedValues[key]
                                    : value
                                }
                                onTextChange={(e) =>
                                  handleChange(key, e.textValue)
                                }
                              />
                            ) : (
                              <input
                                type="text"
                                id={key}
                                value={
                                  editedValues[key] !== undefined
                                    ? editedValues[key]
                                    : value
                                }
                                onChange={(e) =>
                                  handleChange(key, e.target.value)
                                }
                                onBlur={handleCancelEdit}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-3/4" // Adjusted width to 75%
                              />
                            )}
                            <button
                              onClick={handleCancelEdit}
                              className="ml-2 text-red-600 hover:text-red-700 focus:outline-none"
                            >
                              <XIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={handleSaveChanges}
                              className="ml-2 text-green-600 hover:text-green-700 focus:outline-none"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <p
                              className="text-gray-600 cursor-pointer"
                              onClick={() => {
                                handleValueClick(key);
                              }}
                            >
                              {activeField === key
                                ? editedValues[key] || value
                                : value}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="w-full md:w-1/4">
              {" "}
              {/* Right side takes 1/4 width */}
              {/* Fields to be displayed on the right side */}
              {taskEntries.map(
                ([key, value]) =>
                  !["id", "summary", "description"].includes(key) && (
                    <div key={key} className="mb-4">
                      <p className="font-semibold">{key}</p>
                      <div className="edit-field">
                        {activeField === key ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={
                                editedValues[key] !== undefined
                                  ? editedValues[key]
                                  : value
                              }
                              onChange={(e) =>
                                handleChange(key, e.target.value)
                              }
                              onBlur={handleCancelEdit}
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                            <button
                              onClick={handleCancelEdit}
                              className="ml-2 text-red-600 hover:text-red-700 focus:outline-none"
                            >
                              <XIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={handleSaveChanges}
                              className="ml-2 text-green-600 hover:text-green-700 focus:outline-none"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <p
                              className="text-gray-600 cursor-pointer"
                              onClick={() => handleValueClick(key)}
                            >
                              {activeField === key
                                ? editedValues[key] || value
                                : value}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleModalClose}
              className="mr-2 bg-gray-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default IssueDetails;
