import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";

export default function Login({ property }) {
    console.log(property)
    return (
        <Layout>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Login to manage your properties</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}