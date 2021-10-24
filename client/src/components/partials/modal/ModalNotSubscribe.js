import React from "react";

import { Modal } from "react-bootstrap";

export default function ModalNotSubscribe(props) {
  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-body-sign">
          <div className="text-danger fw-bold text-center mt-3">
            Please make a payment to read the latest books
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
