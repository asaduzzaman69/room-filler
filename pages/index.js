import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getAllProperties } from "../services/properties";
import Banner from "../components/banner";
import AmenitiesCarousel from "../components/amenitiesCarousel";
import QuickEatsCarousel from "../components/quickeatsCarousel";
import LocalEatsCarousel from "../components/localEatsCarousel";
import LocalActivities from "../components/localActivities";
import EmergencyLocations from "../components/emergencyLocations";
import Layout from "../components/layout";
const random = (mn, mx) => {
  const result = Math.random() * (mx - 0) + mn;
  return result;
};
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
    if (window && window.location.hash) {
      setHash(window.location.hash.split("#").pop());
    }
  }, []);

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

  const getPropertyLink = (property) => {
    // const tempState = property && property.address
    // ? property.address.state.toLowerCase().trim() :"";
    // return `/${property.address.state}/${property.link}`;
    return property && property.address
      ? `/${property.address.state
          .toLowerCase()
          .replace(" ", "-")}/${property.link.toLowerCase().trim()}`
      : "/";
    // return `/${property.address}/${property.link}`;
  };

  const getProperties = (properties) => {
    const publishedProperty = Object.keys(properties).filter(
      (prop, index) => properties[prop].published === true
    );;

    let renderedArray;
     publishedProperty.forEach((el, idx) => {
      let arr = [];
      if (idx <= 5) {
        while (arr.length < 6) {
          var r = Math.floor(Math.random() * publishedProperty.length -1) + 1;
          if (arr.indexOf(r) === -1) arr.push(r);
        }
        renderedArray = arr;
      }
     
    });

    let res;
    if (renderedArray) {
      res = renderedArray.map((el) => publishedProperty[el]);
    }


    let propertiesPublished = 0;
    return (
      properties &&
      res.map((prop, index) => {
        if (!properties[prop].published || propertiesPublished > 5) {
          return false;
        }
        propertiesPublished++;
        return (
          <Col xs={12} xl={4} md={6} className="mb-3" key={`property_${index}`}>
            <Link href={"" + getPropertyLink(properties[prop])}>
              <Card className="text-center cursor-pointer border-0">
                <div className="row no-gutters">
                  <div
                      className="rounded"
                      style={{
                        background: "url('" + properties[prop].images[0] + "')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "75px",
                        width: "75px",
                      }}
                  ></div>
                  <div className="card-body py-0 pr-1 align-self-center" style={{width: 'calc(100% - 75px)'}}>
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
              </Card>
            </Link>
          </Col>
        );
      })
    );
  };;

  return (
    <div>
      <Head>
        <title>{getEnvironmentConfig().title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout setHash={setHash}>
        <Banner properties={props} />
        <div>
          <Container className="col-12 col-lg-10 offset-lg-1 mt-5 mb-3">
            <Row>{getProperties(props)}</Row>
          </Container>
        </div>
        <div ref={amenitiesRef}>
          <Container className="col-12 col-lg-10 offset-lg-1 pb-2">
            <AmenitiesCarousel />
          </Container>
        </div>
        <div ref={quickEatsRef}>
          <Container className="col-12 col-lg-10 offset-lg-1 pb-2">
            <QuickEatsCarousel />
          </Container>
        </div>
        <div ref={localEatsRef}>
          <Container className="col-12 col-lg-10 offset-lg-1 pb-2">
            <LocalEatsCarousel />
          </Container>
        </div>
        <div ref={localActivitiesRef} style={{ backgroundColor: "#3e362d" }}>
          <Container className="col-12 col-lg-10 offset-lg-1 py-4 my-5">
            <LocalActivities />
          </Container>
        </div>
        <div ref={emergencyLocationsRef}>
          <Container className="col-12 col-lg-10 offset-lg-1 pb-2">
            <EmergencyLocations />
          </Container>
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
