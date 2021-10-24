import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../../config/api";
import { useQuery } from "react-query";
import { UserContext } from "../../../context/UserContext";

import adduser from '../../assets/img/user/add-user.svg'

import './Style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';

import { IconContext } from 'react-icons';
import { FiPaperclip } from 'react-icons/fi';

function ModalEditProfile(props) {

  let api = API();
  let history = useHistory();

  // const [state, setState] = useState(UserContext);
  const [preview, setPreview] = useState(null);
  const [profileEdit, setProfileEdit] = useState({});
  const [form, setForm] = useState({
    gender: "",
    phone: "",
    address: "",
    avatar: "",
  });

  useQuery("profileCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/users", config);
    setForm({
      gender: response.data.users.gender,
      phone: response.data.users.phone,
      address: response.data.users.address,
      avatar: response.data.users.avatar,
    });
    setProfileEdit(response.data.users);
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setPreview(e.target.files);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      if (preview) {
        formData.set("avatar", preview[0], preview[0]?.avatarName);
      }
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("address", form.address);

      // Configuration
      const config = {
        method: "PUT",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
        body: formData,
      };

      // Insert data
      const response = await api.put(`/user`, config);
      if (response.status === "success") {
        history.push("/home");
      }

    } catch (error) {
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
          <h4 className="title-signup pb-4 pt-3">Edit Profile</h4>

          <Form onSubmit={(e) => handleSubmit.mutate(e)}>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Select aria-label="Default select example"
                onChange={handleChange}
                value={form.gender}
                name="gender"
                className="form-input"
                type="text"
                placeholder="Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPwd">
              <Form.Control
                onChange={handleChange}
                value={form.phone}
                name="phone"
                className="form-input"
                type="number"
                placeholder="Phone" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicFn">
              <Form.Control
                onChange={handleChange}
                value={form.address}
                name="address"
                className="form-input"
                type="text"
                placeholder="Address"
                style={{ height: '100px' }}
              />
            </Form.Group>

            <div className="mb-3">
              {!preview ? (
                <div>
                  <img
                    src={form.avatar ? form.avatar : adduser}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={URL.createObjectURL(preview[0])}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              )}
            </div>

            <Form.Group className="mt-4" controlId="formAttache">
              <Form.Control type="file" name="avatar" onChange={handleChange} />
              <Form.Label className="form-input-book text-start w-50" name="avatarName" style={{ cursor: "pointer" }}>
                Avatar
                <IconContext.Provider value={{ color: "#6c757d", className: "global-class-name", size: "1.5em" }}>
                  <span className="float-end">
                    <FiPaperclip />
                  </span>
                </IconContext.Provider>
              </Form.Label>
            </Form.Group>

            {/* button submit */}
            <Button className="btn-lp btn-submit-signup my-4" type="submit">
              Save
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditProfile;