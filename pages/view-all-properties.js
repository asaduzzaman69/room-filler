import React, { useState } from "react";
import firebase from "../lib/firebase";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Router from "next/router";
import { getAllProperties } from "../services/properties";

import Layout from "../components/layout";

export default function ViewAllProperties(props) {
  console.log(props.data);
  const [hash, setHash] = useState("");
  return (
    <Layout setHash={setHash}>
      <Container fluid="lg" className="places-card-container my-5">
        <Row>
          <h2 className="col-12 text-center">Properties</h2>
          <hr />
        </Row>
        <Row style={{minHeight: 'calc(100vh - 350px)'}}>
          {props.data.map((item, index) => {
            return (
              <Col
                xs={12}
                sm={6}
                md={6}
                lg={4}
                key={`activity_places_${index}`}
              >
                <Card
                  className="places-card"
                  onClick={() =>
                    Router.push(
                      `/${item.address.state.toLowerCase().trim()}/${item.link.toLowerCase().trim()}`
                    )
                  }
                >
                  <Card.Img
                    variant="top"
                    src={
                      item.images.length > 0
                        ? item.images[0]
                        : "https://via.placeholder.com/328x216"
                    }
                  />
                  <Card.Body>
                    <Card.Title>
                      <h5>{item.title ? item.title : ""}</h5>
                    </Card.Title>
                    <div className="d-flex">
                      <div className="my-1 mr-3">
                        <i className="fas fa-user-friends"></i>
                        <span className="ml-2 amenity">
                          {item.maxOccupancy}
                        </span>
                      </div>
                      <div className="my-1 mr-3">
                        <i className="fas fa-bed"></i>
                        <span className="ml-2 amenity">
                          {item.bedroomCount}
                        </span>
                      </div>
                      <div className="my-1 mr-3">
                        <i className="fas fa-hot-tub"></i>
                        <span className="ml-2 amenity">
                          {item.bathroomCount}
                        </span>
                      </div>
                    </div>
                    <Card.Text>{item.description}</Card.Text>
                    <Button variant="primary">View More</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const res = await firebase
    .firestore()
    .collection("properties")
    .orderBy("title")
    .get();

  const data = await res.docs.map((el) => el.data());

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
