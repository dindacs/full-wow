import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../../../context/UserContext';
import { useQuery } from "react-query";
import { API } from "../../../config/api";

import "./Style.css";

import adduser from '../../assets/img/user/add-user.svg'
import NavbarNav from './NavbarNav';

import { Image } from 'react-bootstrap';

import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

import { BiUser } from "react-icons/bi";
import { IoReceiptOutline, IoChatbubblesOutline } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";

const Sidebar = () => {

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

  let isSubs = false;

  if (users?.tb_transaction.length <= 0) {
    isSubs = false;
  } else if (users?.tb_transaction[0].userStatus === "Not Active") {
    isSubs = false;
  } else {
    isSubs = true;
  }

  // handle logout
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    history.push('/');
  };


  const [menuCollapse, setMenuCollapse] = useState(false)
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="sidebar">
        <ProSidebar collapsed={menuCollapse}>

          <SidebarHeader>
            <div className="logotext">
              {menuCollapse ? "#" : <NavbarNav />}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <div>oke</div>
              ) : (
                <div>wow</div>
              )}
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu>
              <MenuItem className="list-profile">
                <div>
                  <Image src={users?.avatar ? users.avatar : adduser} roundedCircle className="img-profile" />
                </div>
                <div className="userName mb-3 mt-4">
                  <span>{users?.name}</span>
                </div>
                <div className="subs-text mt-3">
                  <span>
                    {isSubs ? (
                      <span className="fw-bold text-success">Subscribed</span>
                    ) : (
                      <span className="fw-bold text-danger">Not Subscribe Yet</span>
                    )}
                  </span>
                </div>
              </MenuItem>

              <MenuItem className="text-list-pro" active={true}>
                <BiUser />
                <span className="ms-2 mt-2">Profile
                  <Link to="/profile-user" />
                </span>
              </MenuItem>

              <MenuItem className="text-list-subs">
                <IoReceiptOutline />
                <span className="ms-2 mt-2">Subscribe
                  <Link to="/subscribe" />
                </span>
              </MenuItem>

              <MenuItem className="text-list-logout" >
                <IoChatbubblesOutline />
                <span className="ms-2 mt-2">
                  Complain
                  <Link to="/complain" />
                </span>
              </MenuItem>

              <MenuItem className="text-list-logout" >
                <BiLogIn />
                <span className="ms-2 mt-2" onClick={handleLogout}>
                  Logout
                </span>
              </MenuItem>

            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;