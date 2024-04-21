import React from "react";
// Modal Footer Component
const ModalFooter = ({ setIsOpen, close, children, handleClosed }) => {
  return (
    <div className="flex justify-end py-1 items-center">
      <div className={`${close ? "w-[90%]" : "w-full"}`}> {children}</div>
      {close && (
        <div className="text-right text-white ">
          <button
            onClick={() => {
              setIsOpen(false);
              handleClosed();
            }}
            className=" px-4 py-2 text-gray-500  rounded font-bold text-lg">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
export default ModalFooter;
