import Link from "next/link"
import Head from "next/head"
import {useRouter} from "next/router";
import Layout from "../components/layout";
import {getAllProperties, getAvailableProperties, getPropertyCalendar} from "../services/properties";
import Navbar from "../components/navbar";
import getEnvironmentConfig from "../environment";
import {Card, Col, Container, Row} from "react-bootstrap";
import {DateRangePicker} from "react-dates";
import {useEffect, useState} from "react";

async function loadProperties(startDate, endDate) {
    const allProperties = await getAvailableProperties(startDate, endDate);
    return allProperties.json();
}

function getSearchResults(property) {
    return <Link href={`/${property.address.state}/${property.link}`}>
        <Card key={property.id}>
            <Card.Body>
                <Card.Title>
                    {property.title}
                </Card.Title>
                <Card.Text>
                    {property.description.substring(0, 250) + '...'}
                </Card.Text>
            </Card.Body>
        </Card>
    </Link>
}

export default function Search() {
    const router = useRouter();
    const startDate = router.query.startDate;
    const endDate = router.query.endDate;

    const [properties, setProperties] = useState([]);
    const [loaded, setLoaded] = useState(false);

    if (router.query && router.query !== {}) {
        useEffect(() => {
            loadProperties(startDate, endDate).then((props) => {
                setProperties(props || []);
                setLoaded(true);
            });
        }, []);
    }

    return (
        <Layout>
            <Navbar />
            <Head>
                <title>All Properties</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Search Results</h1>
            {properties.map(property => {return getSearchResults(property)})}
            {!properties.length && loaded && '0 Results'}
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}