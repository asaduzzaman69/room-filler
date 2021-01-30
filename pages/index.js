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

  useEffect(()=>{
   if(window && window.location.hash){
     setHash(window.location.hash.split("#").pop())
   }
  }, [])

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
          <Col xs={12} xl={4}  md={6} className="mb-3" key={`property_${index}`}>
            <Link href={"" + getPropertyLink(properties[prop])}>
              <Card className="text-center cursor-pointer border-0">
                <div className="row no-gutters">
                  <div
                    className="col-5 col-lg-4 rounded"
                    style={{
                      background: "url('" + properties[prop].images[0] + "')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "75px",
                    }}
                  ></div>
                  <div className="col-7 col-lg-8">
                    <div className="card-body pt-3 pb-2 pr-1">
                      <p className="text-left mb-0 font-weight-bold">
                        {" "}
                        {properties[prop].title}{" "}
                      </p>
                      <p className="text-left mb-0 iconbox">
                        {" "}
                        {properties[prop].bedroomCount} Beds{" "}
                        {properties[prop].maxOccupancy} Guests{" "}
                      </p>
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
        <Banner properties={props} />
        <div>
          <Row className="container mt-5 mb-3 mx-auto px-md-5 px-xl-0 align-items-center align-content-center">
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
