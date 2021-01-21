import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import { Row, Col, Card } from "react-bootstrap";
import { getAllProperties } from "../services/properties";
import Banner from "../components/banner";
import AmenitiesCarousel from "../components/amenitiesCarousel";
import QuickEatsCarousel from "../components/quickeatsCarousel";
import LocalEatsCarousel from "../components/localEatsCarousel";
import LocalActivities from "../components/localActivities";
import EmergencyLocations from "../components/emergencyLocations";
import Layout from "../components/layout";

const Home = (props) => {
  const [hash, setHash] = useState("");
  const amenitiesRef = useRef(null);
  const quickEatsRef = useRef(null);
  const localEatsRef = useRef(null);
  const localActivitiesRef = useRef(null);
  const emergencyLocationsRef = useRef(null);

  const scrollToRef = (ref) => {
    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop,
      behaviour: "smooth",
    });
  };

  useEffect(() => {
    switch (hash.split("#").pop()) {
      case "amenities":
        scrollToRef(amenitiesRef);
        break;
      case "places-to-eat":
        scrollToRef(quickEatsRef);
        break;
      case "local-eateries":
        scrollToRef(localEatsRef);
        break;
      case "local-activities":
        scrollToRef(localActivitiesRef);
        break;
      case "emergency-locations":
        scrollToRef(emergencyLocationsRef);
        break;
      default:
    }
  }, [hash]);

  const getPropertyLink = ( property ) => {
    // const tempState = property && property.address
    // ? property.address.state.toLowerCase().trim() :"";
    // return `/${property.address.state}/${property.link}`;
    return property && property.address
      ? `/${property.address.state.toLowerCase().replace(' ','-')}/${property.link.toLowerCase().trim()}`
      : "/";
    // return `/${property.address}/${property.link}`;
  };

  const getProperties = (properties) => {
    let propertiesPublished = 0;
    return (
      properties &&
      Object.keys(properties).map((prop, index) => {
        if (!properties[prop].published || propertiesPublished > 5) {
          return false;
        }
        propertiesPublished++;
        return (
          <Col xs="12" sm="4" md="3" xl="2" className="cardbox mb-2" key={`property_${index}`}>
            <Link href={"" + getPropertyLink(properties[prop])}>
              <Card className="text-center cursor-pointer">
                <div className="row no-gutters">
                  <div
                    className="col-sm-5"
                    style={{
                      background: "url('" + properties[prop].images[0] + "')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="col-sm-7">
                    <div className="card-body py-2 pr-1">
                      {/*<h5 className="card-title text-left">*/}
                      {/*  {properties[prop].title}*/}
                      {/*</h5>*/}
                      {/*<p className="card-text text-left mb-3">*/}
                      {/*  {properties[prop].description.substring(0, 200)}...*/}
                      {/*</p>*/}
                      <p className="text-left mb-0 iconbox"> {properties[prop].bedroomCount} Beds </p>
                      <p className="text-left mb-0 iconbox"> {properties[prop].maxOccupancy} Guests </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        );
      })
    );
  };

  return (
    <div>
      <Head>
        <title>{getEnvironmentConfig().title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Layout setHash={setHash}>
        <Banner />
        <div>
          <Row className="mt-5 mb-3 mx-auto px-5 align-content-center">
            {getProperties(props)}
          </Row>
        </div>
        <div ref={amenitiesRef}>
          <AmenitiesCarousel />
        </div>
        <div ref={quickEatsRef}>
          <QuickEatsCarousel />
        </div>
        <div ref={localEatsRef}>
          <LocalEatsCarousel />
        </div>
        <div ref={localActivitiesRef}>
          <LocalActivities />
        </div>
        <div ref={emergencyLocationsRef}>
          <EmergencyLocations />
        </div>
        </Layout>

      <style jsx global>{``}</style>
    </div>
  );
};


export async function getStaticProps(context) {
  const allProperties = await getAllProperties();
  const properties = [];
  allProperties.docs.forEach((doc) => {
    properties.push(doc.data());
  });
  return {
    revalidate: 1,
    props: { ...properties },
  };
}

export default Home;
