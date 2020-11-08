import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";
import {
    bookedOrPastDates,
    getAllProperties,
    getPropertyCalendar, getPropertyFirstImage,
    getUsersProperties,
    updateProperty,
    uploadPropertyImages
} from "../services/properties";
import firebase from "../lib/firebase";
import {getUser, isUserAdmin} from "../services/user";
import Router from "next/router";
import {useState} from "react";
import {Button, Modal, Form, Alert, Container, Row, Col, Card, ListGroup, Image} from "react-bootstrap";
import Navbar from "../components/navbar";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { enGB } from 'date-fns/locale';
import { Calendar } from 'react-nice-dates';

async function addEditProperty(e, property, cb, showSuccess = false) {
    console.log(property);
    if (e) {
        e.preventDefault();
        e.persist();
    }
    const existingProperty = property.id;
    const addedProperty = property || {
        createdBy: this.state.user.uid,
        published: false,
    };
    addedProperty.createdBy = addedProperty.createdBy || this.state.user.uid
    addedProperty.published = addedProperty.published || false;
    addedProperty.images = addedProperty.images || [];

    let fieldsCompleted = true;
    if (e) {
        for (var x = 0; x < e.target.length; x++) {
            const field = e.target[x];
            if (field.value && field.id && field.getAttribute('key-data')) {
                addedProperty[field.getAttribute('key-data')] = field.value;
            } else if (!field.value && field.id && field.getAttribute('key-data')) {
                fieldsCompleted = false;
            }
        }
    }
    if (!fieldsCompleted) { return this.setState({ ...this.state, fieldsCompleted: false }); }
    if (!existingProperty) {
        const ref = firebase.firestore().collection('properties').doc();
        addedProperty.id = ref.id;
    }

    if (addedProperty.images.length) {
        if (typeof addedProperty.images[0] !== 'string' && !(addedProperty.images[0] instanceof String)) {
            addedProperty.images = await uploadPropertyImages(addedProperty.images, addedProperty.id)
        }
    }

    await updateProperty(addedProperty);
    if (!existingProperty) {
        this.setState({ ...this.state, fieldsCompleted: true, managedProperties: [...this.state.managedProperties, addedProperty] });
    } else {
        const managedProperties = this.state.managedProperties;
        managedProperties.forEach((element, index) => {
            if (element.id === addedProperty.id) { addedProperty[index] = addedProperty; }
        });
        this.setState({ ...this.state, fieldsCompleted: true, managedProperties: managedProperties });
    }
    cb();
    alert('Successfully Updated!')
}

function addOwnerEditor(property) {
    const email = window.prompt('Enter email of owner/editor:');
    property.editors = property.editors || [];
    property.editors.push({
        email: email
    });
    addEditProperty(null, property, () => {}, true)
}

function IncompleteFieldsError(props) {
    if (props.showError) {
        return <Alert variant="danger" className="mt-3">
            Fill out fields to save!
        </Alert>
    }
    return (null);
}

function addFileImagePreview(file) {
    if (!file) return;
    var reader = new FileReader(file);
    reader.onload = function(e) {
        document.getElementById('propertyImagesPreview').innerHTML += `
            <Image src="${e.target.result}" className="col-4 d-inline-block" style="max-height: 200px"}} thumbnail />
        `;
    }
    reader.readAsDataURL(file); // convert to base64 string
}

export function Dashboard(props) {
    const propertyPlaceholder = {title: 'None selected', description: 'Select or add a property to continue'};
    const [addressValue] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        console.log(selectedProperty)
        setTimeout(() => {
            if (!selectedProperty.id) return;
            const formValues = document.querySelectorAll('[key-data]');
            formValues.forEach(field => {
                field.value = selectedProperty[field.getAttribute('key-data')];
            })
            console.log(selectedProperty)
        }, 150);
    }

    const {user, managedProperties, fieldsCompleted, isAdmin} = props;
    let [selectedProperty, setSelectedProperty] = useState(managedProperties[0] || propertyPlaceholder);
    let [calendarModifiers, setCalendarModifiers] = useState({disabled: (date) => { return true; }});

    const loadPropertyCalendar = (property) => {
        getPropertyCalendar(property).then((calendar) => {
            setCalendarModifiers({
                disabled: date => bookedOrPastDates(date, calendar.data().dates),
            })
        });
    }

    const updatedAddress = (e) => {
        selectedProperty.address = {
            city: e.value.structured_formatting.secondary_text.split(',')[0],
            country: e.value.structured_formatting.secondary_text.split(',')[2].trim(),
            state: e.value.structured_formatting.secondary_text.split(',')[1].trim(),
            street: e.value.structured_formatting.main_text,
            stringFormat: e.label
        }
    };

    const handleFileImages = (e) => {
        e.persist();
        document.getElementById('propertyImagesPreview').innerHTML = '';
        const files = e.target.files;
        selectedProperty.images = files;
        for (var x = 0; x < files.length; x++) {
            addFileImagePreview(files[x]);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar user={user} />

            <h1>Welcome {user.displayName}</h1>

            <p>You have {managedProperties.length} Properties</p>

            <Button variant="primary" onClick={() => { setSelectedProperty(propertyPlaceholder); handleShow() }} className="mb-3">
                Add Property
            </Button>

            <Container>
                <Row>
                    <Col xs="12" md="4" className="pl-0">
                        <ListGroup>
                            { managedProperties.map((property) => {
                                return <ListGroup.Item onClick={() => { setSelectedProperty(property); loadPropertyCalendar(property); }} key={property.id}>{property.title}</ListGroup.Item>
                            }) }
                        </ListGroup>
                    </Col>
                    <Col xs="12" md="8" className="pr-0">
                        <Card className="selected-property">
                            {selectedProperty.id && selectedProperty.images.length > 1 &&
                                <Row style={{overflowX: 'auto'}} className="d-block text-nowrap mb-2 mx-auto">
                                    {
                                        selectedProperty.images.map((image, index) => (
                                            <Card.Img key={'view-only-images-' + index} variant="top" src={image} />
                                        ))
                                    }
                                </Row> || <Card.Img variant="top" src={getPropertyFirstImage(selectedProperty)} />
                            }
                            <Card.Body>
                                <Card.Title>
                                    {selectedProperty.title}
                                    {selectedProperty.id &&
                                        <Button variant="primary" className="float-right" onClick={handleShow}>
                                            Edit
                                        </Button>
                                    }
                                    {selectedProperty.id && isAdmin &&
                                        <Button variant="primary" className="float-right" onClick={() => {addOwnerEditor(selectedProperty); }}>
                                            Add Owner/Editor
                                        </Button>
                                    }
                                </Card.Title>
                                <Card.Text>
                                    {selectedProperty.description}
                                </Card.Text>
                                <Calendar modifiers={calendarModifiers} locale={enGB} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <p>Update a property</p>
            Invite an owner to house
            Publish/Unpublish a property

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProperty.id && 'Edit' || 'Add'} Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!

                    <Form onSubmit={(e) => { addEditProperty(e, selectedProperty, handleClose) }}>
                        <Form.Group controlId="propertyTitle">
                            <Form.Label>Property Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" key-data="title" />
                        </Form.Group>
                        <Form.Group controlId="propertyLink">
                            <Form.Label>Property Link</Form.Label>
                            <Form.Control type="text" placeholder="Link" key-data="link" />
                            <Form.Text className="text-muted pl-1">
                                Will be used as URL path /property-link
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="propertyAddress">
                            <Form.Label>Property Address</Form.Label>
                            <GooglePlacesAutocomplete
                                apiKey="AIzaSyBctVpXpDF7LVk2qGvUmWV3PfK2rCgFaP8"
                                selectProps={{
                                    addressValue,
                                    onChange: updatedAddress,
                                }}
                            />
                            <Form.Text className="text-muted pl-1">
                                {selectedProperty.address ? '(Currently set to ' + selectedProperty.address.stringFormat + ')' : ''}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="propertyDescription">
                            <Form.Label>Property Description</Form.Label>
                            <Form.Control as="textarea" rows="3" key-data="description" />
                        </Form.Group>
                        <Form.Group controlId="propertyRules">
                            <Form.Label>Property Rules</Form.Label>
                            <Form.Control as="textarea" rows="2" key-data="rules" />
                        </Form.Group>
                        <Form.Group controlId="propertyImages">
                            <Form.Label>Property Images</Form.Label>
                            {selectedProperty.id &&
                                <Form.Text className="text-muted pl-1 mb-2 mt-0">
                                    Uploading images will reset all images for this property {selectedProperty.id && `(${selectedProperty.images.length} existing)`}
                                </Form.Text>
                            }
                            <Form.Control as="input" type="file" onChange={handleFileImages} multiple></Form.Control>
                        </Form.Group>
                        <Row id="propertyImagesPreview" style={{overflowX: 'auto'}} className="d-block text-nowrap mb-2 mx-auto"></Row>
                        <Form.Group controlId="propertyAmenities">
                            <Form.Label>Property Amenities (Ctrl + Click to select multiple)</Form.Label>
                            <Form.Control as="select" multiple key-data="amenities" style={{minHeight: 300}}>
                                {
                                    ['Wifi', 'TV', 'Heater, air conditioning', 'Parking', 'Hair dryer', 'Breakfast', 'Carbon monoxide alarm', 'Smoke alarm', 'Fire extinguisher', 'First-aid kit', 'Accessible bathroom']
                                    .map((amenity, index) => (
                                        <option key={'amenities-' + index}>{amenity}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="propertyAirbnbCalendarURL">
                            <Form.Label className="mb-0">Property AirBnB Calendar URL</Form.Label>
                            <Form.Text className="text-muted pl-1 mb-2 mt-0">
                                i.e. https://www.airbnb.com/calendar/ical/43828383.ics?s=4009e007ea7adc5328cbb57591acc665
                            </Form.Text>
                            <Form.Control type="text" placeholder="Airbnb Calendar URL Link" key-data="airbnbCalendarURL" />
                        </Form.Group>
                        <Form.Group controlId="propertyVrboCalendarURL">
                            <Form.Label className="mb-0">Property Vrbo Calendar URL</Form.Label>
                            <Form.Text className="text-muted pl-1 mb-2 mt-0">
                                i.e. http://www.vrbo.com/icalendar/8d585ea0aed689aa0ce45dac8d14440b.ics?nonTentative
                            </Form.Text>
                            <Form.Control type="text" placeholder="Vrbo Calendar URL Link" key-data="vrboCalendarURL" />
                        </Form.Group>
                        <Button className="col-12" variant="primary" type="submit">
                            {selectedProperty.id && 'Edit' || 'Add'} Property
                        </Button>

                        <IncompleteFieldsError showError={!fieldsCompleted} />
                    </Form>
                </Modal.Body>
            </Modal>
        </Layout>
    )
}

async function loadDashboardData(self, user) {
    const isAdmin = await isUserAdmin(user);
    const propertiesResponse = isAdmin ? await getAllProperties() : await getUsersProperties(user);
    const properties = [];
    propertiesResponse.forEach(doc => {
        properties.push(doc.data());
    })
    self.setState({
        ...self.state,
        managedProperties: properties,
        isAdmin: isAdmin
    })
}

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        addEditProperty = addEditProperty.bind(this);
        this.state = {
            status: 'LOADING',
            user: null,
            managedProperties: [],
            fieldsCompleted: true,
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState({
                    ...this.state,
                    status: 'SIGNED_IN',
                    user: authUser,
                })
                loadDashboardData(this, authUser)
            } else {
                Router.push('/login');
            }
        });
    }

    render() {
        const { status, user } = this.state;
        if (status == 'LOADING') {
            return <h1>Loading ......</h1>;
        } else if (status == 'SIGNED_IN') {
            return <Dashboard { ...this.state } />
        }
    }
}

export default DashboardPage