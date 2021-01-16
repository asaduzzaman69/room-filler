import React, { useState } from "react";
import Link from "next/link";
import firebase from "../lib/firebase";
import Router from "next/router";
import { Navbar, Nav, Container, Image, Row, Col } from "react-bootstrap";
// import {FacebookIcon} from '/icons/3-layers.svg';

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

export default function Footer({ bg }) {
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged((authUser) => {
    setUser(authUser);
  });

  return (
    <React.Fragment>
      <div className="footer">
      <Row className="justify-content-md-center">
        <Col>
          <a href="/">
            <Image src="/images/logo-dark.png" alt="logo" className="logo" width="100%" style={{marginTop:'24px'}}/>
          </a>
        </Col>
        <Col>
          <h5>Get In touch</h5>
          <Row>
            <Col>
              <h6>
                info@ZionVillage.com
                <br />
                385-529-8686
              </h6>
            </Col>
            <Col>
              <h6>
                2170 W 350 N
                <br />
                Hurricane, UT 84737
              </h6>
            </Col>
          </Row>
        </Col>
        <Col>
        <h5>QUICK LINKS</h5>
          <Row>
            <Col>
            <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/amenities">Amenities</Nav.Link>
              <Nav.Link href="/places-to-eat">Places To Eat</Nav.Link>
             
            </Col>
            <Col>
            <Nav.Link href="/local-eateries">Local Eateries</Nav.Link>
            <Nav.Link href="/local-activities">Local Activities</Nav.Link>
            <Nav.Link href="/emergency-locations">Emergency Locations</Nav.Link>
            </Col>
          </Row></Col>
        <Col>
        <h5>FOLLOW US</h5>
        {/* <FacebookIcon /> */}
        <Image src="/icons/facebook.svg" alt="facebook-icon" className="social-icon" />
        <Image src="/icons/twitter.svg" alt="twitter-icon" className="social-icon" />
        <Image src="/icons/youtube.svg" alt="youtube-icon" className="social-icon" />
        </Col>
       
      </Row>
      <Row className="justify-content-md-center mt-5">
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
