import Link from "next/link";
import firebase from "../lib/firebase";
import Router from "next/router";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

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
  firebase.auth().onAuthStateChanged(authUser => {
    setUser(authUser);
  });

  return (
    <Navbar className="fixed-bottom text-center justify-content-center">
      <Nav>
        <a className="mr-2">&copy; 2020 Jones-Trawick Software</a>
      </Nav>
      <Navbar.Brand href="/" className="px-4 mr-0">
        Zion Village Properties
      </Navbar.Brand>
      <Nav>{getAuthedNavbarContent(user)}</Nav>
    </Navbar>
  );
}
