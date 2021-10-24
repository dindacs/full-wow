import React from 'react'

import logo from '../components/assets/img/logo/logo.png';
import AppModalSignup from '../components/partials/modal/ModalSignup';
import AppModalSignin from '../components/partials/modal/ModalSignin';

import {
  Container,
  Button,
} from 'react-bootstrap';

const LandingPage = () => {

  return (
    <>
      <Container fluid className="landing-book-img">
        <div className="left-landing ">
          <img src={logo} alt="pic-landing-page" className="img-logo-landing" />

          <div className="text-lp">
            <p className="desc-lp">Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia</p>
          </div>

          {/* btn signup */}
          <Button className="btn-lp btn-signup">
            <AppModalSignup text="Sign Up" />
          </Button>

          {/* btn signin */}
          <Button className="btn-lp btn-signin">
            <AppModalSignin text="Sign In" />
          </Button>

        </div>
      </Container >
    </>
  )
}

export default LandingPage