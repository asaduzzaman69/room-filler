import Head from "next/head";
import getEnvironmentConfig from "../environment";
import Link from "next/link";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import CustomNavbar from "../components/navbar";
import { getAllProperties, getSearchLink } from "../services/properties";
import { DateRangePicker } from "react-dates";
import Footer from "../components/footer";
import Banner from '../components/banner';
import AmenitiesCarousel from '../components/amenitiesCarousel';

function getPropertyLink(property) {
  // return `/${property.address.state}/${property.link}`;
  return property && property.address
    ? `/${property.address.state}/${property.link}`
    : "/";
  // return `/${property.address}/${property.link}`;
}

function getProperties(properties) {
  console.log(properties)
  return Object.keys(properties).map((prop, index) => {
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

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      guests: 1,
      focusedInput: null,
      properties: props
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Head>
          <title>{getEnvironmentConfig().title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <CustomNavbar />
          <Banner />
          <AmenitiesCarousel />
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
                {getProperties(this.state.properties)}
              </Row>
            </Container>
          </div>
          <Footer />
        </main>

        <style jsx global>{``}</style>
      </div>
    );
  }
}

export async function getStaticProps({ params }) {
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
