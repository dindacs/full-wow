import React, { useState, useContext } from 'react'
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext';

import logo from '../components/assets/img/logo/wow-logo2.png';
import Sidebar from '../components/partials/navigation/Sidebar';
import ModalSubs from '../components/partials/modal/ModalSubs';

import {
  Container,
  Row,
  Col,
  Form,
} from 'react-bootstrap';

import { IconContext } from 'react-icons';
import { FiPaperclip } from 'react-icons/fi';

function Subscribe() {

  let api = API();
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    idUser: state.user.id,
    transferProof: "",
    remainingAcvite: "0",
    statusUser: "Not Active",
    statusPayment: "Pending",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("idUser", form.idUser);
      formData.set("transferProof", form?.transferProof[0], form?.transferProof[0]?.fileName);
      formData.set("remainingAcvite", form.remainingAcvite);
      formData.set("statusUser", form.statusUser);
      formData.set("statusPayment", form.statusPayment);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
        body: formData,
      };

      // Insert data
      const response = await api.post("/transaction", config);
      history.push("/home");

      if (response.status === "success") {
        dispatch({
          type: "SUBS",
          payload: response.data.transactions,
        });
      }

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Sidebar />

      <Container fluid className="main-dashboard">
        <Row>
          <Col lg={3} className="dash-side-left"></Col>
          <Col lg={9}>
            <div className="text-center subs">
              <h3 className="title-subs mb-4">Premium</h3>

              <div className="desc-subs py-4">
                <span>Pay now and access all the latest books from </span>
                <img src={logo} alt="logo" />
              </div>
              <div>

                <img src={logo} alt="logo" />
                <span><strong>: 0981312323 </strong></span>

                {/* form */}
                <div className="d-flex justify-content-center mt-4">
                  <Form onSubmit={(e) => handleSubmit.mutate(e)}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      {/* <Form.Control className="form-input" type="text" placeholder="Input Your Account Number" readOnly /> */}
                      <div className="form-input text-start fw-bold" style={{ padding: '12px', color: '#a79999' }} name="idUser" onChange={handleChange}>
                        IDWOW-00{state.user.id}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAttache">
                      <Form.Control type="file" name="transferProof" onChange={handleChange} />
                      <Form.Label name="fileName" type="text" className="form-attache text-start" onChange={handleChange}>
                        Attache proof of transfer
                        {/* icon */}
                        <IconContext.Provider value={{ color: "#D60000", className: "global-class-name", size: "1.5em" }}>
                          <span className="float-end">
                            <FiPaperclip />
                          </span>
                        </IconContext.Provider>
                      </Form.Label>
                    </Form.Group>

                    {/* proview image */}
                    <div className="mt-3 mb-1">
                      {preview && (
                        <div>
                          <img
                            src={preview}
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

                    {/* button submit */}
                    <ModalSubs />
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Subscribe;