import React from 'react';

import banner from '../components/assets/img/home/banner.png';
import Sidebar from '../components/partials/navigation/Sidebar';
import Listbook from '../components/partials/list/ListBook';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function Home() {

  return (
    <>
      <Sidebar />
      <Container fluid className="main-dashboard">
        <Row>
          <Col lg={3} className="dash-side-left">
          </Col>
          <Col lg={9}>
            <div className="dash-side-right mt-5">
              <img src={banner} alt="banner-pic" className="img-banner" />
              <div className="py-4 ms-3 title-list-book">List Book</div>
              <Listbook />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
