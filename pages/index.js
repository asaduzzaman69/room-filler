import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import {Container, Row, Col} from "react-bootstrap";
import Navbar from "../components/navbar";
import {useState} from "react";
import {getAllProperties} from "../services/properties";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

function getPropertyLink(property) {
    return `/${property.address.state}/${property.link}`
}

function getProperties(properties) {
    return (
        <Row>
            {
                Object.keys(properties).map((prop) => {
                    return <Col key={properties[prop].link}>
                        <Link href={getPropertyLink(properties[prop])}>
                            <a>{properties[prop].title}</a>
                        </Link>
                    </Col>
                })
            }
        </Row>
    )
}

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
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
                  <Container className="mt-5 pt-5">
                      <DateRangePicker
                          startDateId="startDate"
                          endDateId="endDate"
                          startDate={this.state.startDate}
                          endDate={this.state.endDate}
                          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
                          focusedInput={this.state.focusedInput}
                          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                      />
                  </Container>
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