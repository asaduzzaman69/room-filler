import firebase from "../lib/firebase";
import Router from "next/router";
import { useState } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";

async function logout() {
  await firebase.auth().signOut();
  return Router.push("/login");
}

function getAuthedNavbarContent(user) {
  if (user && user.uid) {
    return (
      <React.Fragment>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Nav.Link href="/login" className="signup-btn">
          Sign in / Sign up
        </Nav.Link>
      </React.Fragment>
    );
  }
}

export default function CustomNavbar({ setHash }) {
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged((authUser) => {
    setUser(authUser);
  });

  return (
    <div className="main-navbar">
      <Navbar bg="light" expand="lg">
        <Container fluid className="py-0">
          <Navbar.Brand className="pt-0 ">
            <a href="/">
              <img src="/images/logo.png" alt="logo" className="logo" />
            </a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
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
              <Nav.Link
                href="/#local-activities"
                onClick={() => setHash("#local-activities")}
              >
                Local Activities
              </Nav.Link>
              <Nav.Link
                href="/#emergency-locations"
                onClick={() => setHash("#emergency-locations")}
              >
                Emergency Locations
              </Nav.Link>
              {/* <Nav.Link href="/about">About</Nav.Link> */}
            </Nav>
            <Nav className="ml-auto rightside-nav align-items-center">
              {getAuthedNavbarContent(user)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
