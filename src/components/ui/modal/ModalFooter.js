import React from "react";
// Modal Footer Component
const ModalFooter = ({ setIsOpen, close, children }) => {
  return (
    <>
      <div className="w-full text-red-500 "> {children}</div>
      {close && (
        <div className="text-right text-white">
          <button
            onClick={() => setIsOpen(false)}
            className=" px-4 py-2 bg-blue-800 rounded"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};
export default ModalFooter;
