import {useEffect, useRef, useState} from 'react';
import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";
import CustomNavbar from "../components/navbar";
import { getAllProperties } from "../services/properties";
import Footer from "../components/footer";
import Banner from '../components/banner';
import AmenitiesCarousel from '../components/amenitiesCarousel';
import QuickEatsCarousel from '../components/quickeatsCarousel';
import LocalEatsCarousel from '../components/localEatsCarousel';
import LocalActivities from '../components/localActivities';
import EmergencyLocations from '../components/emergencyLocations';

const Home=(props)=>{
  const [hash, setHash]=useState('');
  const amenitiesRef = useRef(null);
  const quickEatsRef = useRef(null);
  const localEatsRef = useRef(null);
  const localActivitiesRef = useRef(null);
  const emergencyLocationsRef = useRef(null);

  const scrollToRef = ref => {
    window.scrollTo({left:0, top:ref.current.offsetTop, behaviour:'smooth'});
  };

  useEffect(() => {
    switch (hash.split("#").pop()) {
      case "amenities":
        scrollToRef(amenitiesRef);
        break;
      case "places-to-eat":
        scrollToRef(quickEatsRef);
        break;
      case "qongfu-business":
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

    const getPropertyLink = ({property})=>  {
      // return `/${property.address.state}/${property.link}`;
      return property && property.address
        ? `/${property.address.state}/${property.link}`
        : "/";
      // return `/${property.address}/${property.link}`;
    }

    const getProperties=(properties)=> {
      return properties && Object.keys(properties).map((prop, index) => {
        return !properties[prop].published ? false : (
          <Col xs="12" md="6" className="cardbox mb-4" key={`property_${index}`}>
            <Link href={getPropertyLink(properties[prop])}>
              <Card className="text-center cursor-pointer">
                <div className="row no-gutters">
                  <div
                    className="col-sm-5"
                    style={{
                      background: "url('" + properties[prop].images[0] + "')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  ></div>
                  <div className="col-sm-7">
                    <div className="card-body py-2">
                      <h5 className="card-title text-left">
                        {properties[prop].title}
                      </h5>
                      <p className="card-text text-left mb-3">
                        {properties[prop].description.substring(0, 200)}...
                      </p>
                      <p className="text-left mb-0 iconbox">
                        <i className="fa fa-bed ml-2" aria-hidden="true"></i>{" "}
                        {properties[prop].bedroomCount}
                        <i className="fa fa-bath ml-2" aria-hidden="true"></i>{" "}
                        {properties[prop].bathroomCount}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        );
      });
    }

    return (
      <div>
        <Head>
          <title>{getEnvironmentConfig().title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <CustomNavbar setHash={setHash}/>
          <Banner />
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
          <div>
            <Container>
              <Row>
                <Col className="my-5 headingbox text-center col-md-6 offset-md-3">
                  <h2>Title Heading here</h2>
                  <hr />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer vel molestie nisl. Duis ac mi leo.
                  </p>
                </Col>
              </Row>
              <Row className="pb-5 mb-5">
                {getProperties(props)}
              </Row>
            </Container>
          </div>
          <Footer setHash={setHash}/>
        </main>

        <style jsx global>{``}</style>
      </div>
    );
}


// Page.getInitialProps = async (ctx: AppPageContext): Promise<Props> => {
//   let hash = "";
//   if (ctx.isServer && ctx.store) {
//     ctx.store.dispatch(setAdvanceSearchFilters(loadFiltersFromQuery(ctx.query ? ctx.query : null)));
//   } else if (!ctx.isServer) {
//     if (ctx.query && (ctx.query.reset === "true" || queryHasFilterParam(ctx.query))) {
//       ctx.store.dispatch(
//         setAdvanceSearchFilters(loadFiltersFromQuery(ctx.query ? ctx.query : null))
//       );
//     }
//     hash = ctx.query.hash ? ctx.query.hash.toString() : "";
//     hash = `${+new Date()}#${hash}`;
//   }
//   return { hash };
// };

export async function getStaticProps( context ) {
  const allProperties = await getAllProperties();
  const properties = [];
  allProperties.docs.forEach(doc => {
    properties.push(doc.data());
  });
  return {
    props: { ...properties }
  };
}

export default Home;
