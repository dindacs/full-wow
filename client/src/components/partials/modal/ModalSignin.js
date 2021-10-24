import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { useMutation } from "react-query";
import { API } from "../../../config/api";

import AppModalSignup from './ModalSignup';

import './Style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

function AppModalSignin(props) {

  let history = useHistory();
  let api = API();

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const [state, dispatch] = useContext(UserContext);

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
      const response = await api.post("/login", config);

      // Checking process
      if (response.status === "success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.user,
        });

        // Status check
        if (response.data.user.role === "Admin") {
          history.push("/data-books");
        } else {
          history.push("/home");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
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
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  // state btn show modal sign in
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
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body className="modal-body-sign">
          <h4 className="title-signup pb-4 pt-3">Sign In</h4>
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

            {/* button submit */}
            <Button className="btn-lp btn-submit-signup my-4" type="submit">
              Sign In
            </Button>
          </Form>

          <div className="text-center text-acc">
            <div className="text-center text-acc">
              <Link to="/" component={AppModalSignup} text="Already have an account? Klik Here"></Link>
            </div>
          </div>

        </Modal.Body>
      </Modal >
    </>
  );
}

export default AppModalSignin;