import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from "react-query";
import { API } from "../../../config/api";

import AppModalSignin from './ModalSignin';

import './Style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

function AppModalSignup(props) {

  let api = API();

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "Customer",
  });

  const { email, password, name } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const body = JSON.stringify(form);

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };
      const response = await api.post("/register", config);

      // Notification
      if (response.status === "success...") {
        const alert = (
          <Alert variant="success" className="py-1">
            Sign Up Success. Please Sign In
          </Alert>
        );
        setMessage(alert);
        setForm({
          email: "",
          password: "",
          name: "",
          role: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  // state show modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <div onClick={handleShow} style={{ height: "25px", width: "100%", }}>
        {props.text}
      </div>

      <Modal
        {...props}
        show={show}
        onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
        centered>

        <Modal.Body className="modal-body-sign">
          <h4 className="title-signup pb-4 pt-3">Sign Up</h4>
          {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                onChange={handleChange}
                value={email}
                name="email"
                className="form-input"
                type="email"
                placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPwd">
              <Form.Control
                onChange={handleChange}
                value={password}
                name="password"
                className="form-input"
                type="password"
                placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicFn">
              <Form.Control
                onChange={handleChange}
                value={name}
                name="name"
                className="form-input"
                type="text"
                placeholder="Full Name" />
            </Form.Group>

            {/* button submit */}
            <Button className="btn-lp btn-submit-signup my-4 mt-2" type="submit">
              Sign Up
            </Button>
          </Form>

          <div className="text-center text-acc">
            <Link to="/" component={AppModalSignin} text="Already have an account? Klik Here"></Link>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default AppModalSignup;