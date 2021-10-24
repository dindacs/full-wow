import React from 'react'
import { Link } from "react-router-dom";

import logo from '../../assets/img/logo/wow-logo.png';

import 'bootstrap/dist/css/bootstrap.min.css';

function NavbarNav() {

  return (
    <>
      <div className="text-center">
        <Link to="/home">
          <img className="img-nav"
            src={logo}
            alt="logo"
          />
        </Link>
      </div>
    </>
  )
}

export default NavbarNav;
