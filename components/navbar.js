import Link from "next/link";
import firebase from "../lib/firebase";
import Router from "next/router";

async function logout() {
    await firebase.auth().signOut();
    return Router.push('/login');
}

function getAuthedNavbarContent() {
    let user = firebase.auth().currentUser;
    if (user && user.uid) {
        return (
            <ul className="navbar-nav col-12">
                <li className="nav-item ml-auto">
                    <Link href="/dashboard">
                        <a className="nav-link">Dashboard</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="btn btn-link ml-auto" onClick={logout}>Logout</a>
                </li>
            </ul>
        )
    }
    return <Link href="/login">
        <a className="nav-link ml-auto cursor-pointer">Sign in</a>
    </Link>
}

export default function Navbar({ user }) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light">
            <Link href="/">
                <a className="navbar-brand font-weight-bold ml-md-5 pl-lg-5">Zion Village Resorts</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mr-md-5 pr-lg-5" id="navbarText">
                {getAuthedNavbarContent()}
            </div>
        </nav>
    )
}