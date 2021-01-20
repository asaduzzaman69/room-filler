import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { getSearchLink } from "../services/properties";
import { DateRangePicker } from "react-dates";
import Slider from "react-slick";

const Banner = ({}) => {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [guests, setGuests] = useState(1);
  // const [focusedStartDate, setFocusedStartDate] = useState(null);
  // const [focusedEndDate, setFocusedEndDate] = useState(null);
  const router = useRouter();

  const startDateParam = router.query.startDate;
  const endDateParam = router.query.endDate;
  const guestCount = router.query.guests;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [guests, setGuests] = useState(guestCount || 1);
  const sliderRef = useRef(null);

  const setSlide = (item) => {
    setCurrentSlide(item);
    sliderRef.current.slickGoTo(item);
  };

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
  };

  return (
    <div className="main-bg">
      <div className="greyscale py-5">
        <Container  fluid="lg">
          <Row className="search-section">
            <Col className="search-height">
              <p className="search-heading">Check in</p>
              {/* <DateRangePicker
                className="w-100"
                startDateId="startDate"
                endDateId="endDate"
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) => {
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => {
                  setFocusedInput(focusedInput);
                }}
                noBorder={true}
  //                onOutsideClick={actionHandler}
  // onPrevMonthClick={actionHandler}
  // onNextMonthClick={actionHandler}
  showInputs
              /> */}
              {/* <SingleDatePicker
                placeholder="Select dates"
                date={startDate}
                onDateChange={(date) => {
                  setStartDate(date );
                  setFocusedStartDate(null);
                }}
                focused={focusedStartDate}
                onFocusChange={({ focused }) =>
                  setFocusedStartDate({ focused })
                }
                id="start_date"
                noBorder={true}
                small={true}
                numberOfMonths={1}
                autoFocus
              /> */}
            </Col>
            <Col className="search-height">
              <p className="search-heading">Check out</p>
              {/* <SingleDatePicker
                placeholder="Select dates"
                date={endDate}
                onDateChange={(date) => setEndDate(date)}
                focused={focusedEndDate}
                onFocusChange={({ focused }) => setFocusedEndDate({ focused })}
                // id="end_date"
                noBorder={true}
                small={true}
                numberOfMonths={1}
              /> */}
            </Col>

            <Col className="search-height">
              <p className="search-heading">Guests</p>
              <Form.Group
                controlId="propertySearchGuestCount"
                className="mb-0 select-guest"
              >
                <Form.Control
                  as="select"
                  placeholder="Select guests"
                  onChange={() => {
                    // this.setState({
                    //   ...this.state,
                    //   guests: document.getElementById(
                    //     "propertySearchGuestCount"
                    //   ).value
                    // });
                  }}
                  size="sm"
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

            <Col className="search-height pr-0 text-md-right">
              {/* <Link
                          href={getSearchLink(
                            startDate,
                            endDate,
                            guests
                          )}
                        >
                          <button className="btn btn-primary searchbutn py-2">
                            Search
                          </button>
                        </Link> */}

              <Button variant="primary" className="book-btn">
                Book now
              </Button>
            </Col>
          </Row>
          <Row className="mt-5 pt-2">
            <Col xs={12} md={6} lg={6} sm={6}>
              <h1 >ZION VILLAGE RESORT</h1>
              <p className="banner-text">
                With the perfect balance of relaxation and adventure, Zion
                Village is the
                perfect getaway for anyone looking to enjoy all Southern Utah
                has to offer.
                Offering brand new townhomes and luxury amenities including a
                private
                clubhouse and pool area, Zion Village has garnered a reputation
                for being
                one of the top vacation retreats in Utah.
              </p>
              <Button className="read-more-btn">
                Read more
                <i className="fal fa-arrow-right arrow-icon"></i>
              </Button>
            </Col>
            <Col xs={10} sm={5} md={5} lg={5}style={{ alignSelf: "center" }}>
              <Slider {...settings} ref={sliderRef}>
                <div>
                  <Card>
                    <Card.Img variant="top" src="/images/banner-slider1.png" />
                  </Card>
                </div>
                <div>
                  <Card>
                    <Card.Img variant="top" src="/images/banner-slider2.png" />
                  </Card>
                </div>
                <div>
                  <Card>
                    <Card.Img variant="top" src="/images/banner-slider1.png" />
                  </Card>
                </div>
                <div>
                  <Card>
                    <Card.Img variant="top" src="/images/banner-slider2.png" />
                  </Card>
                </div>
              </Slider>
            </Col>
            <Col xs={2} sm={1} md={1} lg={1} style={{ alignSelf: "center" }}>
              {[0, 1, 2, 3].map((item) => (
                <div
                  className={
                    currentSlide === item
                      ? "selected-carousel-dot"
                      : "carousel-dot"
                  }
                  onClick={() => setSlide(item)}
                  key={"mini-banner-tab-" + item}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
