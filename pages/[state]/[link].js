import Link from "next/link"
import Head from "next/head"
import Layout from "../../components/layout";
import {
    bookedOrPastDates,
    getAllProperties,
    getPropertyCalendar,
    getPropertyFirstImage, generateBlockedCalendarDays, isDayBlocked
} from "../../services/properties";
import {Button, Card, Row} from "react-bootstrap";
import {useState} from "react";
import Navbar from "../../components/navbar";
import {DayPickerRangeController} from "react-dates";
import TextExpand from "../../components/text-expand";

export default function PropertyPage({ property }) {

    return (
        <Layout>
            <Head>
                <title>{property.params.title} in {property.params.address.state}</title>
                <meta name="description" content={property.params.description} />
                <meta name="keywords" content={'property, rentals, ' + property.params.address.state} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <br />
            <br />

            <Card className="selected-property">
                {property.params.id && property.params.images.length > 1 &&
                <Row style={{overflowX: 'auto'}} className="d-block text-nowrap mb-2 mx-auto">
                    {
                        property.params.images.map((image, index) => (
                            <Card.Img key={'view-only-images-' + index} variant="top" src={image} />
                        ))
                    }
                </Row> || <Card.Img variant="top" src={getPropertyFirstImage(property.params)} />
                }
                <Card.Body>
                    <Card.Title>
                        {property.params.title}
                    </Card.Title>

                    <TextExpand text={property.params.description} />

                    <DayPickerRangeController
                        onFocusChange={({ focused }) => console.log(focused)} // PropTypes.func.isRequired
                        isDayBlocked={(day) => {return isDayBlocked(property.params.calendar, day)}}
                        className="my-2"
                    />

                    <Card.Title className="pt-4">Amenities</Card.Title>
                    {property.params.amenities.split(',').map((amenity, index) => <p key={'amenity-list-' + index}>{amenity}</p>)}

                    <a className="btn btn-primary mr-2" href={property.params.airbnbListingURL} target="_blank">View on AirBnB</a>
                    <a className="btn btn-primary" href={property.params.vrboListingURL} target="_blank">View on VRBO</a>
                </Card.Body>
            </Card>
        </Layout>
    )
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const allProperties = await getAllProperties();
    const properties = [];
    allProperties.docs.forEach((doc) => {
        properties.push({params: {state: doc.data().address.state, link: doc.data().link} });
    });
    return {
        paths: properties,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using current route params
    const allProperties = await getAllProperties();
    let property = {};
    allProperties.docs.forEach((doc) => {
        if (doc.data().address.state === params.state && doc.data().link === params.link) {
            property = {params: doc.data()};
        }
    });
    let calendar = (await getPropertyCalendar(property.params)).data();
    property.params.calendar = generateBlockedCalendarDays(calendar);
    return {
        props: {
            property,
        }
    }
}