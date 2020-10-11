import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import {Container, Row, Col} from "react-bootstrap";
import Navbar from "../components/navbar";
import {useState} from "react";
import firebase from "../lib/firebase";
import {getAllProperties} from "../services/properties";

function getProperties(properties) {
    console.log(properties)
    return (
        <Row>
            {
                Object.keys(properties).map((prop) => {
                    return <Col>{properties[prop].title}</Col>
                })
            }
        </Row>
    )
}

export default function Home(props) {
    const [properties] = useState([]);
    console.log(properties, props)
    return (
        <div className="container">
          <Head>
            <title>{getEnvironmentConfig().title}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
              <Navbar />
              <Container>
                  {getProperties(props)}
              </Container>
          </main>

          <style jsx global>{`
            
          `}</style>
        </div>
    )
}

export async function getStaticProps({ params }) {
    const allProperties = await getAllProperties();
    const properties = [];
    allProperties.docs.forEach((doc) => {
        properties.push(doc.data());
    });
    return {
        props: {...properties}
    }
}