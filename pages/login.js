import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../lib/firebase";
import {Form, Button} from "react-bootstrap";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Email as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
};

firebase.auth().onAuthStateChanged(
    (user) => this.setState({isSignedIn: !!user})
);

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