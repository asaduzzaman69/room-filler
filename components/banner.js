import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { getSearchLink } from "../services/properties";
import { DateRangePicker } from "react-dates";
import Slider from "react-slick";

//this function is for spliting the large title in a single one

const splitTitle = (title) => {
  return title.split("|")[0];
};

const Banner = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [guests, setGuests] = useState(1);
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const sliderRef = useRef(null);

  const setSlide = (item) => {
    setCurrentSlide(item);
    sliderRef.current.slickGoTo(item);
  };

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };



  const handleOnRouteChange = () => {

    if(startDate && endDate && guests) {
      Router.push(getSearchLink(startDate, endDate, guests))
    } else {
      alert('You must have to specified the Start Date,End Date and Guest')
    }
  }

  return (
    <div className="main-bg">
      <div className="greyscale">
        <Container className="col-12 col-lg-10 offset-lg-1 py-5">
          <Row className="search-section mx-auto mb-4 align-self-center p-2">
            <Col className="search-height pl-4" sm={6}>
              <p className="search-heading">
                Check in &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; Check out
              </p>
              <DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) => {
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => {
                  setFocusedInput(focusedInput);
                }}
                noBorder={true}
                customArrowIcon={<div />}
                orientation={windowWidth <= 575 ? "vertical" : "horizontal"}
                daySize={windowWidth <= 575 ? 30 : 40}
              />
            </Col>

            <Col className="search-height" xs={12} sm={3}>
              <p className="search-heading">Guests</p>
              <Form.Group
                controlId="propertySearchGuestCount"
                className="mb-0 select-guest"
              >
                <Form.Control
                  as="select"
                  placeholder="Select guests"
                  onChange={(evt) => {
                    setGuests(evt.target.value);
                  }}
                  size="sm"
                  value={guests}
                >
                  <option value={1}>1 guest</option>
                  <option value={2}>2 guests</option>
                  <option value={3}>3 guests</option>
                  <option value={4}>4 guests</option>
                  <option value={5}>5 guests</option>
                  <option value={6}>6 guests</option>
                  <option value={7}>7 guests</option>
                  <option value={8}>8 guests</option>
                  <option value={9}>9 guests</option>
                  <option value={10}>10 guests</option>
                  <option value={11}>11 guests</option>
                  <option value={12}>12+ guests</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col
              className="search-height pr-0 text-center text-md-right"
              xs={12}
              sm={3}
            >
          
                <Button  onClick={() =>
                 handleOnRouteChange()
                } variant="primary" className="book-btn">
                  Book now
                </Button>
            </Col>
          </Row>
          <Row className="info-carousel-section align-items-center">
            <Col xs={12} md={6} lg={6} sm={6}>
              <h1>ZION VILLAGE RESORT</h1>
              <p className="banner-text font-weight-bold">
                With the perfect balance of relaxation and adventure, Zion
                Village is the perfect getaway for anyone looking to enjoy all
                Southern Utah has to offer. Offering brand new townhomes and
                luxury amenities including a private clubhouse and pool area,
                Zion Village has garnered a reputation for being one of the top
                vacation retreats in Utah.
              </p>
              <Button
                className="read-more-btn"
                onClick={() => Router.push("/view-all-property")}
              >
                View All Property
                <i className="fal fa-arrow-right arrow-icon"></i>
              </Button>
            </Col>
            <Col
              xs={10}
              sm={5}
              md={5}
              lg={4}
              style={{ alignSelf: "center" }}
              className="offset-lg-1 pr-0"
            >
              <Slider {...settings} ref={sliderRef}>
                {Object.keys(props.properties)
                  .slice(0, 9)
                  .map((item, index) => {
                    return (
                      props.properties[item] &&
                      props.properties[item].published &&
                      props.properties[item].images.length && (
                        <Link
                          href={
                            props.properties[item].address.state
                              .toLowerCase()
                              .trim() +
                            "/" +
                            props.properties[item].link
                          }
                          key={"slider-image-" + index}
                        >
                          <Card className="card-home">
                            <div className="overlay"></div>
                            <div
                              style={{
                                backgroundImage: `url(${props.properties[item].images[0]})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                              /*  src={props.properties[item].images[0]} */
                              className="card-home__image"
                            ></div>
                            <span className="p-2 card-home__text">
                              <p className="text-left mb-0 font-weight-bold">
                                {props.properties[item].title.substring(
                                  0,
                                  200
                                ) + "..."}
                              </p>
                              {/* <p className="text-left mb-0 font-weight-bold">
                              {" "}
                              {props.properties[item].title}{" "}
                            </p>
                            <p className="text-left mb-0 iconbox">
                              {" "}
                              {props.properties[item].bedroomCount} Beds{" "}
                              {props.properties[item].maxOccupancy} Guests{" "}
                            </p> */}
                            </span>
                          </Card>
                        </Link>
                      )
                    );
                  })}
              </Slider>
            </Col>
            <Col
              xs={2}
              sm={1}
              md={1}
              lg={1}
              className="pr-0"
              style={{ alignSelf: "center" }}
            >
              {Object.keys(props.properties)
                .slice(0, 9)
                .map(
                  (item, index) =>
                    props.properties[item] &&
                    props.properties[item].published && (
                      <div
                        key={"slider-dot-" + index}
                        className={
                          currentSlide === item
                            ? "selected-carousel-dot"
                            : "carousel-dot"
                        }
                        onClick={() => setSlide(item)}
                        key={"mini-banner-tab-" + item}
                      />
                    )
                )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
