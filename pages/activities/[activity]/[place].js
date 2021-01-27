import Layout from "../../../components/layout";
import Head from "next/head";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { localActivities } from "../../../public/constants/config";

const Activity = ({ activity }) => {
  console.log("***********", activity);
  return (
    <Layout>
      <Head>
        <title>{activity.name}</title>
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
        <h5>{activity.name ? activity.name : ""}</h5>
        <h6>
          {activity.type === "biking" ? `${activity.track} 'Mile Trail'` : ""}
          {activity.phone ? activity.phone : ""}
        </h6>
        <br />

        <p>{activity.desc ? activity.desc : null}</p>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths(context) {
  const activities = [];
  localActivities.forEach((item) => {
    item.places.map((place) => {
      activities.push({
        params: { activity: item.type, place: place.slug },
      });
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
    item.places.map((place) => {
      if (place.slug === params.place && item.type === params.activity) {
        activity = place;
      }
    });
  });
  return {
    props: {
      activity,
    },
  };
}
export default Activity;
