import React from "react";

const ModalHeader = ({
  setIsOpen,
  setIsMinimized,
  close,
  minimize,
  children,
}) => {
  const NestedModal = document.getElementsByClassName("inset-0").length;
  if (NestedModal) minimize = false;
  return (
    <>
      <div className="flex items-center py-4">
        <div className="text-xl text-gray-700 font-semibold w-4/5">
          {children}
        </div>
        <div className="text-right w-1/5">
          {minimize && (
            <button
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => {
                  setIsMinimized(true);
                }, 200);
              }}
              className="pl-2 pr-2 py-2 bg-white rounded"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios-filled/50/minus-math.png"
                alt="minus-math"
              />
            </button>
          )}
          {close && close === true && (
            <button
              onClick={() => setIsOpen(false)}
              className="pl-2 py-2 bg-white rounded"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <path
                  d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalHeader;
