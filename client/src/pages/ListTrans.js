import React from 'react'

import NavbarNav from '../components/partials/navigation/NavbarNav';
import UserDropdown from '../components/partials/dropdown/UserDropdown';
import ListUsers from '../components/partials/list/ListUsers';

import { Container } from 'react-bootstrap';

function ListTrans() {
  return (
    <>
      <Container className="nav-read-book d-flex justify-content-between">
        <NavbarNav />
        <UserDropdown />
      </Container>

      <Container className="p-5">
        <ListUsers />
      </Container>
    </>
  )
}

export default ListTrans
