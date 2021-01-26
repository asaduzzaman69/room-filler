import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { getAvailableProperties, getSearchLink } from "../services/properties";
import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import { DateRangePicker } from "react-dates";
import { useEffect, useState } from "react";

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
      href={`/${property.address.state}/${property.link}`}
      key={property.id}
    >
      <Card className="cursor-pointer">
        <Card.Body>
          <Card.Title>{property.title}</Card.Title>
          <Card.Text>
            {property.description.substring(0, 250) + "..."}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default function Search() {
  const router = useRouter();
  const startDateParam = router.query.startDate;
  const endDateParam = router.query.endDate;
  const guestCount = router.query.guests;

  const [properties, setProperties] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [guests, setGuests] = useState(guestCount || 1);
  const [windowWidth, setWindowWidth] = useState("");
  const [hash, setHash] = useState("");
  
  useEffect(() => {
    if (router.query && Object.keys(router.query).length && !loaded) {
      setGuests(guestCount);
      setStartDate(startDateParam? moment(startDateParam):'');
      setEndDate(endDateParam? moment(endDateParam):'');
      setLoaded(true);
      loadProperties(startDateParam, endDateParam, guestCount)
        .then((props) => {
          setProperties(props || []);
        })
        .catch((e) => {
          setLoaded(false);
        });
    }
  });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <Layout setHash={setHash}>
      <div className="main-bg search-page">
      <div className="greyscale py-5">
      <Container fluid="lg">
          <Row className="search-section">
            <Col className="search-height" xs={6} sm={3}>
              <p className="search-heading">Check in &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Check out</p>
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
                customArrowIcon={<div></div>}
                orientation={windowWidth <= 575 ? "vertical" : "horizontal"}
                daySize={windowWidth <= 575 ? 30:40}
              />
            </Col>
            {/* <Col className="search-height" xs={6} sm={3}>
              <p className="search-heading">Check out</p>
            </Col> */}

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

            <Col className="search-height pr-0 text-center text-md-right" xs={12} sm={3}>
              <Link href={getSearchLink(startDate, endDate, guests)}>
                <Button variant="primary" className="book-btn">
                  Search
                </Button>
              </Link>
            </Col>
          </Row>
          </Container>   
      </div>
      </div>
          <Row>
            <Col className="my-5 headingbox text-center col-md-6 offset-md-3">
              <h2>Search Results</h2>
              <hr />
            </Col>
          </Row>
          {properties.map((property, index) => {
            return getSearchResults(property);
          })}
          {!properties.length && loaded && "0 Results"}
          <h2 className="text-center backhome mt-4">
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </h2>
    </Layout>
  );
}











