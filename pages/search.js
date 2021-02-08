import Link from "next/link";
import moment from "moment";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout";
import { getAvailableProperties, getSearchLink } from "../services/properties";
import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import { DateRangePicker } from "react-dates";
import React, { useEffect, useState } from "react";

async function loadProperties(startDate, endDate, guestCount) {
  const allProperties = await getAvailableProperties(
    startDate,
    endDate,
    guestCount
  );
  return allProperties.json();
}

function getSearchResults(property) {
  return (
    <Link
      href={`/${property.address.state.toLowerCase().trim()}/${property.link}`}
      key={property.id}
    >
      <Card className="cursor-pointer mb-3">
        <Card.Body className="d-flex">
          <div className="mr-3 rounded" style={{height: '120px', minWidth: '120px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(' + property.images[0] + ')'}}></div>
          <div>
            <Card.Title>{property.title}</Card.Title>
            <div className="d-flex">
              <div className="my-1 mr-3">
                <i className="fas fa-user-friends"></i>
                <span className="ml-2 amenity">{property.maxOccupancy}</span>
              </div>
              <div className="my-1 mr-3">
                <i className="fas fa-bed"></i>
                <span className="ml-2 amenity">{property.bedroomCount}</span>
              </div>
              <div className="my-1 mr-3">
                <i className="fas fa-hot-tub"></i>
                <span className="ml-2 amenity">{property.bathroomCount}</span>
              </div>
            </div>
            <Card.Text>
              {property.description.substring(0, 250) + "..."}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

function convertDateToMilli(date) {
  if (date.includes("-")) {
    return new Date("" + date).getTime();
  }

  return new Date(date).getTime();
}

export default function Search() {
  const router = useRouter();
  const startDateParam = router.query.startDate;
  const endDateParam = router.query.endDate;
  const guestCount = router.query.guests;
  //console.log(startDateParam, endDateParam, guestCount);

  const [properties, setProperties] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [guests, setGuests] = useState(guestCount || 0);
  const [windowWidth, setWindowWidth] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (router.query && Object.keys(router.query).length ) {
      setGuests(guestCount);
      setStartDate(startDateParam ? moment(startDateParam) : "");
      setEndDate(endDateParam ? moment(endDateParam) : "");
      setLoaded(true);
      loadProperties(
        convertDateToMilli(startDateParam),
        convertDateToMilli(endDateParam),
        guestCount
      )
        .then((props) => {
          setProperties(props || []);
        })
        .catch((e) => {
          setLoaded(false);
        });
    }
  }, [startDateParam, endDateParam, guestCount]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const handleOnRouteChange = () => {

    if(startDate && endDate && guests) {
      Router.push(getSearchLink(startDate, endDate, guests))
    } else {
      alert('You must have to specified the Start Date,End Date and Guest')
    }
  }

  return (
    <Layout setHash={setHash}>
      <div className="main-bg" style={{ minHeight: "auto" }}>
        <div
          className="greyscale"
          style={{ minHeight: "auto", height: "auto" }}
        >
          <Container
            className="col-12 col-lg-10 offset-lg-1 py-5"
            style={{ minHeight: "auto", height: "auto" }}
          >
            <Row
              className="search-section mx-auto align-self-center p-2"
              style={{
                marginLeft: "auto!important",
                marginRight: "auto!important",
              }}
            >
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
                    <option> guest</option>
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
                <Button
                  onClick={() => handleOnRouteChange()}
                  variant="primary"
                  className="book-btn"
                >
                  Book now
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Container>
        <Row>
          <Col className="my-5 headingbox text-center col-md-6 offset-md-3">
            <h2>Search Results</h2>
            <hr />
            {properties.length > 0 ? (<h3>Total Result: {properties.length}</h3>) : ''}
            </Col>

        </Row>
        {properties.map((property, index) => {
          return getSearchResults(property);
        })}
        {!properties.length && loaded}
        <h2 className="text-center backhome my-4">
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </Container>
    </Layout>
  );
}
