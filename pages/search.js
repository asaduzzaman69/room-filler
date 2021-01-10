import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import {
  getAllProperties,
  getAvailableProperties,
  getPropertyCalendar,
  getSearchLink
} from "../services/properties";
import Navbar from "../components/navbar";
import getEnvironmentConfig from "../environment";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
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
  console.log(router.query);
  const startDateParam = router.query.startDate;
  const endDateParam = router.query.endDate;
  const guestCount = router.query.guests;

  const [properties, setProperties] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [guests, setGuests] = useState(guestCount || 1);

  useEffect(() => {
    if (router.query && Object.keys(router.query).length && !loaded) {
      setGuests(guestCount);
      setLoaded(true);
      loadProperties(startDateParam, endDateParam, guestCount)
        .then(props => {
          setProperties(props || []);
        })
        .catch(e => {
          setLoaded(false);
        });
    }
  });

  return (
    <Layout>
      <Navbar />
      <div className="searchcont py-5">
        <Container>
          <Head>
            <title>All Properties</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Row
            className="form-row d-inline-flex pt-3 pb-3 px-2  m-auto w-100 searchbox innersearch"
            style={{ background: "rgba(255, 255, 255, 0.6)" }}
          >
            <Col xs="auto" md="5" className="w-100 h-100 px-0">
              <DateRangePicker
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
              />
            </Col>
            <Col xs="auto" md="4" className="w-100 h-100 px-0">
              <Form.Group controlId="propertySearchGuestCount" className="mb-0">
                <Form.Control
                  as="select"
                  onChange={() => {
                    setGuests(
                      document.getElementById("propertySearchGuestCount").value
                    );
                  }}
                  style={{
                    height: "48px",
                    borderRadius: "0px",
                    borderLeft: "0px",
                    borderTopRightRadius: "2px",
                    borderBottomRightRadius: "2px"
                  }}
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
            <Col xs="auto" md="3" className="w-100 h-100 px-0">
              <Link href={getSearchLink(startDate, endDate, guests)}>
                <button className="btn btn-primary searchbutn py-2 w-100">
                  Search
                </button>
              </Link>
            </Col>
          </Row>
          {/* <Row className="form-row d-inline-flex pt-4 pb-2 px-4 searchbox" style={{background: 'rgba(255, 255, 255, 0.6)'}}>
                    <Col xs="auto" className="pr-0 border-right-0">
                        <DateRangePicker
                            startDateId="startDate"
                            endDateId="endDate"
                            startDate={startDate}
                            endDate={endDate}
                            onDatesChange={({ startDt, endDt }) => { setStartDate(startDt); setEndDate(endDt); }}
                            focusedInput={focusedInput}
                            onFocusChange={(focusedInpt) => { setFocusedInput(focusedInpt) }}
                        />
                    </Col>
                    <Col xs="auto" className="pl-0">
                        <Form.Group controlId="propertySearchGuestCount">
                            <Form.Control as="select" value={guests} onChange={() => { setGuests(document.getElementById('propertySearchGuestCount').value) }}
                                          style={{height: '48px', borderRadius: '0px', borderLeft: '0px', borderTopRightRadius: '2px', borderBottomRightRadius: '2px'}}>
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
                    <Col xs="auto">
                        <Link href={getSearchLink(startDate, endDate, guests)}>
                            <a className="btn btn-primary py-2 mt-1">
                                Search
                            </a>
                        </Link>
                    </Col>
                </Row> */}
          {/* <h1>Search Results</h1> */}
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
        </Container>
      </div>
    </Layout>
  );
}
