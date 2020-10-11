import Layout from "../components/layout";
import Head from "next/head";
import Link from "next/link";

export default function PageNotFound({ property }) {
    return (
        <Layout>
            <Head>
                <title>Page Not Found</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Page Not Found</h1>
            <h2>Uh Oh!</h2>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}