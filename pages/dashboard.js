import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout";
import {
    generateBlockedCalendarDays,
    getAllProperties,
    getPropertyCalendar, getPropertyFirstImage,
    getUsersProperties, isDayBlocked,
    updateProperty,
    uploadPropertyImages
} from "../services/properties";
import firebase from "../lib/firebase";
import {isUserAdmin} from "../services/user";
import Router from "next/router";
import {useState} from "react";
import {Button, Modal, Form, Alert, Container, Row, Col, Card, ListGroup} from "react-bootstrap";
import Navbar from "../components/navbar";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Sortable } from "sortablejs";
import {DayPickerRangeController} from "react-dates";
import TextExpand from "../components/text-expand";

async function addEditProperty(e, property, cb, showSuccess = false) {
    if (e) {
        e.preventDefault();
        e.persist();
    }
    const existingProperty = property.id;
    const addedProperty = {...property} || {
        createdBy: this.state.user.uid,
        published: false,
    };
    addedProperty.createdBy = addedProperty.createdBy || this.state.user.uid
    addedProperty.published = addedProperty.published || false;
    addedProperty.images = resetImages(addedProperty);

    let fieldsCompleted = true;
    if (e) {
        for (var x = 0; x < e.target.length; x++) {
            const field = e.target[x];
            if (field.value && field.id && field.getAttribute('key-data')) {
                addedProperty[field.getAttribute('key-data')] = field.value;
            } else if (field.value && field.id && field.getAttribute('sub-key-data')) {
                const subObjectKey = field.getAttribute('sub-key-data').split('.');
                if (!addedProperty[subObjectKey[0]]) { addedProperty[subObjectKey[0]] = {}; }
                addedProperty[subObjectKey[0]][subObjectKey[1]] = field.value;
            } else if (!field.value && field.id && (field.getAttribute('key-data') || field.getAttribute('sub-key-data'))) {
                fieldsCompleted = false;
            }
        }
    }
    if (!fieldsCompleted) { return this.setState({ ...this.state, fieldsCompleted: false }); }
    if (!existingProperty) {
        const ref = firebase.firestore().collection('properties').doc();
        addedProperty.id = ref.id;
    }

    await updateProperty(addedProperty);
    if (!existingProperty) {
        this.setState({ ...this.state, fieldsCompleted: true, managedProperties: [...this.state.managedProperties, addedProperty] });
    } else {
        const managedProperties = this.state.managedProperties;
        let activeIndex = 0;
        managedProperties.forEach((element, index) => {
            if (element.id === addedProperty.id) { activeIndex = index }
        });
        managedProperties[activeIndex] = addedProperty;
        this.setState({ ...this.state, fieldsCompleted: true, managedProperties: managedProperties });
    }
    cb(addedProperty);
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

function addImageToPreview(url) {
    document.getElementById('propertyImagesPreview').innerHTML += `
        <div class="col-12 col-md-6 img-thumbnail add-image-preview" style="background: url(${url});">
            <i class="fal fa-trash bg-light hover-bg-danger rounded-circle p-2 float-right" onclick="return this.parentNode.remove();"></i>
        </div>
    `;
}

function addFileImagePreview(file, selectedProperty) {
    if (!file) return;
    return new Promise((res) => {
        var reader = new FileReader(file);
        reader.onload = function (e) {
            uploadPropertyImages([e.target.result], selectedProperty.id).then(result => {
                addImageToPreview(result[0]);
                res(result[0]);
            });
        }
        reader.readAsArrayBuffer(file);
    });
}

function resetImages(property) {
    const newImages = [];
    if (!document.getElementById("propertyImagesPreview")) {
        return property.images;
    }
    const images = document.getElementById("propertyImagesPreview").getElementsByClassName('add-image-preview');
    for (var x = 0; x < images.length; x++) {
        newImages.push(images[x].style.background.replace('url("', '').replace('")', ''));
    };
    return newImages;
}

function getAmenitiesList(list, newAmenity) {
    if (!newAmenity) { return list; }
    return list.includes(newAmenity) ? list.replace(newAmenity + ',', '').replace(newAmenity, '') : list + (',' + newAmenity);
}

function updateCalendars() {
    fetch('/api/updatePropertyCalendars');
}

export function Dashboard(props) {
    const propertyPlaceholder = {title: 'None selected', description: 'Select or add a property to continue', amenities: ''};
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
            const formSubValues = document.querySelectorAll('[sub-key-data]');
            formSubValues.forEach(field => {
                const subObjectKey = field.getAttribute('sub-key-data').split('.');
                field.value = selectedProperty[subObjectKey[0]][subObjectKey[1]];
            })
            for (let image of selectedProperty.images) {
                addImageToPreview(image);
            }
            setupReorder();
        }, 150);
    }

    const {user, managedProperties, fieldsCompleted, isAdmin} = props;
    let [selectedProperty, setSelectedProperty] = useState(managedProperties[0] || propertyPlaceholder);
    let [calendar, setCalendar] = useState({});

    const loadPropertyCalendar = (property) => {
        getPropertyCalendar(property).then((calendar) => {
            return setCalendar(generateBlockedCalendarDays(calendar.data()));
        });
    }

    function setupReorder() {
        const  el = document.getElementById("propertyImagesPreview");
        Sortable.create(el, { onUpdate: () => {
            selectedProperty.images = resetImages(selectedProperty);
        } });
    }

    const updatedAddress = (e) => {
        selectedProperty.address = {
            city: e.value.structured_formatting.secondary_text.split(',')[0].trim().replace(/[0-9]/g, ''),
            country: e.value.structured_formatting.secondary_text.split(',')[2].trim().replace(/[0-9]/g, ''),
            state: e.value.structured_formatting.secondary_text.split(',')[1].trim().replace(/[0-9]/g, ''),
            street: e.value.structured_formatting.main_text,
            stringFormat: e.label
        }
    };

    const handleFileImages = async (e) => {
        e.persist();
        const files = e.target.files;
        for (var x = 0; x < files.length;) {
            const url = await addFileImagePreview(files[x], selectedProperty);
            console.log(url);
            selectedProperty.images.push(url);
            x++;
        }
        setupReorder();
    }

    return (
        <Layout>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar user={user} />

            <h1 className="mt-5 pt-5">Welcome {user.displayName}</h1>

            <p>You have {managedProperties.length} Properties</p>

            <Button variant="primary" onClick={() => { setSelectedProperty(propertyPlaceholder); handleShow(); }} className="mb-3">
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
                                    {selectedProperty.id && isAdmin &&
                                    <Button variant="primary" className="mr-2" onClick={() => { addOwnerEditor(selectedProperty); }}>
                                        Add Owner/Editor
                                    </Button>
                                    }
                                    {selectedProperty.id &&
                                    <Button variant="primary" className="mr-2" onClick={handleShow}>
                                        Edit Property
                                    </Button>
                                    }
                                    {selectedProperty.id && selectedProperty.published &&
                                    <Button variant="primary" onClick={() => {addEditProperty(null, {...selectedProperty, published: !selectedProperty.published}, () => { setSelectedProperty({...selectedProperty, published: !selectedProperty.published}); }, true)}}>
                                        Unpublish
                                    </Button>
                                    }
                                    {selectedProperty.id && !selectedProperty.published && isAdmin &&
                                    <Button variant="primary" onClick={() => {addEditProperty(null, {...selectedProperty, published: !selectedProperty.published}, () => { setSelectedProperty({...selectedProperty, published: !selectedProperty.published}); }, true)}}>
                                        Publish Live
                                    </Button>
                                    }
                                </Card.Title>
                                <Card.Title>
                                    {selectedProperty.title}
                                </Card.Title>
                                <TextExpand text={selectedProperty.description} />
                                <DayPickerRangeController
                                    onFocusChange={({ focused }) => console.log(focused)} // PropTypes.func.isRequired
                                    isDayBlocked={(day) => {return isDayBlocked(calendar, day)}}
                                />
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
                    <Form onSubmit={(e) => { addEditProperty(e, selectedProperty, (e) => { setSelectedProperty(e); handleClose(); updateCalendars(); }) }}>
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
                        <Form.Group controlId="propertyImages" className="mb-1">
                            <Form.Label>Property Images</Form.Label>
                            <Form.Text className="text-muted pl-1 mb-2 mt-0">
                                Drag and drop to reorder
                            </Form.Text>
                            <Form.Label className="btn btn-primary">Add images</Form.Label>
                            <Form.Control as="input" type="file" onChange={handleFileImages} style={{display: 'none'}} multiple></Form.Control>
                        </Form.Group>
                        <Row id="propertyImagesPreview" className="mb-2 mx-auto"></Row>
                        <Form.Label>Property Amenities (Ctrl + Click to select multiple)</Form.Label>
                        {
                            ['Wifi', 'TV', 'Heater, Air conditioning', 'Parking', 'Hair dryer', 'Breakfast', 'Carbon monoxide alarm', 'Smoke alarm', 'Fire extinguisher', 'First-aid kit', 'Accessible bathroom']
                            .map((amenity, index) => (
                                <Form.Group className="mb-1 pl-2" controlId={'propertyAmenities' + index} key={'amenities-' + index}>
                                    <Form.Check type="checkbox" label={amenity} checked={selectedProperty.amenities.includes(amenity)} onChange={() => { setSelectedProperty({ ...selectedProperty, amenities: getAmenitiesList(selectedProperty.amenities, amenity) }); }} />
                                </Form.Group>
                            ))
                        }
                        <hr />
                        <Form.Group controlId="propertyAirbnbListingURL">
                            <Form.Label className="mb-0">AirBnB Listing URL</Form.Label>
                            <Form.Control type="text" placeholder="Airbnb Listing URL" key-data="airbnbListingURL" />
                        </Form.Group>
                        <Form.Group controlId="propertyAirbnbCalendarURL">
                            <Form.Label className="mb-0">AirBnB Calendar URL</Form.Label>
                            <Form.Text className="text-muted pl-1 mb-2 mt-0">
                                i.e. https://www.airbnb.com/calendar/ical/43828383.ics?s=4009e007ea7adc5328cbb57591acc665
                            </Form.Text>
                            <Form.Control type="text" placeholder="Airbnb Calendar URL Link" key-data="airbnbCalendarURL" />
                        </Form.Group>
                        <Form.Group controlId="propertyVrboListingURL">
                            <Form.Label className="mb-0">Vrbo Listing URL</Form.Label>
                            <Form.Control type="text" placeholder="Vrbo Listing URL Link" key-data="vrboListingURL" />
                        </Form.Group>
                        <Form.Group controlId="propertyVrboCalendarURL">
                            <Form.Label className="mb-0">Vrbo Calendar URL</Form.Label>
                            <Form.Text className="text-muted pl-1 mb-2 mt-0">
                                i.e. http://www.vrbo.com/icalendar/8d585ea0aed689aa0ce45dac8d14440b.ics?nonTentative
                            </Form.Text>
                            <Form.Control type="text" placeholder="Vrbo Calendar URL Link" key-data="vrboCalendarURL" />
                        </Form.Group>
                        <hr />
                        <Row>
                            <Col>
                                <Form.Group controlId="propertyRooms">
                                    <Form.Label className="mb-0">Room Count</Form.Label>
                                    <Form.Control type="number" placeholder="Rooms" key-data="bedroomCount" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="propertyBathrooms">
                                    <Form.Label className="mb-0">Bathroom Count</Form.Label>
                                    <Form.Control type="number" placeholder="Bathrooms" key-data="bathroomCount" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="propertyOccupancy">
                                    <Form.Label className="mb-0">Max Occupancy</Form.Label>
                                    <Form.Control type="number" placeholder="Occupancy" key-data="maxOccupancy" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <Form.Group controlId="ownerName">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control as="input" rows="3" sub-key-data="owner.name" placeholder="John Doe" />
                        </Form.Group>
                        <Form.Group controlId="ownerPhone">
                            <Form.Label>Owner Phone</Form.Label>
                            <Form.Control as="input" rows="3" sub-key-data="owner.phone" placeholder="123-456-1111" />
                        </Form.Group>
                        <Form.Group controlId="ownerEmail">
                            <Form.Label>Owner Email</Form.Label>
                            <Form.Control as="input" rows="3" sub-key-data="owner.email" placeholder="Owner.email@gmail.com" />
                        </Form.Group>
                        <Form.Group controlId="ownerDescription">
                            <Form.Label>Owner Description</Form.Label>
                            <Form.Control as="textarea" rows="3" sub-key-data="owner.description" placeholder="Description" />
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