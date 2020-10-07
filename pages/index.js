import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import {Container, Row, Col} from "react-bootstrap";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>{getEnvironmentConfig().title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <Link href="/login"><a>Login</a></Link>
          <Container>
              <Row className="justify-content-end">
                  <Col>1 of 3</Col>
                  <Col xs={6}>2 of 3 (wider)</Col>
                  <Col>3 of 3</Col>
              </Row>
              <Row>
                  <Col>1 of 3</Col>
                  <Col xs={5}>2 of 3 (wider)</Col>
                  <Col>3 of 3</Col>
          </Row>
          </Container>
      </main>

      <style jsx global>{`
        
      `}</style>
    </div>
  )
}
