import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import {Container, Row, Col, Card, Form} from "react-bootstrap";
import Navbar from "../components/navbar";
import {getAllProperties, getSearchLink} from "../services/properties";
import { DateRangePicker } from 'react-dates';

function getPropertyLink(property) {
    return `/${property.address.state}/${property.link}`
}

function getProperties(properties) {
    return Object.keys(properties).map((prop) => {
        return <Col xs="12" md="6" key={properties[prop].link}>
            <Link href={getPropertyLink(properties[prop])}>
                <Card className="text-center cursor-pointer">
                    <div className="row no-gutters">
                        <div className="col-sm-5" style={{background: 'url(\'' + properties[prop].images[0] + '\')', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        </div>
                        <div className="col-sm-7">
                            <div className="card-body py-2">
                                <h5 className="card-title text-left">{properties[prop].title}</h5>
                                <p className="card-text text-left mb-2">{properties[prop].description.substring(0, 200)}...</p>
                                <p className="text-left mb-0">
                                    <i className="fa fa-bed ml-2" aria-hidden="true"></i> {properties[prop].bedroomCount}
                                    <i className="fa fa-bath ml-2" aria-hidden="true"></i> {properties[prop].bathroomCount}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </Col>
    })
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

    componentDidMount() {

    }

    render() {
        return (
            <div>
              <Head>
                <title>{getEnvironmentConfig().title}</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>

              <main>
                  <Navbar />
                  <div className="main-bg pt-5">
                      <div className="greyscale"></div>
                      <Container className="mt-5 pt-3">
                          <Row>
                              <h1 className="col-12 px-2 ml-5 text-light z-index-999">Title Heading here</h1>
                              <h2 className="col-12 px-2 ml-5 text-light z-index-999">Sub Heading here</h2>
                          </Row>
                          <Row className="form-row d-inline-flex pt-4 pb-2 px-4 rounded" style={{background: 'rgba(255, 255, 255, 0.6)'}}>
                              <Col xs="auto" className="pr-0 border-right-0">
                                  <DateRangePicker
                                      startDateId="startDate"
                                      endDateId="endDate"
                                      startDate={this.state.startDate}
                                      endDate={this.state.endDate}
                                      onDatesChange={({ startDate, endDate }) => { this.setState({ ...this.state, startDate, endDate })}}
                                      focusedInput={this.state.focusedInput}
                                      onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                                  />
                              </Col>
                              <Col xs="auto" className="pl-0">
                                  <Form.Group controlId="propertySearchGuestCount">
                                      <Form.Control as="select" onChange={() => { this.setState({ ...this.state, guests: document.getElementById('propertySearchGuestCount').value })}}
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
                                  <Link href={getSearchLink(this.state.startDate, this.state.endDate, this.state.guests)}>
                                      <a className="btn btn-primary py-2 mt-1">
                                          Search
                                      </a>
                                  </Link>
                              </Col>
                          </Row>
                      </Container>
                  </div>
                  <div>
                      <Container>
                          <Row className="pt-4">
                              {getProperties(this.state.properties)}
                          </Row>
                      </Container>
                  </div>
              </main>

              <style jsx global>{`
                
              `}</style>
            </div>
        )
    }
}

export async function getStaticProps({ params }) {
    const allProperties = await getAllProperties();
    const properties = [];
    allProperties.docs.forEach((doc) => {
        properties.push(doc.data());
    });
    return {
        props: {...properties}
    }
}

export default Home