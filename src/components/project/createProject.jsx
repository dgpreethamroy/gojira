import { useState,Fragment } from 'react'

export default function CreateProject({ modal, setModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", {
      project,
      summary,
      description,
    });
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {modal ? (
        <>
          <div className="justify-center mt-5 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/5 my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  items-start justify-between pt-10 p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create Project</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                
                <div className="relative p-3 flex-auto">
                 

                  <div className="relative inline text-left ">
                    {/* <button
                      type="button"
                      className="inline-flex justify-center w-1/3 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                      id="options-menu"
                      onClick={toggleDropdown}
                    >
                      Project Type
                    </button>

                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <a
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Scrum
                          </a>
                          <a
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Bug-Tracking
                          </a>
                          <a
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Agile
                          </a>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      className="inline-flex justify-center w-1/3 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                      id="options-menu"
                      onClick={toggleDropdown}
                    >
                      To Do
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center w-1/3 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                      id="options-menu"
                      onClick={toggleDropdown}
                    >
                      Lead
                    </button> */}
                    <div className="max-w-xl mx-auto mt-8 p-4 border border-gray-300 rounded-md">
                      <h2 className="text-2xl font-bold mb-4">
                        Please fill the Details
                      </h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            htmlFor="project"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Project Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            id="project"
                            name="project"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            required
                          >
                            {/* Add project options here */}
                          </input>
                        </div>

                        <hr className="my-4 border-t border-gray-300" />

                        <div className="mb-4">
                          <label
                            htmlFor="summary"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Summary<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="summary"
                            name="summary"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Description<span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            required
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        >
                          Create ID
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}