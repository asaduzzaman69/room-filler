import React, { useState,useRef } from "react";
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
// import { Carousel } from "react-responsive-carousel";
import { localActivities } from "../public/constants/config";
import Slider from "react-slick";


const LocalActivities = ({}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null)
  const next = () => {
    setCurrentSlide(currentSlide + 1);
    sliderRef.current.slickNext();
  };

  const prev = () => {
    setCurrentSlide(currentSlide - 1);
    sliderRef.current.slickPrev();
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    arrows:false
  };

  return (
    <Row className="activities-row mt-5 align-items-center mx-auto">
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
      <div className="view-all-btn-sec">
      {/*<Button  variant="outlined"  className="view-all-btn">View all */}
      {/*  <i className="fal fa-arrow-right arrow-icon" ></i>*/}
      {/*</Button>*/}
      </div>
 <Slider {...settings} ref={sliderRef}>
 {localActivities.length > 0 &&
        localActivities.map((item, index) => {
          return (
            <div key={'local-activity-' + index}>
                <Card  key={`activities_${index}`} className="activities-card">
                <Card.Img variant="top" src={item.places[0].img? item.places[0].img : 'https://via.placeholder.com/'} />
                <Card.Body>
                  <Card.Title>
                    <h6>{index} {item.name}</h6>
                    <h5>{item.places[0].name? item.places[0].name : ""}</h5>
                  </Card.Title>
                  <Card.Text>
                    {
                      item.type==='biking'? `${item.places[0].track} 'Mile Trail'` : ""
                    }
                      {item.places[0].phone? item.places[0].phone : ""}
                   <br/>
                   <br/>
                      {item.places[0].desc? item.places[0].desc : <><br/><br/></>}
                  </Card.Text>
                  <Button variant="primary">Book Now</Button>
                  <Card.Link href="#">Read More</Card.Link>
                </Card.Body>
              </Card>
          </div>
          );
        })}
        </Slider>
              <Button onClick={()=>prev()} variant="outlined" >
              <Image src={"/images/left-arrow-big.png"} className="arrow"/>
              </Button>
              <Button onClick={()=>next()}variant="outlined" >
              <Image src={"/images/right-arrow-big.png"} className="arrow"/>
              </Button>
     {/* <Button onClick={()=>prev()} variant="outlined" disabled={currentSlide===0}>
              <Image src={currentSlide === 0?"/images/left-arrow-big-disabled.png":"/images/left-arrow-big.png"} className="arrow"/>
              </Button>
              <Button onClick={()=>next()}variant="outlined" disabled={currentSlide===localActivities.length-1}>
              <Image src={currentSlide===localActivities.length-1?"/images/right-arrow-big-disabled.png":"/images/right-arrow-big.png"} className="arrow"/>
              </Button> */}
      </Col> 
    </Row>
    
  );
};

export default LocalActivities;
