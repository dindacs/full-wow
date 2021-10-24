import React from "react";

import NavbarNav from '../components/partials/navigation/NavbarNav';
import UserDropdown from '../components/partials/dropdown/UserDropdown';
import ListBookAdmin from '../components/partials/list/ListBookAdmin';

import {
  Container,
} from 'react-bootstrap';


function DataBooks() {

  return (
    <>
      <Container className="nav-read-book d-flex justify-content-between">
        <NavbarNav />
        <UserDropdown />
      </Container>

      <Container className="mt-5">
        <ListBookAdmin />
      </Container>

    </>
  );
};
export default DataBooks;