import Head from "next/head";
import Layout from "../../components/layout";
import {
  getAllProperties,
  getPropertyCalendar,
  getPropertyFirstImage,
  generateBlockedCalendarDays,
  isDayBlocked
} from "../../services/properties";
import { Card, Row, Col } from "react-bootstrap";
import Navbar from "../../components/navbar";
import { DayPickerRangeController } from "react-dates";
import TextExpand from "../../components/text-expand";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

function getImageClassName(index, length) {
  if (length < 3 && index === 0) {
    return "col w-auto";
  } else if (index === 0) {
    return "col-12";
  } else {
    return "col-12 half-image-size";
  }
}

const amenitiesIcon = [
  {
    name: "Wifi",
    icon: "fal fa-wifi"
  },
  {
    name: "TV",
    icon: "fal fa-tv"
  },
  {
    name: "Heater",
    icon: "fal fa-heat"
  },
  {
    name: "air conditioning",
    icon: "fal fa-fan-table"
  },
  {
    name: "Parking",
    icon: "fal fa-parking"
  },
  {
    name: "Hair dryer",
    icon: "fal fa-heat"
  },
  {
    name: "Breakfast",
    icon: "fal fa-hamburger"
  },
  {
    name: "Carbon monoxide alarm",
    icon: "fal fa-alarm-clock"
  },
  {
    name: "Smoke alarm",
    icon: "fal fa-sensor-fire"
  },
  {
    name: "Fire extinguisher",
    icon: "fal fa-fire"
  },
  {
    name: "First-aid kit",
    icon: "fal fa-medkit"
  },
  {
    name: "Accessible bathroom",
    icon: "fal fa-restroom"
  }

  // "fal fa-tv",
  // "fal fa-fan-table",
  // "fal fa-parking",
  // "fal fa-heat",
  // "fal fa-hamburger",
  // "fal fa-alarm-clock",
  // "fal fa-sensor-fire",
  // "fal fa-fire",
  // "fal fa-medkit",
  // "fal fa-restroom"
];

export default function PropertyPage({ property }) {
  property = property.params;
  const options = {
    buttons: {
      showDownloadButton: false
    }
  };

  const getAmenityIcon = amenity => {
    return amenitiesIcon.find(item => item.name === amenity);
  };

  return (
    <SimpleReactLightbox>
      <Layout>
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

        <Navbar />

        <br />
        <br />

        <Card className="selected-property border-0">
          <SRLWrapper options={options}>
            {(property.id && property.images.length > 1 && (
              <Col xs="12">
                <Row className="imagesbox">
                  {property.images.map((image, index) => (
                    <a href={image} data-attribute="SRL" key={'property-images-' + index}>
                      <Card.Img
                        key={"view-only-images-" + index}
                        variant="top"
                        className={
                          getImageClassName(index, property.images.length) +
                          " p-0"
                        }
                        src={image}
                      />
                    </a>
                  ))}
                </Row>
              </Col>
            )) || (
              <Card.Img
                variant="top"
                src={getPropertyFirstImage(property.params)}
              />
            )}
          </SRLWrapper>
          <Card.Body className="px-0 py-4">
            <Card.Title>{property.title}</Card.Title>

            <TextExpand text={property.description} />

            <DayPickerRangeController
              onFocusChange={({ focused }) => console.log(focused)} // PropTypes.func.isRequired
              isDayBlocked={day => {
                return property && property.calendar && isDayBlocked(property.calendar, day);
              }}
            />

            <Card.Title className="pt-4">Amenities</Card.Title>
            {property.amenities.split(",").map((amenity, index) => {
              return (
                <p key={"amenity-list-" + index} className="my-1">
                  <i
                    className={
                      amenity === " air conditioning"
                        ? "fal fa-fan-table"
                        : getAmenityIcon(amenity)
                        ? getAmenityIcon(amenity).icon
                        : ""
                    }
                  />{" "}
                  {amenity}
                </p>
              );
            })}

            <a
              className="btn cributn mr-2 mt-3"
              href={property.airbnbListingURL}
              target="_blank"
            >
              View on AirBnB
            </a>
            <a
              className="btn cributn mt-3"
              href={property.vrboListingURL}
              target="_blank"
            >
              View on VRBO
            </a>

            <p className="mb-0 mt-3">{property.owner.name}</p>
            <p className="mb-0">{property.owner.description}</p>
            <i className="fa fa-phone mr-2" aria-hidden="true"></i>
            <a href={"tel:" + property.owner.phone}>{property.owner.phone}</a>
            <i className="fa fa-envelope ml-5 mr-2" aria-hidden="true"></i>
            <a href={"mailto:" + property.owner.email}>
              {property.owner.email}
            </a>
          </Card.Body>
        </Card>
      </Layout>
    </SimpleReactLightbox>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const allProperties = await getAllProperties();
  const properties = [];
  allProperties.docs.forEach(doc => {
    properties.push({
      params: { state: doc.data().address.state, link: doc.data().link }
    });
  });
  return {
    paths: properties,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using current route params
  const allProperties = await getAllProperties();
  let property = {};
  allProperties.docs.forEach(doc => {
    if (
      doc.data().address.state === params.state &&
      doc.data().link === params.link
    ) {
      property = { params: doc.data() };
    }
  });
  let calendar = (await getPropertyCalendar(property.params)).data();
  property.params.calendar = generateBlockedCalendarDays(calendar);
  return {
    props: {
      property
    }
  };
}
