import React, { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Router from "next/router";
import { Container, Card, Button, Row, Col,Image } from "react-bootstrap";
import {
  routes,
  quickEats,
  localEateries,
  emergencyLocations,
} from "../../public/constants/config";

const PlaceType = ({ places }) => {
  const [hash, setHash] = useState("");
  return (
    <Layout setHash={setHash}>
    <Head>
      <title>Quick Eats</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container  className="places-card-container my-5">
      <Row>
        <Col md={{span:10, offset:1}}>
          {
            places && places.length && places.length>0?
            places.map((item, index)=>{return(
              <div key={`places_${index}`}> 
              <h3>{item.name ? item.name : ""}</h3>
          {item.address1 ? <><h4>Location: <span>{item.address1}{item.address2?`, ${item.address2}`:""}</span></h4> </>  : null}
          {item.location ? <><h4>Location: <span>{item.location}</span></h4> </>  : null}
          {item.phone ? <><h4>Phone: <span>{item.phone}</span></h4> </>  : null}
          {item.price ? <><h4>Price: <span>{item.price}</span></h4> </>  : null}
          {item.stars ? <><h4>Rating: <span>{item.stars} Stars</span></h4> </>  : null}
          {item.openingHours && item.openingHours.length && item.openingHours.length > 0 ?
       <div>
    
       <h4>Opening Hours: </h4>
      {item.openingHours.map((day, index)=>{
        return(
          <div key={`opening_hours_${index}`}><h4>{day.day}: <span>{day.open && day.close ? day.open==="00:00" && day.close==="00:00"? 'Open 24 hours' :`${day.open} - ${day.close}`: "Closed"}</span></h4> </div>
        )
      }) } </div>:null}
          {item.desc?<p>{item.desc}</p>:null} 

          {item.image ?  <Image
            src={`/images${item.image}`}
            className="activity-imgs"
                />  : null}

            </div>
            )})
           
            :null
          }
      {/* <h3>{activity.name ? activity.name : ""}</h3>
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
      {activity.desc && activity.desc.length && activity.desc.length>0 ?
      activity.desc.map((item, index)=>{
        return(
          <div key={`desc_${index}`}>
          <p >{item}</p>
          <Image
            src={`/images${activity.imgs[index].name}`}
            className="activity-imgs"
                />
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
      }) } </div>:null} */}
  </Col>
  </Row>
    </Container>
  </Layout>
  );
};

export async function getStaticPaths() {
  const placetype = [];
  routes.forEach((item) => {
    placetype.push({
      params: { placetype: item },
    });
  });
  return {
    paths: placetype,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let places = [];
  if (params.placetype === "quick-eats") {
    places=quickEats;
  } else if (params.placetype === "local-eats") {
    places=localEateries;
  } else {
    places=emergencyLocations;
  }
  return {
    props: {
      places,
    },
  };
}

export default PlaceType;
