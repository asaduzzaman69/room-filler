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
  const [guests, setGuests] = useState(0);
  const [windowWidth, setWindowWidth] = useState("");
  const [filteredProperties, setFilteredProperties]= useState([])
  const sliderRef = useRef(null);

  useEffect(() => {
   if(props && props.properties){
   const tempData= [];
   Object.keys(props.properties).slice(0, 9).map((item)=>{
      if(props.properties[item] &&
      props.properties[item].published &&
      props.properties[item].images.length){
       tempData.push(props.properties[item])
      }
    })
    setFilteredProperties(tempData)
   }
  }, [props.properties]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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
    if (startDate && endDate && guests) {
      Router.push(getSearchLink(startDate, endDate, guests));
    } else {
      alert("You must have to specified the Start Date,End Date and Guest");
    }
  };
  

  return (
    <div className="main-bg">
      <div className="greyscale">
        <Container className="col-12 col-lg-10 offset-lg-1 py-sm-5 d-flex flex-column-reverse flex-sm-column">
          <Row
            className="search-section mx-auto mb-4 align-self-center p-2 align-items-center"
            style={{
              marginLeft: "auto!important",
              marginRight: "auto!important",
            }}
          >
            <Col className="search-height pl-md-4 mb-2 mb-md-0" sm={6}>
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
                  <option >guest</option>
                  
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
              className="search-height px-0 text-center text-md-right"
              xs={12}
              sm={3}
            >
              <Button
                onClick={() => handleOnRouteChange()}
                variant="primary"
                className="book-btn"
              >
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
                onClick={() => Router.push("/view-all-properties")}
              >
                View All
                <i className="fal fa-arrow-right arrow-icon"></i>
              </Button>
            </Col>
            <Col
              xs={10}
              sm={5}
              md={5}
              lg={4}
              style={{ alignSelf: "center" }}
              className="offset-lg-1 pr-0 d-none d-sm-block"
            >
              <Slider
                {...settings}
                ref={sliderRef}
                beforeChange={(current, next) => setCurrentSlide(next)}
              >
                {filteredProperties.length > 0 &&
                  filteredProperties.map((item, index) => {
                    return (
                      <Link
                        href={
                          item.address.state.toLowerCase().trim() +
                          "/" +
                          item.link
                        }
                        key={"slider-image-" + index}
                      >
                        <Card className="card-home cursor-pointer mx-auto align-self-center">
                          <div className="overlay"></div>
                          <div
                            style={{
                              backgroundImage: `url(${item.images[0]})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              borderRadius: "50%",
                              width: "150px",
                              height: "150px",
                            }}
                            /*  src={item.images[0]} */
                            className="card-home__image mx-auto my-4"
                          ></div>
                          <span className="p-2 card-home__text">
                            <p className="text-left mb-0 font-weight-bold">
                              {
                                item.title
                                //     .substring(
                                //   0,
                                //   200
                                // ) + "..."
                              }
                            </p>
                            {/* <p className="text-left mb-0 font-weight-bold">
                              {" "}
                              {item.title}{" "}
                            </p>
                            <p className="text-left mb-0 iconbox">
                              {" "}
                              {item.bedroomCount} Beds{" "}
                              {item.maxOccupancy} Guests{" "}
                            </p> */}
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
                            <div className="d-flex">
                              <Button
                                className="signup-btn mt-2 mx-auto"
                                style={{
                                  backgroundColor: "#fecb56",
                                  border: "none",
                                }}
                              >
                                Book Now
                              </Button>
                            </div>
                          </span>
                        </Card>
                      </Link>
                    );
                  })}
              </Slider>
            </Col>
            <Col
              xs={2}
              sm={1}
              md={1}
              lg={1}
              className="pr-0 d-none d-sm-block"
              style={{ alignSelf: "center" }}
            >
              {filteredProperties.length > 0 &&
                filteredProperties.map((item, index) => {
                  return (
                    <div
                      key={"slider-dot-" + index}
                      className={
                        currentSlide === parseInt(index, 10)
                          ? "selected-carousel-dot"
                          : "carousel-dot"
                      }
                      onClick={() => setSlide(index)}
                      key={"mini-banner-tab-" + index}
                    />
                  );
                })}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
