import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
// Modal component
const Modal = ({ className, children, z = 10, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => {
          if (!isMinimized) {
            setIsOpen(true);
          } else {
            setIsMinimized(false);
            setTimeout(() => {
              isOpen(true);
            }, 200);
          }
        }}
        className="text-xl font-extrabold italic text-black dark:text-gray-500"
      >
        {name ? name : "open Modal"}
      </button>
      {isMinimized && (
        <div
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className=" bg-white hover:cursor-pointer border-2 shadow-2xl items-center fixed bottom-10  rounded-md right-52 w-[20%] h-12 flex "
        >
          <span className="inline-block px-2 bg-white  text-black font-bold rounded">
            New task
          </span>
        </div>
      )}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative"
        >
          <Dialog.Overlay
            className={`fixed inset-0 bg-black opacity-30 ${
              z !== "10" && "z-" + z
            }  `}
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
            <div className="flex justify-center items-center fixed inset-0 z-10 ">
              <div className="bg-white p-4 rounded shadow-lg w-1/2  ">
                <div className="Header">
                  {children.length
                    ? children?.map((item) => {
                        if (item.type === "ModalHeader")
                          return (
                            <ModalHeader
                              setIsOpen={setIsOpen}
                              setIsMinimized={setIsMinimized}
                              children={item.props.children}
                              {...item.props}
                            />
                          );
                      })
                    : children.type === "ModalHeader" && (
                        <ModalHeader
                          setIsMinimized={setIsMinimized}
                          setIsOpen={setIsOpen}
                          {...children.props}
                          children={children.props.children}
                        />
                      )}
                </div>

                <div className="max-h-96 overflow-y-auto mt-4">
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
                <hr />
                <div className="Footer">
                  {children.length
                    ? children?.map((item) => {
                        if (item.type === "ModalFooter")
                          return (
                            <ModalFooter
                              setIsOpen={setIsOpen}
                              children={item.props.children}
                              {...item.props}
                            />
                          );
                      })
                    : children.type === "ModalFooter" && (
                        <ModalFooter
                          setIsOpen={setIsOpen}
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
