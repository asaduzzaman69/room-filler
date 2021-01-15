import React,{useState} from "react";
import Link from "next/link";
import { Container, Row, Col, Card, Form,Button } from "react-bootstrap";
import { getSearchLink } from "../services/properties";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import { Carousel } from 'react-responsive-carousel';

const Banner = ({}) => {
    const [startDate, setStartDate]= useState(null);
    const [endDate, setEndDate]= useState(null);
    const [guests, setGuests]= useState(1);
    const [focusedStartDate, setFocusedStartDate]= useState(null);
    const [focusedEndDate, setFocusedEndDate]= useState(null);

    return(
        <div className="main-bg">
            <div className="greyscale py-5">
              <Container >
                <Row className=" search-section">
                       <Col className="search-height">
                       <p className="search-heading">Check in</p>
                        <SingleDatePicker
                            placeholder="Select dates"
                            date={startDate} 
                            onDateChange={date => setStartDate({ date })} 
                            focused={focusedStartDate} 
                            onFocusChange={({ focused }) => setFocusedStartDate({ focused })} 
                            id="start_date" 
                            noBorder={true}
                            small={true}
                        />
                      </Col>
                      <Col className="search-height">
                      <p className="search-heading">Check out</p>
                        <SingleDatePicker
                            placeholder="Select dates"
                            date={endDate} 
                            onDateChange={date => setEndDate({ date })} 
                            focused={focusedEndDate} 
                            onFocusChange={({ focused }) => setFocusedEndDate({ focused })} 
                            id="end_date" 
                            noBorder={true}
                            small={true}
                        />
                      </Col>
                    
                      <Col className="search-height">
                      <p className="search-heading">Guests</p>
                        <Form.Group
                          controlId="propertySearchGuestCount"
                          className="mb-0"
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
            
                      <Col className="search-height">
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

                        <Button variant="primary" className="book-btn">Book now</Button>
                      </Col>
                </Row>
                <Row className="mt-5 pt-2">
                  <Col>
                  <h1 className="banner-heading">
                  ZION VILLAGE RESORT
                  </h1>
                  <p className="banner-text">
                    With the perfect balance of relaxation and adventure, Zion Village is the<br/>
                    perfect getaway for anyone looking to enjoy all Southern Utah has to offer.<br />
                    Offering brand new townhomes and luxury amenities including a private<br />
                    clubhouse and pool area, Zion Village has garnered a reputation for being<br />
                    one of the top vacation retreats in Utah.
                    </p>
                  </Col>
                  <Col>
                  <Carousel showThumbs={false}>
                  <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="/images/banner-slider1.png" />
  </Card>
            </Carousel>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
    )
}
 
export default Banner;