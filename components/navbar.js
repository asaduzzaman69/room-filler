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
    <div>
        <div className="row">
            <Link href="/">
                <a className="btn btn-link">Home</a>
            </Link>
            <Link href="/dashboard">
                <a className="btn btn-link">Dashboard</a>
            </Link>

            {getAuthedNavbarContent(user)}
        </div>
    </div>
    )
}