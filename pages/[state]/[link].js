import Head from "next/head"
import Layout from "../../components/layout";
import {
    getAllProperties,
    getPropertyCalendar,
    getPropertyFirstImage, generateBlockedCalendarDays, isDayBlocked
} from "../../services/properties";
import {Card, Row} from "react-bootstrap";
import Navbar from "../../components/navbar";
import {DayPickerRangeController} from "react-dates";
import TextExpand from "../../components/text-expand";

function getImageClassName(index, length) {
    if (length < 3 && index === 0) { return 'col w-auto'; }
    else if (index === 0) { return 'col-4'; }
    else { return 'col-3 half-image-size' }
}

export default function PropertyPage({ property }) {

    property = property.params;

    return (
        <Layout>
            <Head>
                <title>{property.title} in {property.address.state}</title>
                <meta name="description" content={property.description} />
                <meta name="keywords" content={'property, rentals, ' + property.address.state} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <br />
            <br />

            <Card className="selected-property border-0">
                {property.id && property.images.length > 1 &&
                <Row  className="d-block mb-2 mx-auto text-center">
                    {
                        property.images.map((image, index) => (
                            <Card.Img key={'view-only-images-' + index} variant="top" className={getImageClassName(index, property.images.length) + ' p-0'} src={image} />
                        ))
                    }
                </Row> || <Card.Img variant="top" src={getPropertyFirstImage(property.params)} />
                }
                <Card.Body>
                    <Card.Title>
                        {property.title}
                    </Card.Title>

                    <TextExpand text={property.description} />

                    <DayPickerRangeController
                        onFocusChange={({ focused }) => console.log(focused)} // PropTypes.func.isRequired
                        isDayBlocked={(day) => {return isDayBlocked(property.calendar, day)}}
                        className="my-2"
                    />

                    <Card.Title className="pt-4">Amenities</Card.Title>
                    {property.amenities.split(',').map((amenity, index) => <p key={'amenity-list-' + index} className="my-1">{amenity}</p>)}

                    <a className="btn btn-primary mr-2" href={property.airbnbListingURL} target="_blank">View on AirBnB</a>
                    <a className="btn btn-primary" href={property.vrboListingURL} target="_blank">View on VRBO</a>

                    <p className="mb-0 mt-3">{property.owner.name}</p>
                    <p className="mb-0">{property.owner.description}</p>
                    <i className="fa fa-phone mr-2" aria-hidden="true"></i>
                    <a href={'tel:' + property.owner.phone}>{property.owner.phone}</a>
                    <i className="fa fa-envelope ml-5 mr-2" aria-hidden="true"></i>
                    <a href={'mailto:' + property.owner.email}>{property.owner.email}</a>
                </Card.Body>
            </Card>
        </Layout>
    )
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const allProperties = await getAllProperties();
    const properties = [];
    allProperties.docs.forEach((doc) => {
        properties.push({params: {state: doc.data().address.state, link: doc.data().link} });
    });
    return {
        paths: properties,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using current route params
    const allProperties = await getAllProperties();
    let property = {};
    allProperties.docs.forEach((doc) => {
        if (doc.data().address.state === params.state && doc.data().link === params.link) {
            property = {params: doc.data()};
        }
    });
    let calendar = (await getPropertyCalendar(property.params)).data();
    property.params.calendar = generateBlockedCalendarDays(calendar);
    return {
        props: {
            property,
        }
    }
}