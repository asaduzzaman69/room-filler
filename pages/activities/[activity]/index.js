import React, {useState} from 'react';
import Layout from "../../../components/layout";
import Head from "next/head";
import Router from "next/router";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { localActivities } from "../../../public/constants/config";

const ActivityPage = ({ activity }) => {
  console.log(activity);
  const [hash, setHash] = useState("");
  return (
    <Layout setHash={setHash}>
      <Head>
        <title>Activties</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="activities-bg"
        style={{ background: `url(/images${activity.img})` }}
      >
        <div className="greyscale py-5">
          <Container fluid="lg">
              <h1>{activity.name}</h1>
          </Container>
        </div>
      </div>
      <Container fluid="lg" className="places-card-container my-5">
        <Row>
         
        {
          activity.places.map((item, index)=>{
            return(
              <Col xs={12} sm={6} md={6} lg={4} key={`activity_places_${index}`}>
                <Card className="places-card" onClick={()=>Router.push(`${activity.type}/${item.slug}`)}>
                    <Card.Img
                      variant="top"
                      src={
                        item.bannerImg
                          ? `/images${item.bannerImg}`
                          : "https://via.placeholder.com/"
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        <h5>
                          {item.name ? item.name : ""}
                        </h5>
                      </Card.Title>
                      <Card.Text>
                        {activity.type === "biking"
                          ? <>{item.track} Mile Trail<br/></>
                          : ""}
                        {item.phone ? item.phone : ""}
                        {item.phone?<br/>:null}
                        {item.desc ? (
                          item.desc
                        ) : (null
                        )}
                      </Card.Text>
                      <Button variant="primary">Book Now</Button>
                      <Card.Link href="#">Read More</Card.Link>
                    </Card.Body>
                  </Card>
              </Col>
            )
          })
        }
       
        </Row>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const activities = [];
  localActivities.forEach((item) => {
    activities.push({
      params: { activity: item.type },
    });
  });
  return {
    paths: activities,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let activity = {};
  localActivities.forEach((item) => {
    if (item.type === params.activity) {
      activity = item;
    }
  });
  return {
    props: {
      activity,
    },
  };
}

export default ActivityPage;
