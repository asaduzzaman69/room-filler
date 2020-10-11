import Link from "next/link"
import Head from "next/head"
import Layout from "../../components/layout";
import {getAllProperties} from "../../services/properties";

export default function CityInfo({ property }) {
    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>{property.params.title} in {property.params.state} is a great rental!</h1>
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