import React from 'react';

import notfound from '../components/assets/img/home/not-found.svg';

import { Container } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="text-center mt-5">
      <img src={notfound} className="w-50 mt-5 mb-4" />
      <h2 className="fw-bold pt-5 pb-4">404 Page Not Found</h2>
    </Container>
  );
}

export default NotFound;