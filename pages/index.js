import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import CustomNavbar from "../components/navbar";
import { getAllProperties, getSearchLink } from "../services/properties";
import { DateRangePicker } from "react-dates";
import Footer from "../components/footer";

function getPropertyLink(property) {
  // return `/${property.address.state}/${property.link}`;
  return property && property.address
    ? `/${property.address.state}/${property.link}`
    : "/";
  // return `/${property.address}/${property.link}`;
}

function getProperties(properties) {
  return Object.keys(properties).map((prop, index) => {
    return (
      <Col xs="12" md="6" className="cardbox mb-4" key={`property_${index}`}>
        <Link href={getPropertyLink(properties[prop])}>
          <Card className="text-center cursor-pointer">
            <div className="row no-gutters">
              <div
                className="col-sm-5"
                style={{
                  background: "url('" + properties[prop].images[0] + "')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>
              <div className="col-sm-7">
                <div className="card-body py-2">
                  <h5 className="card-title text-left">
                    {properties[prop].title}
                  </h5>
                  <p className="card-text text-left mb-3">
                    {properties[prop].description.substring(0, 200)}...
                  </p>
                  <p className="text-left mb-0 iconbox">
                    <i className="fa fa-bed ml-2" aria-hidden="true"></i>{" "}
                    {properties[prop].bedroomCount}
                    <i className="fa fa-bath ml-2" aria-hidden="true"></i>{" "}
                    {properties[prop].bathroomCount}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </Col>
    );
  });
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      guests: 1,
      focusedInput: null,
      properties: props
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Head>
          <title>{getEnvironmentConfig().title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <CustomNavbar />
          <div className="main-bg">
            <div className="greyscale py-5">
              <Container className="">
                <Row className="text-center">
                  <h1 className="col-12 text-light mb-1 mt-5">
                    Title Heading here
                  </h1>
                  <h2 className="col-12 text-light">Sub Heading here</h2>
                </Row>
                <Row>
                  <Col className="col-lg-8 offset-lg-2 mt-5 text-center">
                    <Row
                      className="form-row d-inline-flex pt-3 pb-3 px-2 searchbox"
                      style={{ background: "rgba(255, 255, 255, 0.6)" }}
                    >
                      <Col xs="auto" md="5" className="w-100 h-100 px-0">
                        <DateRangePicker
                          // className="w-100"
                          startDateId="startDate"
                          endDateId="endDate"
                          startDate={this.state.startDate}
                          endDate={this.state.endDate}
                          onDatesChange={({ startDate, endDate }) => {
                            this.setState({
                              ...this.state,
                              startDate,
                              endDate
                            });
                          }}
                          focusedInput={this.state.focusedInput}
                          onFocusChange={focusedInput => {
                            this.setState({ focusedInput });
                          }}
                        />
                      </Col>
                      <Col xs="auto" md="4" className="w-100 h-100 px-0">
                        <Form.Group
                          controlId="propertySearchGuestCount"
                          className="mb-0"
                        >
                          <Form.Control
                            as="select"
                            onChange={() => {
                              this.setState({
                                ...this.state,
                                guests: document.getElementById(
                                  "propertySearchGuestCount"
                                ).value
                              });
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
                        <Link
                          href={getSearchLink(
                            this.state.startDate,
                            this.state.endDate,
                            this.state.guests
                          )}
                        >
                          <button className="btn btn-primary searchbutn py-2 w-100">
                            Search
                          </button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          <div>
            <Container>
              <Row>
                <Col className="my-5 headingbox text-center col-md-6 offset-md-3">
                  <h2>Title Heading here</h2>
                  <hr />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer vel molestie nisl. Duis ac mi leo.
                  </p>
                </Col>
              </Row>
              <Row className="pb-5 mb-5">
                {getProperties(this.state.properties)}
              </Row>
            </Container>
          </div>
          <Footer />
        </main>

        <style jsx global>{``}</style>
      </div>
    );
  }
}

export async function getStaticProps({ params }) {
  const allProperties = await getAllProperties();
  const properties = [];
  allProperties.docs.forEach(doc => {
    properties.push(doc.data());
  });
  return {
    props: { ...properties }
  };
}

export default Home;
