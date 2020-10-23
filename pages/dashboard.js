import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";
import {getAllProperties, getUsersProperties, updateProperty} from "../services/properties";
import firebase from "../lib/firebase";
import {getUser, isUserAdmin} from "../services/user";
import Router from "next/router";
import {useState} from "react";
import {Button, Modal, Form, Alert, Container, Row, Col, Card, ListGroup} from "react-bootstrap";
import Navbar from "../components/navbar";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Calendar from "../components/calendar";

async function addEditProperty(e, property, cb) {
    e.preventDefault();
    e.persist();
    const addedProperty = property || {
        createdBy: this.state.user.uid,
        published: false,
    };

    let fieldsCompleted = true;
    for (var x = 0; x < e.target.length; x++) {
        const field = e.target[x];
        if (field.value && field.id) {
            addedProperty[field.getAttribute('key-data')] = field.value;
        } else if (!field.value && field.id) { fieldsCompleted = false; }
    }
    if (!fieldsCompleted) { return this.setState({ ...this.state, fieldsCompleted: false }); }
    if (!addedProperty.id) {
        const ref = firebase.firestore().collection('properties').doc();
        addedProperty.id = ref.id;
    }

    await updateProperty(addedProperty);
    this.setState({ ...this.state, fieldsCompleted: true, managedProperties: [...this.state.managedProperties, addedProperty] });
    cb();
}

function selectProperty(self, property) {
    return self.setState({
        ...self.state,
        selectProperty: property
    })
}

function IncompleteFieldsError(props) {
    if (props.showError) {
        return <Alert variant="danger" className="mt-3">
            Fill out fields to save!
        </Alert>
    }
    return (null);
}

export function Dashboard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {user, managedProperties, fieldsCompleted} = props;
    let [selectedProperty, setSelectedProperty] = useState(managedProperties[0] || {title: 'None selected', description: 'Select or add a property to continue'});

    return (
        <Layout>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar user={user} />

            <h1>Welcome {user.displayName}</h1>

            <p>You have {managedProperties.length} Properties</p>

            <Button variant="primary" onClick={handleShow} className="mb-2">
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
                            <Card.Img variant="top" src={selectedProperty.image || 'https://via.placeholder.com/150'} />
                            <Card.Body>
                                <Card.Title>
                                    {selectedProperty.title}
                                    <Button variant="primary" className="float-right">
                                        Edit
                                    </Button>
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
                    <Modal.Title>Add Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!

                    <Form onSubmit={(e) => { addEditProperty(e, selectedProperty.id ? selectedProperty : null, handleClose) }}>
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
                            <GooglePlacesAutocomplete
                                apiKey="AIzaSyBctVpXpDF7LVk2qGvUmWV3PfK2rCgFaP8"
                            />
                        </Form.Group>
                        <Form.Group controlId="propertyDescription">
                            <Form.Label>Property Description</Form.Label>
                            <Form.Control as="textarea" rows="3" key-data="description" />
                        </Form.Group>
                        <Button className="col-12" variant="primary" type="submit">
                            Add Property
                        </Button>

                        <IncompleteFieldsError showError={!fieldsCompleted} />
                    </Form>
                </Modal.Body>
            </Modal>
        </Layout>
    )
}

async function loadDashboardData(self, user) {
    const propertiesResponse = isUserAdmin(user) ? await getAllProperties(user) : await getUsersProperties(user);
    const properties = [];
    propertiesResponse.docs.forEach(doc => {
        properties.push(doc.data());
    })
    self.setState({
        ...self.state,
        managedProperties: properties,
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