import React, { useState, useRef,useEffect } from "react";
import Router from "next/router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
} from "react-bootstrap";
import { localActivities } from "../public/constants/config";
import Slider from "react-slick";

const LocalActivities = ({}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState('');
  const sliderRef = useRef(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
 
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
    slidesToShow: windowWidth <= 575 ? 1:3,
    arrows: false,
  };

  return (
    <Row className="activities-row text-center mt-5 align-items-center mx-auto px-0">
      <Col className="px-0">
        <h5>ACTIVITIES TO ENJOY WITH</h5>
        {windowWidth <= 575?null:<br />}
        <h6>
          Experience the amazing activities
          <br />
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
                <div
                  key={"local-activity-" + index}
                  style={{ width: "250px !important" }}
                >
                  <Card
                    key={`activities_${index}`}
                    className="activities-card demo"
                    onClick={() => Router.push(`activities/${item.type}`)}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        item.places[0].bannerImg
                          ? `/images${item.places[0].bannerImg}`
                          : "https://via.placeholder.com/"
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        <h6>{item.name}</h6>
                        <h5>
                          {item.places[0].name ? item.places[0].name : ""}
                        </h5>
                      </Card.Title>
                      <Card.Text>
                        {item.type === "biking"
                          ? `${item.places[0].track} 'Mile Trail'`
                          : ""}
                        {item.places[0].phone ? <>{item.places[0].phone}<br/></> : ""}
                        {item.places[0].desc ? (
                          item.places[0].desc
                        ) : (
                          <>
                            <br />
                            <br />
                          </>
                        )}
                      </Card.Text>
                      <Button variant="primary">Book Now</Button>
                      <Card.Link href="#">Read More</Card.Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </Slider>
        <Button onClick={() => prev()} variant="outlined">
          <Image src={"/images/left-arrow-big.png"} className="arrow" />
        </Button>
        <Button onClick={() => next()} variant="outlined">
          <Image src={"/images/right-arrow-big.png"} className="arrow" />
        </Button>
      </Col>
    </Row>
  );
};

export default LocalActivities;
