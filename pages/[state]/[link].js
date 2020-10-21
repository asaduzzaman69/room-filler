import Link from "next/link"
import Head from "next/head"
import Layout from "../../components/layout";
import {getAllProperties} from "../../services/properties";
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'

export default function CityInfo({ property }) {

    var daySelected = function(m) {
        // m is a moment object
        alert(m.toString());
    };

    return (
        <Layout>
            <Head>
                <title>{property.params.title} in {property.params.state}</title>
                <meta name="description" content={property.params.description} />
                <meta name="keywords" content={'property, rentals, ' + property.params.state} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{property.params.title} in {property.params.state} is a great rental!</h1>

            <DatePickerCalendar locale={enGB} />

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
        properties.push({params: doc.data()});
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
        if (doc.data().state === params.state && doc.data().link === params.link) {
            property = {params: doc.data()};
        }
    });
    return {
        props: {
            property
        }
    }
}