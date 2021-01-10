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
      <div className="my-5 headingbox text-center col-md-6 offset-md-3">
        <h2>Page Not Found</h2>
        <h2>Uh Oh!</h2>
      </div>

      <h2 className="text-center backhome mt-4">
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
