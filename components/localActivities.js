import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { localActivities } from "../public/constants/config";
// import {Carousel} from '3d-react-carousal';
const LocalActivities = ({}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prev = () => {
    setCurrentSlide(currentSlide - 1);
  };

  
  // const slides = [
  //   <img  src="https://picsum.photos/800/300/?random" alt="1" />,
  //   <img  src="https://picsum.photos/800/301/?random" alt="2" />  ,
  //   <img  src="https://picsum.photos/800/302/?random" alt="3" />  ,
  //   <img  src="https://picsum.photos/800/303/?random" alt="4" />  ,
  //   <img src="https://picsum.photos/800/304/?random" alt="5" />   ];
 
  return (
    <Row className="activities-row mt-5">
      <Col>
      <h5>
      ACTIVITIES TO ENJOY WITH
      </h5>
      <br/>
      <h6>
      Experience the amazing activities
      <br/>
      that we offer in Zion Village
      </h6>
      <Carousel
          className="mt-5 activities-carousel"
          centerMode={true}
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          selectedItem={currentSlide}
          swipeable={true}
          infiniteLoop={true}
          // centerSlidePercentage={40}
        // centerSlidePercentage={number('centerSlidePercentage', 80, {})}
    >
      {localActivities.length > 0 &&
        localActivities.map((item, index) => {
          return (
            <Card  key={`activities_${index}`}className="activities-card">
            <Card.Img variant="top" src={item.places[0].img? item.places[0].img : 'https://via.placeholder.com/'} />
            <Card.Body>
              <Card.Title>
                <h6>{item.name}</h6>
                <h5>{item.places[0].name? item.places[0].name : "Test"}</h5>
              </Card.Title>
              <Card.Text>
                {
                  item.type==='biking'? `${item.places[0].track} 'Mile Trail'` : ""
                }
                  {item.places[0].phone? item.places[0].phone : ""}
               <br/>
               <br/>
                  {item.places[0].desc? item.places[0].desc : ""}
              </Card.Text>
              <Button variant="primary">Book Now</Button>
              <Card.Link href="#">Read More</Card.Link>
            </Card.Body>
          </Card>
          );
        })}
    </Carousel>
  {/* <Carousel slides={localActivities.length > 0 &&
        localActivities.map((item, index) => {
          return (
            <Card  key={`activities_${index}`}className="activities-card">
            <Card.Img variant="top" src={item.places[0].img? item.places[0].img : 'https://via.placeholder.com/'} />
            <Card.Body>
              <Card.Title>
                <h6>{item.name}</h6>
                <h5>{item.places[0].name? item.places[0].name : "Test"}</h5>
              </Card.Title>
              <Card.Text>
                {
                  item.type==='biking'? `${item.places[0].track} 'Mile Trail'` : ""
                }
                  {item.places[0].phone? item.places[0].phone : ""}
               <br/>
               <br/>
                  {item.places[0].desc? item.places[0].desc : ""}
              </Card.Text>
              <Button variant="primary">Book Now</Button>
              <Card.Link href="#">Read More</Card.Link>
            </Card.Body>
          </Card>
          );
        })}/> */}
     <Button onClick={()=>prev()} variant="outlined" disabled={currentSlide===1}>
              <Image src={currentSlide === 1?"/images/left-arrow-big-disabled.png":"/images/left-arrow-big.png"} className="arrow"/>
              </Button>
              <Button onClick={()=>next()}variant="outlined" disabled={currentSlide===localActivities.length-1}>
              <Image src={currentSlide===localActivities.length-1?"/images/right-arrow-big-disabled.png":"/images/right-arrow-big.png"} className="arrow"/>
              </Button>
      </Col> 
    </Row>
    
  );
};

export default LocalActivities;
