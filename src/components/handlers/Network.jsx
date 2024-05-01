import React from "react";
import Modal from "../ui/modal/Modal";
export const NetworkHandler = ({ isOpen, setIsOpen, error }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} small>
      <Modal.Header>
        <p className="text-medium font-semibold">
          {error.node === "Client" ? "Network" : error.node === "Server" ? "Connection" : ""} Error
        </p>
      </Modal.Header>
      <Modal.Footer>
        <div>
          <div className="items-center justify-start flex">
            <p>{error.msg}</p>
          </div>
          <div className="items-center justify-end flex">
            <button
              className="p-2 bg-white text-red-600 "
              onClick={() => {
                setIsOpen(false);
                window.location.reload();
              }}>
              {(error.node === "Client" || error.node === "Server") && "Reload"}
              {error.node === "Credentials" && "Close"}
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
