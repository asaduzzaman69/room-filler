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
import { getSearchLink } from "../services/properties";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import { Carousel } from "react-responsive-carousel";
import { localActivities } from "../public/constants/config";

const LocalActivities = ({}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prev = () => {
    setCurrentSlide(currentSlide - 1);
  };

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
          centerMode
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          selectedItem={currentSlide}
          swipeable={true}
          infiniteLoop={true}
          selectedItem={currentSlide}
        centerSlidePercentage={50}
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
