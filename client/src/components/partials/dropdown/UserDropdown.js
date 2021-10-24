import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from '../../../context/UserContext';
import { useQuery } from "react-query";
import { API } from "../../../config/api";

import adduser from '../../assets/img/user/add-user.svg';

import './Style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Dropdown, } from 'react-bootstrap';

import { IconContext } from "react-icons";
import { BiLogIn, BiBookAdd } from "react-icons/bi";
import { FaCaretUp } from 'react-icons/fa';
import { IoReceiptOutline, IoChatbubblesOutline } from "react-icons/io5";

function UserDropdown() {

  let api = API();
  let history = useHistory()
  const [state, dispatch] = useContext(UserContext);

  let { data: users } = useQuery("usersCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/users", config);
    return response.data.users;
  });

  // handle logout
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    history.push('/');
  };

  return (
    <div>
      <Dropdown>

        <Container className="d-flex justify-content-end  mt-4">
          <Dropdown.Toggle id="dropdown-basic" sm={3}>
            <Image src={users?.avatar ? users.avatar : adduser} roundedCircle className="img-user-trans" />
          </Dropdown.Toggle>
        </Container>

        <Dropdown.Menu id={`dropdown-button-drop-up`}>

          <IconContext.Provider value={{ color: "#FFF", className: "global-class-name", size: "2em" }}>
            <div className="text-end icon-caret">
              <FaCaretUp />
            </div>
          </IconContext.Provider>

          {/* icon */}
          <IconContext.Provider value={{ color: "#929292", className: "global-class-name", size: "1.7em" }}>
            <span>
              <Dropdown.Item className="fw-bold" onClick={() => {
                history.push(`/data-books`);
              }}>
                <BiBookAdd /> Book
              </Dropdown.Item>
            </span>
          </IconContext.Provider>

          <Dropdown.Divider />

          {/* icon */}
          <IconContext.Provider value={{ color: "#929292", className: "global-class-name", size: "1.7em" }}>
            <span>
              <Dropdown.Item className="fw-bold" onClick={() => {
                history.push(`/list-transaksi`);
              }}>
                <IoReceiptOutline /> Transaction
              </Dropdown.Item>
            </span>
          </IconContext.Provider>

          <Dropdown.Divider />

          {/* icon */}
          <IconContext.Provider value={{ color: "#929292", className: "global-class-name", size: "1.7em" }}>
            <span>
              <Dropdown.Item className="fw-bold" onClick={() => {
                history.push(`/complain-admin`);
              }}>
                <IoChatbubblesOutline /> Complain
              </Dropdown.Item>
            </span>
          </IconContext.Provider>

          <Dropdown.Divider />

          <IconContext.Provider value={{ color: "red", className: "global-class-name", size: "1.7em" }}>
            <span>
              <Dropdown.Item className="fw-bold" onClick={() => {
                history.push(`/`);
              }}>
                <BiLogIn /> Logout
              </Dropdown.Item>
            </span>
          </IconContext.Provider>

        </Dropdown.Menu>
      </Dropdown>
    </div >
  )
}

export default UserDropdown
