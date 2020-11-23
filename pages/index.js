import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import {Container, Row, Col, Card, Form} from "react-bootstrap";
import Navbar from "../components/navbar";
import {getAllProperties} from "../services/properties";
import { DateRangePicker } from 'react-dates';

function getPropertyLink(property) {
    return `/${property.address.state}/${property.link}`
}

function getProperties(properties) {
    return Object.keys(properties).map((prop) => {
        return <Col xs="4" key={properties[prop].link}>
            <Card className="text-center py-3">
                <Link href={getPropertyLink(properties[prop])}>
                    <a>{properties[prop].title}</a>
                </Link>
            </Card>
        </Col>
    })
}

function getSearchLink(startDate, endDate) {
    if (!startDate || !endDate) {
        return '/search';
    }
    return '/search?startDate=' + startDate + '&endDate=' + endDate;
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
            <div className="container">
              <Head>
                <title>{getEnvironmentConfig().title}</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>

              <main>
                  <Navbar />
                  <div className="main-bg pt-5">
                      <Container className="mt-5 pt-5">
                          <Row className="form-row">
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
                                  <Form.Group controlId="exampleForm.ControlSelect1">
                                      <Form.Control as="select" onChange={({ guests }) => { this.setState({ ...this.state, guests: guests })}}
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
                                  <Link href={getSearchLink(this.state.startDate, this.state.endDate)}>
                                      <a className="btn btn-primary py-2 mt-1">
                                          Search
                                      </a>
                                  </Link>
                              </Col>
                          </Row>
                          <Row className="form-row py-3">
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