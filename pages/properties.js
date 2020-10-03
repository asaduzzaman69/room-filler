import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";
import {getAllProperties} from "../services/properties";

export default function Properties() {
    const properties = getAllProperties();
    console.log(properties)
    return (
        <Layout>
            <Head>
                <title>All Properties</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>All Properties</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}