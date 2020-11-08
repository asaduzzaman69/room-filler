import Link from "next/link"
import Head from "next/head"
import Layout from "../../components/layout";
import {
    bookedOrPastDates,
    getAllProperties,
    getPropertyCalendar,
    getPropertyFirstImage
} from "../../services/properties";
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import {DateRangePickerCalendar, START_DATE} from 'react-nice-dates';
import {Button, Card, Row} from "react-bootstrap";
import {useState} from "react";

export default function PropertyPage({ property }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [focus, setFocus] = useState(START_DATE);
    const handleFocusChange = newFocus => {
        setFocus(newFocus || START_DATE)
    }
    const calendarModifiers = {
        disabled: date => bookedOrPastDates(date, property.params.calendar.dates),
    }

    console.log(property.params.calendar)

    return (
        <Layout>
            <Head>
                <title>{property.params.title} in {property.params.state}</title>
                <meta name="description" content={property.params.description} />
                <meta name="keywords" content={'property, rentals, ' + property.params.state} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
                    <Card.Text>
                        {property.params.description}
                    </Card.Text>

                    <p>Selected start date: {startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>
                    <p>Selected end date: {endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>
                    <p>Currently selecting: {focus}.</p>
                    <DateRangePickerCalendar
                        modifiers={calendarModifiers}
                        startDate={startDate}
                        endDate={endDate}
                        focus={focus}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        onFocusChange={handleFocusChange}
                        locale={enGB}
                    />
                </Card.Body>
            </Card>

            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
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
    console.log(params)
    // Fetch necessary data for the blog post using current route params
    const allProperties = await getAllProperties();
    let property = {};
    allProperties.docs.forEach((doc) => {
        if (doc.data().address.state === params.state && doc.data().link === params.link) {
            property = {params: doc.data()};
        }
    });
    property.params.calendar = (await getPropertyCalendar(property.params)).data();
    return {
        props: {
            property,
        }
    }
}