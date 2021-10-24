import React from 'react';

import './Style.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';


function AppUser(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-body-sign">
        <div className="text-success fw-bold text-center mt-3">
          Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you
        </div>
      </Modal.Body>
    </Modal>
  );
}

function ModalSubs() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>

      <Button className="btn-submit-payment my-4 mt-4" type="submit" onClick={() => setModalShow(true)}>
        Send
      </Button>


      <AppUser
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ModalSubs;