import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../lib/firebase";
import Router from "next/router";
import { Container, Row, Col } from "react-bootstrap";

const uiConfig = {
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: LoggedIn
  },
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

function LoggedIn() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      Router.push("/dashboard");
    }
  });
  return false;
}

export default function Login({ property }) {
  return (
    <Layout>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="pb-5 mb-5">
          <Row className="mx-auto">
            <Col className="mb-5 headingbox text-center col-md-6 offset-md-3">
              <h2>Login to manage your properties</h2>
              <hr />
            </Col>
          </Row>
          <StyledFirebaseAuth
            className="signbox"
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <h2 className="text-center backhome mt-4 mb-5 pb-5">
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </h2>
      </Container>
    </Layout>
  );
}
