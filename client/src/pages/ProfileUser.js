import React, { useContext } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";

import adduser from '../components/assets/img/user/add-user.svg'
import Sidebar from '../components/partials/navigation/Sidebar';
import UserListBook from '../components/partials/list/UserListBook';
import ModalEditProfile from '../components/partials/modal/ModalEditProfile';

import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import { IconContext } from "react-icons";
import { FaPhoneAlt, FaVenusMars, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';


function ProfilUser() {
  let api = API();

  let { data: users } = useQuery("usersCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/users", config);
    console.log(response);
    return response.data.users;
  });

  return (
    <>
      <Sidebar />

      <Container fluid className="main-dashboard">
        <Row>
          <Col lg={3} className="dash-side-left"></Col>

          <Col lg={9} className="">
            <h3 className="title-profile mt-4 fw-bold">Profil</h3>

            <div className="mt-3 dash-side-right">
              <Container fluid className="profile-detail">
                <Row>
                  <Col lg={8} className="mt-4 p-4">

                    <div className="d-flex">
                      <div className="mt-2 me-4">
                        {/* icon */}
                        <IconContext.Provider value={{ color: "#8A8C90", className: "global-class-name", size: "1.7em" }}>
                          <div>
                            <FaEnvelope />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="d-block">
                        <h6 className="fw-bold">{users.email}</h6>
                        <p className="desc-profile">Email</p>
                      </div>
                    </div>

                    <div className="d-flex">
                      <div className="mt-2 me-4">
                        {/* icon */}
                        <IconContext.Provider value={{ color: "#8A8C90", className: "global-class-name", size: "1.7em" }}>
                          <div>
                            <FaVenusMars />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="d-block">
                        <h6 className="fw-bold">{users?.gender ? users.gender : "-"}</h6>
                        <p className="desc-profile">Gender</p>
                      </div>
                    </div>

                    <div className="d-flex">
                      <div className="mt-2 me-4">
                        {/* icon */}
                        <IconContext.Provider value={{ color: "#8A8C90", className: "global-class-name", size: "1.7em" }}>
                          <div>
                            <FaPhoneAlt />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="d-block">
                        <h6 className="fw-bold">{users?.phone ? users.phone : "-"}</h6>
                        <p className="desc-profile">Mobile phone</p>
                      </div>
                    </div>

                    <div className="d-flex">
                      <div className="mt-2 me-4">
                        {/* icon */}
                        <IconContext.Provider value={{ color: "#8A8C90", className: "global-class-name", size: "1.7em" }}>
                          <div>
                            <FaMapMarkerAlt />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="d-block">
                        <h6 className="fw-bold">{users?.address ? users.address : "-"}</h6>
                        <p className="desc-profile">Address</p>
                      </div>
                    </div>
                  </Col>

                  <Col lg={3} className="text-end card-profile-user">
                    <img src={users?.avatar ? users?.avatar : adduser} alt="useravatar" className="img-profile-user" />

                    <Button className="btn-lp btn-submit-signup my-4" type="submit">
                      <ModalEditProfile text="Edit Profile" />
                    </Button>
                  </Col>
                </Row>
              </Container>

              <div className="py-4 ms-3 title-list-book">
                My List Book
              </div>

              <UserListBook />

            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilUser;