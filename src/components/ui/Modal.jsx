import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DropDown from './DropDown'; // Import the updated DropDown component

const Modal = ({ modalTitle, toggleModal, setToggleModal, modalType, inputArray, DropdownObj }) => {
  const [selectedOptions, setSelectedOptions] = useState(new Array(DropdownObj.length).fill(null));
  const [inputValues, setInputValues] = useState({});

  const handleDropdownChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleInputChange = (label, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [label]: value
    }));
  };

  const handleSave = () => {
    const formData = {
      ...inputValues,
      ...selectedOptions.reduce((acc, curr, index) => {
        acc[DropdownObj[index].label] = curr;
        return acc;
      }, {})
    };
    // Perform action to save formData
    console.log("Form Data:", formData);
    // Close modal after saving
    setToggleModal(false);
  };

  const renderAlertModal = () => (
    <div>
      <div className="mt-3 text-center sm:mt-0 sm:text-left">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
          {modalTitle}
        </Dialog.Title>
      </div>
      <div className="absolute top-0 right-0 pt-4 pr-4">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={() => setToggleModal(false)}
        >
          <span className="sr-only">Close</span>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setToggleModal(false)}
        >
          OK
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setToggleModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderFormModal = () => (
    <div>
      <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              {modalTitle}
            </Dialog.Title>
          </div>
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setToggleModal(false)}
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {inputArray.map((input, index) => (
          <div key={index} className="mt-3">
            <label htmlFor={`input-${index}`} className="block text-sm font-medium text-gray-700">{input}</label>
            <input
              id={`input-${index}`}
              type="text"
              className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder={`Enter ${input}`}
              onChange={(e) => handleInputChange(input, e.target.value)}
            />
          </div>
        ))}
        {DropdownObj.map((dropdown, index) => (
          <DropDown
            key={index}
            dropdown={dropdown}
            selectedOption={selectedOptions[index]}
            setSelectedOption={(value) => handleDropdownChange(index, value)}
          />
        ))}
      </div>
      <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setToggleModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <Transition.Root show={toggleModal} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setToggleModal}>
        <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-3/5 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg">
              {modalType === 'alertModal' ? renderAlertModal() : renderFormModal()}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
