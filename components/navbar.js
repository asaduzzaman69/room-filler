import Link from "next/link";
import firebase from "../lib/firebase";
import Router from "next/router";

async function logout() {
    await firebase.auth().signOut();
    return Router.push('/login');
}

function getAuthedNavbarContent(user) {
    if (user && user.uid) {
        return <a className="btn btn-link ml-auto" onClick={logout}>Logout</a>
    }
    return (null);
}

export default function Navbar({ user }) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar w/ text</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav col-12">
                    <li className="nav-item active">
                        <Link href="/">
                            <a className="nav-link">Back to home</a>
                        </Link>
                    </li>
                    <li className="nav-item ml-auto">
                        <Link href="/dashboard">
                            <a className="nav-link">Dashboard</a>
                        </Link>
                    </li>
                </ul>
                {getAuthedNavbarContent(user)}
            </div>
        </nav>
    )
}