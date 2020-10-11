import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../lib/firebase";
import Router from "next/router";

const uiConfig = {
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: LoggedIn
    },
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
};

function LoggedIn() {
    firebase.auth().onAuthStateChanged(
        (user) => {
            if (user) {
                Router.push('/dashboard');
            }
        }
    );
    return false;
}

export default function Login({ property }) {
    return (
        <Layout>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Login to manage your properties</h1>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}