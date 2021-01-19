import { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import {
  getAllProperties,
  getPropertyCalendar,
  getPropertyFirstImage,
  generateBlockedCalendarDays,
  isDayBlocked,
} from "../../services/properties";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import { DayPickerRangeController } from "react-dates";
import TextExpand from "../../components/text-expand";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import {amenitiesIcon} from '../../public/constants/config';

export default function PropertyPage({ property }) {
  const [hash, setHash] = useState("");
  const router = useRouter();

  property = property.params;
  const options = {
    buttons: {
      showDownloadButton: false,
    },
  };

  const getAmenityIcon = (amenity) => {
    return amenitiesIcon.find((item) => item.name === amenity);
  };

  const getImagesGallery = (image, index) => {
      return (
        
        <Card.Img
          key={"view-only-images-" + index}
          variant="top"
          className="bnb-other-images"
          src={image}
        />
      );
  };

  return (
    <Layout setHash={setHash}>
      <SimpleReactLightbox>
        <Head>
          <title>
            {property.title} in {property.address.state}
          </title>
          <meta name="description" content={property.description} />
          <meta
            name="keywords"
            content={"property, rentals, " + property.address.state}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container className="selected-property">
          <SRLWrapper options={options}>
            {property && property.id && property.images.length > 1 ? (
              <Row className="imagesbox">
                <Col>
                <Card.Img
                        key={"view-only-images-" + 0}
                        variant="top"
                        className="bnb-first-img"
                        src={property.images[0]}
                      />
                      </Col>
                      <Col>
                      <Row>
                {property.images.map((image, index) => {
                   if (index > 0 && index<3) {
                    return (
                      getImagesGallery(image,index)
                    );
                }})}
                </Row>
                <Row>
                {property.images.map((image, index) => {
                   if (index > 2 && index < 5) {
                    return (
                      getImagesGallery(image,index)
                    );
                }})}
                </Row>
                </Col>
              </Row>
            ):
             (
              <Card.Img
                variant="top"
                src={getPropertyFirstImage(property.params)}
              />)}
          </SRLWrapper>
          <Row>   
            <Col className="pr-5 pl-1 py-4" xs={7}>
              <h5>{property.title}</h5>
              <TextExpand text={property.description} />
              <DayPickerRangeController
                onFocusChange={({ focused }) => console.log(focused)} // PropTypes.func.isRequired
                isDayBlocked={(day) => {
                  return (
                    property &&
                    property.calendar &&
                    isDayBlocked(property.calendar, day)
                  );
                }}
                daySize={60}
              />
            </Col>
            <Col className="px-1 py-4" xs={5}>
              <h6 className="mb-0">{property.owner.name}</h6>
              <h6 className="mb-0">{property.owner.description}</h6>
              <div className="my-3">
                <i className="fa fa-phone mr-2" aria-hidden="true"></i>
                <a href={"tel:" + property.owner.phone}>
                  {property.owner.phone}
                </a>
                <i className="fa fa-envelope ml-5 mr-2" aria-hidden="true"></i>
                <a href={"mailto:" + property.owner.email}>
                  {property.owner.email}
                </a>
              </div>
              <h5 className="mt-2">Amenities</h5>
              {property.amenities.split(",").map((amenity, index) => {
                return (
                  <div key={"amenity-list-" + index} className="my-1">
                    <i
                      className={
                        amenity === " air conditioning"
                          ? "fal fa-fan-table"
                          : getAmenityIcon(amenity)
                          ? getAmenityIcon(amenity).icon
                          : ""
                      }
                    />
                    <span className="ml-2 amenity"> {amenity}</span>
                  </div>
                );
              })}
              <div className="mt-3">
                <a
                  className="cributn mr-2"
                  href={property.airbnbListingURL}
                  target="_blank"
                >
                  View on AirBnB
                </a>
                <a
                  className="cributn"
                  href={property.vrboListingURL}
                  target="_blank"
                >
                  View on VRBO
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </SimpleReactLightbox>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const allProperties = await getAllProperties();
  const properties = [];
  allProperties.docs.forEach((doc) => {
    properties.push({
      params: { state: doc.data().address.state.toLowerCase().replace(' ','-'), link: doc.data().link },
    });
  });
  return {
    paths: properties,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using current route params
  const allProperties = await getAllProperties();
  let property = {};
  allProperties.docs.forEach((doc) => {
    if (
      doc.data().address.state.toLowerCase().replace(' ','-') === params.state &&
      doc.data().link === params.link
    ) {
      property = { params: doc.data() };
    }
  });
  if (property && property.id) {
    let calendar = (await getPropertyCalendar(property.params)).data();
    property.params.calendar = generateBlockedCalendarDays(calendar);
  }
  return {
    props: {
      property,
    },
  };
}
