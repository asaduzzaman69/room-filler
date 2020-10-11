import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";
import {getAllProperties} from "../services/properties";
import firebase from "../lib/firebase";
import {getUser} from "../services/user";
import Router from "next/router";
import {useState} from "react";
import {Button, Modal, Form, Alert} from "react-bootstrap";

function addProperty(e, cb) {
    e.preventDefault();
    e.persist();
    const addedProperty = {
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
    const ref = firebase.firestore().collection('properties').doc();
    addedProperty.id = ref.id;
    firebase.firestore().collection('properties').doc(ref.id).set(addedProperty).then((e) => {
        this.setState({ ...this.state, fieldsCompleted: true, managedProperties: [...this.state.managedProperties, addedProperty] });
        cb();
    });
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
    return (
        <Layout>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <h1>Welcome {user.displayName}</h1>

            <p>You have {managedProperties.length} Properties</p>

            <Button variant="primary" onClick={handleShow}>
                Add Property
            </Button>

            <p>Update a property</p>
            Invite an owner to house
            Publish/Unpublish a property

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!

                    <Form onSubmit={(e) => { addProperty(e, handleClose) }}>
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

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        addProperty = addProperty.bind(this);
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
                    managedProperties: []
                })
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