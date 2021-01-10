import Link from "next/link";
import firebase from "../lib/firebase";
import Router from "next/router";
import { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

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
      // <ul className="navbar-nav col-12">
      //   <li className="nav-item ml-auto">
      //     <Link href="/dashboard">
      //       <a className="nav-link">Dashboard</a>
      //     </Link>
      //   </li>
      //   <li className="nav-item">
      //     <a className="btn btn-link ml-auto" onClick={logout}>
      //       Logout
      //     </a>
      //   </li>
      // </ul>
    );
  }
  return (
    // <ReactFragment>
    //   <Nav.Link href="#home">About</Nav.Link>
    //   <Nav.Link href="#link">Sign in</Nav.Link>
    // </ReactFragment>
    <ul className="navbar-nav col-12">
      {/* <li className="nav-item ml-auto">
        <Link href="/login">
          <a className="nav-link ml-auto cursor-pointer">About</a>
        </Link>
      </li> */}
      <li className="nav-item">
        <Link href="/login">
          <a className="nav-link ml-auto cursor-pointer">Sign in</a>
        </Link>
      </li>
    </ul>
  );
}

export default function CustomNavbar({ bg }) {
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged(authUser => {
    setUser(authUser);
  });

  return (
    <div className="main-navbar">
      <Navbar bg="light" expand="lg" fixed="top">
        <Container className="px-3">
          <Navbar.Brand href="/">Zion Village Resorts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Nav className="ml-auto rightside-nav">
              {getAuthedNavbarContent(user)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <nav
        className={
          "navbar navbar-expand-lg fixed-top navbar-light " + (bg || "")
        }
      >
        <Link href="/">
          <a className="navbar-brand font-weight-bold ml-lg-5 pl-lg-5">
            Zion Village Resorts
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mr-lg-5 pr-lg-5"
          id="navbarText"
        >
          {getAuthedNavbarContent(user)}
        </div>
      </nav> */}
    </div>
  );
}
