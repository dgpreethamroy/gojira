import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
// Modal component
const Modal = ({
  className,
  children,
  z = 50,
  isOpen,
  setIsOpen,
  small = false,
  large = false,
  medium = false,
  handleClosed = () => {
    return null;
  },
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    console.log("Modal UseEffect");
  });

  return (
    <div className={className}>
      {isMinimized && (
        <div
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className=" bg-white hover:cursor-pointer border-2 shadow-2xl items-center fixed bottom-10  rounded-md right-52 w-[20%] h-12 flex "
        >
          <span className="inline-block px-2 bg-white  text-black font-bold rounded">
            Continue with modal
          </span>
        </div>
      )}
      {isMinimized && isOpen && setIsMinimized(false)}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => {
            //setIsOpen(false);
          }}
          className="relative"
        >
          <Dialog.Overlay
            className={`fixed inset-0 opacity-70 ${z !== "50" && "z-" + z}  `}
            style={{ backgroundColor: " rgba(9, 30, 66, 0.54)" }}
          />
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="transform scale-0"
            enterTo="transform scale-100"
            leave="transition-transform duration-300"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-0"
          >
            <div
              className={`flex justify-center items-center fixed inset-0 z-50  ${
                small && "top-[-340px]"
              }`}
            >
              <div
                className={`bg-white p-4 rounded shadow-lg ${
                  small
                    ? "w-[35%] "
                    : large
                    ? "w-[90%] "
                    : medium
                    ? "w-[50%]"
                    : " w-[60%]"
                }  `}
              >
                <div className="Header">
                  {children.length
                    ? children?.map((item) => {
                        if (item.type === "ModalHeader")
                          return (
                            <ModalHeader
                              setIsOpen={setIsOpen}
                              setIsMinimized={setIsMinimized}
                              children={item.props.children}
                              handleClosed={handleClosed}
                              {...item.props}
                            />
                          );
                      })
                    : children.type === "ModalHeader" && (
                        <ModalHeader
                          setIsMinimized={setIsMinimized}
                          setIsOpen={setIsOpen}
                          handleClosed={handleClosed}
                          {...children.props}
                          children={children.props.children}
                        />
                      )}
                </div>

                <div className="max-h-96 overflow-y-auto " id="modalbody">
                  {children.length
                    ? children?.filter((item) => {
                        return (
                          item.type !== "ModalHeader" &&
                          item.type !== "ModalFooter"
                        );
                      })
                    : children.type !== "ModalFooter" &&
                      children.type !== "ModalHeader" &&
                      children}
                </div>
                <div className="Footer">
                  {children.length
                    ? children?.map((item) => {
                        if (item.type === "ModalFooter")
                          return (
                            <ModalFooter
                              setIsOpen={setIsOpen}
                              handleClosed={handleClosed}
                              children={item.props.children}
                              {...item.props}
                            />
                          );
                      })
                    : children.type === "ModalFooter" && (
                        <ModalFooter
                          setIsOpen={setIsOpen}
                          handleClosed={handleClosed}
                          {...children.props}
                          children={children.props.children}
                        />
                      )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};
Modal.Header = "ModalHeader";
Modal.Footer = "ModalFooter";

export default Modal;
