import React, {useState} from 'react';
import Layout from "../../../components/layout";
import Head from "next/head";
import { Container, Card, Button, Row, Col, Image } from "react-bootstrap";
import { localActivities } from "../../../public/constants/config";

const Activity = ({ activity }) => {
  const [hash, setHash] = useState("");
  return (
    <Layout setHash={setHash}>
      <Head>
        <title>{activity.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="activities-bg"
        style={{ background: `url(/images${activity.bannerImg})`, backgroundPosition:activity.bannerImgPosition }}
      >
        <div className="greyscale py-5">
          <Container fluid="lg">
            <h1>{activity.name}</h1>
          </Container>
        </div>
      </div>
      <Container  className="places-card-container my-5">
        <Row>
          <Col md={{span:10, offset:1}}>
        <h3>{activity.name ? activity.name : ""}</h3>
            {activity.type ? <><h4>Trail Type: <span>{activity.type}</span></h4> </>  : null}
            {activity.trailHead ? <><h4>Trail Head: <span>{activity.trailHead}</span></h4> </>  : null}
            {activity.length ? <><h4>Trail Length: <span>{activity.length}</span></h4> </>  : null}
            {activity.surface ? <><h4>Trail Surface: <span>{activity.surface}</span></h4> </>  : null}
            {activity.timing ? <><h4>Trail Timing: <span>{activity.timing}</span></h4> </>  : null}
            {activity.difficulty ? <><h4>Trail Difficulty: <span>{activity.difficulty}</span></h4> </>  : null}
            {activity.season ? <><h4>Trail Season: <span>{activity.season}</span></h4> </>  : null}
            {activity.dogs ? <><h4>Pets: <span>{activity.dogs}</span></h4> </>  : null}
            {activity.fees ? <><h4>Fees: <span>{activity.fees}</span></h4> </>  : null}
            {activity.location ? <><h4>Location: <span>{activity.location}</span></h4> </>  : null}
            {activity.fullLoc ? <><h4>How to reach: <span>{activity.fullLoc}</span></h4> </>  : null}
            {activity.phone ? <><h4>Phone: <span>{activity.phone}</span></h4> </>  : null}
            {activity.price ? <><h4>Price: <span>{activity.price}</span></h4> </>  : null}
            {activity.track ? <><h4>Track: <span>{activity.track} Mile Trail</span></h4> </>  : null}
            {activity.link ? <><h4>Link: <a href={activity.link} target="_blank">{activity.link}</a></h4> </>  : null}
            {activity.entranceFees && activity.entranceFees.length && activity.entranceFees.length > 0 ?
         <div>
         <h4>Entrance Fees:</h4>
        {activity.entranceFees.map((item, index)=>{
          return(
            <h4 key={`entrance_fees${index}`}><span> &nbsp;&nbsp;&nbsp; {item}</span></h4>
          )
        }) } </div>:null}
        {activity.openingHours && activity.openingHours.length && activity.openingHours.length > 0 ?
         <div>
         <h4>Opening Hours </h4>
        {activity.openingHours.map((item, index)=>{
          return(
            <div key={`opening_hours_${index}`}><h4>{item.day}: <span>{item.open && item.close ? `${item.open} - ${item.close}`: "Closed"}</span></h4> </div>
          )
        }) } </div>:null}
        {activity.desc && activity.desc.length>0 ?
        activity.desc.map((item, index)=>{
          return(
            <div key={`desc_${index}`}>
            <p >{item}</p>
            <div>
              <Image
              src={`/images${activity.imgs[index].name}`}
              className="activity-imgs"
                  />
            </div>
            
             </div>
          )
        }):null}
         {activity.directions && activity.directions.length && activity.directions.length > 0 ?
         <div>
         <h4>Miles and Directions </h4>
        {activity.directions.map((item, index)=>{
          return(
            <p key={`directions_${index}`}>{item}</p>
            
          )
        }) } </div>:null}
    </Col>
    </Row>
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
  console.log(activities)
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
