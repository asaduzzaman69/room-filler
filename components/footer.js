import React, { useState } from "react";
import Link from "next/link";
import firebase from "../lib/firebase";
import Router from "next/router";
import { Navbar, Nav, Container, Image, Row, Col } from "react-bootstrap";

async function logout() {
  await firebase.auth().signOut();
  return Router.push("/login");
}

function getAuthedNavbarContent(user) {
  if (user && user.uid) {
    return (
      <span>
        <Link href="/dashboard">
          <a className="text-secondary mr-2">Dashboard</a>
        </Link>
        <a className="text-secondary mr-2" onClick={logout}>
          Logout
        </a>
      </span>
    );
  }
  return (
    <span>
      <Link href="/login">
        <a className=" mr-3 cursor-pointer">About</a>
      </Link>
      <Link href="/login">
        <a className=" mr-3 cursor-pointer">Sign in</a>
      </Link>
    </span>
  );
}

export default function Footer({ setHash }) {
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged((authUser) => {
    setUser(authUser);
  });

  return (
    <React.Fragment>
      <div className="footer">
        <Row className="justify-content-center">
          <Col xs={6} sm={4} md={4} lg={3} className="mb-4 mb-sm-0 ">
            <a href="/">
              <Image
                src="/images/logo-dark.png"
                alt="logo"
                className="logo"
                width="100%"
                style={{ marginTop: "24px" }}
              />
            </a>
          </Col>
          <Col xs={12} sm={4} md={4} lg={3}  className="mb-4 mb-sm-0  text-center text-sm-left">
            <h5>Get In touch</h5>
            <Row>
              <Col sm={12} md={6}>
                <h6>
                  zionvillage@cohostin.com
                  <br />
                  <a href="tel:(480) 331-5595">(480) 331-5595</a>
                </h6>
              </Col>
              <Col  sm={12} md={6}>
                <h6>
                  2170 W 350 N
                  <br />
                  Hurricane, UT 84737
                </h6>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={4} md={4} lg={3}  className="mb-4 mb-sm-0">
            <h5>QUICK LINKS</h5>
            <Row>
              <Col  sm={12}md={6}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link
                  href="/#amenities"
                  onClick={() => setHash("#amenities")}
                >
                  Amenities
                </Nav.Link>
                <Nav.Link
                  href="/#places-to-eat"
                  onClick={() => setHash("#places-to-eat")}
                >
                  Places To Eat
                </Nav.Link>
              </Col>
              <Col sm={12} md={6}>
                <Nav.Link
                  href="/#local-eateries"
                  onClick={() => setHash("#local-eateries")}
                >
                  Local Eateries
                </Nav.Link>
                <Nav.Link
                  href="/#local-activities"
                  onClick={() => setHash("#local-activities")}
                >
                  Local Activities
                </Nav.Link>
                <Nav.Link
                  href="/login"
                  onClick={() => setHash("#emergency-locations")}
                >
                  Owner Login
                </Nav.Link>
              </Col>
            </Row>
          </Col>
          {/*<Col xs={12} lg={3} md={4} sm={12}>*/}
          {/*  <h5>FOLLOW US</h5>*/}
          {/*  /!* <FacebookIcon /> *!/*/}
          {/*  <div className="social-sec">*/}
          {/*  <Image*/}
          {/*    src="/icons/facebook.svg"*/}
          {/*    alt="facebook-icon"*/}
          {/*    className="social-icon"*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src="/icons/twitter.svg"*/}
          {/*    alt="twitter-icon"*/}
          {/*    className="social-icon"*/}
          {/*  />*/}

          {/*  <Image*/}
          {/*    src="/icons/youtube.svg"*/}
          {/*    alt="youtube-icon"*/}
          {/*    className="social-icon"*/}
          {/*  />*/}
          {/*  </div>*/}
          {/*</Col>*/}
        </Row>
        <Row className="justify-content-center mt-3">
          <p>© 2020 Zion Village Resorts - All Rights Reserved</p>
        </Row>
      </div>
    </React.Fragment>
    // <Navbar className="fixed-bottom text-center justify-content-center">
    //   <Nav>
    //     <a className="mr-2">&copy; 2020 Jones-Trawick Software</a>
    //   </Nav>
    //   <Navbar.Brand href="/" className="px-4 mr-0">
    //     Zion Village Properties
    //   </Navbar.Brand>
    //   <Nav>{getAuthedNavbarContent(user)}</Nav>
    // </Navbar>
  );
}
