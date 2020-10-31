import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";
import {getAllProperties, getUsersProperties, updateProperty, uploadPropertyImages} from "../services/properties";
import firebase from "../lib/firebase";
import {getUser, isUserAdmin} from "../services/user";
import Router from "next/router";
import {useState} from "react";
import {Button, Modal, Form, Alert, Container, Row, Col, Card, ListGroup, Image} from "react-bootstrap";
import Navbar from "../components/navbar";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Calendar from "../components/calendar";

async function addEditProperty(e, property, cb, showSuccess = false) {
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

function getPropertyFirstImage(property) {
    if (property && property.images) {
        return property.images[0];
    }
    return  'https://via.placeholder.com/150';
}

export function Dashboard(props) {
    const propertyPlaceholder = {title: 'None selected', description: 'Select or add a property to continue'};
    const [addressValue] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setTimeout(() => {
            if (!selectedProperty.id) return;
            const formValues = document.querySelectorAll('[key-data]');
            formValues.forEach(field => {
                field.value = selectedProperty[field.getAttribute('key-data')];
            })
        }, 150);
    }

    // const convert = async (fileLocation) => {
    //     const icsRes = fetch(fileLocation, {
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Content-type': 'application/json; charset=UTF-8'
    //         },
    //     }).then(function(data){
    //         console.log(data);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     // const icsData = await icsRes.text()
    //     // // Convert
    //     // const data = icsToJson(icsData)
    //     // return data
    // }
    //
    // console.log(convert('http://www.vrbo.com/icalendar/8d5441d8cad54ec0aa986dea0ae5840b.ics?nonTentative'))
    // console.log(convert('https://www.airbnb.com/calendar/ical/43382883.ics?s=400cca19575bbc8235cda7ae700e9665'))

    const {user, managedProperties, fieldsCompleted, isAdmin} = props;
    let [selectedProperty, setSelectedProperty] = useState(managedProperties[0] || propertyPlaceholder);
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
                                return <ListGroup.Item onClick={() => { setSelectedProperty(property); }} key={property.id}>{property.title}</ListGroup.Item>
                            }) }
                        </ListGroup>
                    </Col>
                    <Col xs="12" md="8" className="pr-0">
                        <Card>
                            <Card.Img variant="top" src={getPropertyFirstImage(selectedProperty)} />
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
                                <Calendar />
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
                        <Form.Group controlId="propertyImages">
                            <Form.Label>Property Images</Form.Label>
                            <Form.Control as="input" type="file" onChange={handleFileImages} multiple></Form.Control>
                        </Form.Group>
                        <Row id="propertyImagesPreview" style={{display: 'block', overflowX: 'auto', whiteSpace: 'nowrap'}}></Row>
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
    const propertiesResponse = isAdmin ? await getAllProperties(user) : await getUsersProperties(user);
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