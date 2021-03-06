import { DebounceInput } from "react-debounce-input";

import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import {
  generateBlockedCalendarDays,
  getAllProperties,
  getPropertyCalendar,
  getPropertyFirstImage,
  getUsersProperties,
  isDayBlocked,
  updateProperty,
  uploadPropertyImages,
} from "../services/properties";
import firebase from "../lib/firebase";
import { isUserAdmin } from "../services/user";
import Router from "next/router";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Alert,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import Navbar from "../components/navbar";
import GooglePlacesAutocomplete,{geocodeByPlaceId} from "react-google-places-autocomplete";
import { Sortable } from "sortablejs";
import { DayPickerRangeController } from "react-dates";
import TextExpand from "../components/text-expand";

async function addEditProperty(e, property, cb, showSuccess = false) {
  if (e) {
    e.preventDefault();
    e.persist();
  }
  const existingProperty = property.id;
  const addedProperty = { ...property } || {
    createdBy: this.state.user.uid,
    published: false,
  };
  addedProperty.createdBy = addedProperty.createdBy || this.state.user.uid;
  addedProperty.published = addedProperty.published || false;
  addedProperty.images = resetImages(addedProperty);

  let fieldsCompleted = true;
  if (e) {
    for (var x = 0; x < e.target.length; x++) {
      const field = e.target[x];
      if (field.value && field.id && field.getAttribute("key-data")) {
        addedProperty[field.getAttribute("key-data")] = field.value;
      } else if (
        field.value &&
        field.id &&
        field.getAttribute("optional-key-data")
      ) {
        addedProperty[field.getAttribute("optional-key-data")] = field.value;
      } else if (
        field.value &&
        field.id &&
        field.getAttribute("sub-key-data")
      ) {
        const subObjectKey = field.getAttribute("sub-key-data").split(".");
        if (!addedProperty[subObjectKey[0]]) {
          addedProperty[subObjectKey[0]] = {};
        }
        addedProperty[subObjectKey[0]][subObjectKey[1]] = field.value;
      } else if (
        !field.value &&
        field.id &&
        (field.getAttribute("key-data") || field.getAttribute("sub-key-data"))
      ) {
        fieldsCompleted = false;
      }
    }
  }
  if (!fieldsCompleted) {
    return this.setState({ ...this.state, fieldsCompleted: false });
  }
  if (!existingProperty) {
    const ref = firebase.firestore().collection("properties").doc();
    addedProperty.id = ref.id;
  }

  await updateProperty(addedProperty);
  if (!existingProperty) {
    this.setState({
      ...this.state,
      fieldsCompleted: true,
      managedProperties: [...this.state.managedProperties, addedProperty],
    });
  } else {
    const managedProperties = this.state.managedProperties;
    let activeIndex = 0;
    managedProperties.forEach((element, index) => {
      if (element.id === addedProperty.id) {
        activeIndex = index;
      }
    });
    managedProperties[activeIndex] = addedProperty;
    this.setState({
      ...this.state,
      fieldsCompleted: true,
      managedProperties: managedProperties,
    });
  }
  cb(addedProperty);
  alert("Successfully Updated!");
}

function addOwnerEditor(property) {
  const email = window.prompt("Enter email of owner/editor:");
  property.editors = property.editors || [];
  property.editors.push({
    email: email,
  });
  addEditProperty(null, property, () => {}, true);
}

function IncompleteFieldsError(props) {
  if (props.showError) {
    return (
      <Alert variant="danger" className="mt-3">
        Fill out fields to save!
      </Alert>
    );
  }
  return null;
}

function addImageToPreview(url) {
  document.getElementById("propertyImagesPreview").innerHTML += `
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
      uploadPropertyImages([e.target.result], selectedProperty.id).then(
        (result) => {
          addImageToPreview(result[0]);
          res(result[0]);
        }
      );
    };
    reader.readAsArrayBuffer(file);
  });
}

function resetImages(property) {
  const newImages = [];
  if (!document.getElementById("propertyImagesPreview")) {
    return property.images;
  }
  const images = document
    .getElementById("propertyImagesPreview")
    .getElementsByClassName("add-image-preview");
  for (var x = 0; x < images.length; x++) {
    newImages.push(
      images[x].style.background.replace('url("', "").replace('")', "")
    );
  }
  return newImages;
}

function getAmenitiesList(list, newAmenity) {
  if (!newAmenity) {
    return list;
  }
  return list.includes(newAmenity)
    ? list.replace(newAmenity + ",", "").replace(newAmenity, "")
    : list + ("," + newAmenity);
}

function updateCalendars() {
  fetch("/api/updatePropertyCalendars");
}

export function Dashboard(props) {
  const propertyPlaceholder = { title: "", description: "", amenities: "" };
  const [addressValue] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [hash, setHash] = useState("");
  const [duplicate, setDuplicate] = useState();

  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      if (!selectedProperty.id) return;
      const formValues = document.querySelectorAll("[key-data]");
      formValues.forEach((field) => {
        field.value = selectedProperty[field.getAttribute("key-data")];
      });
      const formOptionalValues = document.querySelectorAll(
        "[optional-key-data]"
      );
      formOptionalValues.forEach((field) => {
        field.value = selectedProperty[field.getAttribute("optional-key-data")];
      });
      const formSubValues = document.querySelectorAll("[sub-key-data]");
      formSubValues.forEach((field) => {
        const subObjectKey = field.getAttribute("sub-key-data").split(".");
        field.value = selectedProperty[subObjectKey[0]][subObjectKey[1]];
      });
      for (let image of selectedProperty.images) {
        addImageToPreview(image);
      }
      setupReorder();
    }, 150);
  };

  const handleOnCLose = () => {
    setShow(true);
    setTimeout(() => {
      if (!selectedProperty.id) return;
      const formValues = document.querySelectorAll("[key-data]");
      formValues.forEach((field) => {
        field.value = "";
      });
      const formOptionalValues = document.querySelectorAll(
        "[optional-key-data]"
      );
      formOptionalValues.forEach((field) => {
        field.value = "";
      });
      const formSubValues = document.querySelectorAll("[sub-key-data]");
      formSubValues.forEach((field) => {
        const subObjectKey = field.getAttribute("sub-key-data").split(".");
        field.value = "";
      });
      //for (let image of selectedProperty.images) {
      //  addImageToPreview(image);
      //}
      setupReorder();
    }, 150);
  };

  const handleDuplicate = (link) => {
    const isDuplicate = props.allProperties.some((el) => el.link === link);
    isDuplicate ? setDuplicate(true) : setDuplicate(false);
  };

  const resetPropertyOpenModal = () => {};

  const { user, managedProperties, fieldsCompleted, isAdmin } = props;
  let [selectedProperty, setSelectedProperty] = useState(
    managedProperties[0] || propertyPlaceholder
  );

  useEffect(() => {
    if (managedProperties[0] !== undefined) {
      setSelectedProperty(managedProperties[0]);
    }
  }, [managedProperties]);
  let [calendar, setCalendar] = useState({});
  let [showCalendarError, setCalendarError] = useState(false);

  const loadPropertyCalendar = (property) => {
    getPropertyCalendar(property).then((calendar) => {
      const blockedDays = generateBlockedCalendarDays(calendar.data());
      if (blockedDays !== null) {
        setCalendarError(false);
        return setCalendar(blockedDays);
      } else {
        return setCalendarError(true);
      }
    });
  };

  function setupReorder() {
    const el = document.getElementById("propertyImagesPreview");
    Sortable.create(el, {
      onUpdate: () => {
        selectedProperty.images = resetImages(selectedProperty);
      },
    });
  }

  const updatedAddress = (e) => {
     //debugger;
    // geocodeByPlaceId(e.value.place_id)
    // .then(results => console.log(results))
    // .catch(error => console.error(error));
    selectedProperty.address = {
      
      city: e.value.structured_formatting.secondary_text
        .split(",")[0]
        .replace(/[^A-Za-z]+/g, "")
        .trim(),
      country: e.value.structured_formatting.secondary_text
        .split(",")[2]
        .replace(/[^A-Za-z]+/g, "")
        .trim(),
      state: e.value.structured_formatting.secondary_text
        .split(",")[1]
        .replace(/[^A-Za-z]+/g, "")
        .trim(),
      street: e.value.structured_formatting.main_text,
      stringFormat: e.label,
    };
  };

  const handleFileImages = async (e) => {
    e.persist();
    const files = e.target.files;
    for (var x = 0; x < files.length; ) {
      const url = await addFileImagePreview(files[x], selectedProperty);
      selectedProperty.images = selectedProperty.images || [];
      selectedProperty.images.push(url);
      x++;
    }
    setupReorder();
  };

  const amenitiesList = [
    "Wifi",
    "TV",
    "Heater, Air conditioning",
    "Parking",
    "Outdoor Furniture",
    "Coffee Maker",
    "Carbon monoxide alarm",
    "Smoke alarm",
    "Fire extinguisher",
    "Pool Towels",
    "Kitchen Basics",
  ];
  const amenitiesIcon = [
    "fal fa-wifi",
    "fal fa-tv",
    "fal fa-fan-table",
    "fal fa-parking",
    "fas fa-chair",
    "fas fa-mug-hot",
    "fal fa-alarm-clock",
    "fal fa-sensor-fire",
    "fal fa-fire",
    "fas fa-swimming-pool",
    "fas fa-blender",
  ];

  return (
    <Layout user={user} setHash={setHash}>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dashbox mt-5">
        <div className="headingbox text-center col-md-6 offset-md-3">
          <h2>Welcome {user.displayName}</h2>
          <p>You have {managedProperties.length} Properties</p>
        </div>
        {showCalendarError && (
          <Alert
            variant="danger"
            className="mt-3"
            onClose={() => setCalendarError(false)}
            dismissible
          >
            AirBnB/VRBO url is incorrect
          </Alert>
        )}

        {!managedProperties.length && (
          <Button
            onClick={() => {
              setSelectedProperty(propertyPlaceholder);
              handleOnCLose();
            }}
            className="mx-auto d-block px-4 py-3 mt-5 font-weight-bold add-property-btn"
          >
            Add Property
          </Button>
        )}

        {!!managedProperties.length && (
          <Container>
            <Row>
              <Col xs="12" md="4">
                <Row>
                  <h3>Your Properties</h3>
                  &nbsp; &nbsp;
                  <Button
                    className="add-property-btn mb-3"
                    onClick={() => {
                      setSelectedProperty(propertyPlaceholder);
                      handleOnCLose();
                    }}
                  >
                    Add Property
                  </Button>
                </Row>
                <ListGroup>
                  {managedProperties.map((property) => {
                    return (
                      <ListGroup.Item
                        onClick={() => {
                          setSelectedProperty(property);
                          // loadPropertyCalendar(property);
                        }}
                        key={property.id}
                        className="cursor-pointer property-list"
                      >
                        <i className="fal fa-angle-right angle-right" />{" "}
                        {property.title}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
              <Col xs="12" md="8">
                <Card
                  className="selected-property"
                  style={{ marginBottom: "15px" }}
                >
                  {(selectedProperty.id &&
                    selectedProperty.images.length > 1 && (
                      <Row
                        style={{ overflowX: "auto", maxWidth: "100%" }}
                        className="d-block text-nowrap mb-2 mx-auto"
                      >
                        {selectedProperty.images.map((image, index) => (
                          <Card.Img
                            style={{ maxHeight: "400px", width: "auto" }}
                            key={"view-only-images-" + index}
                            variant="top"
                            src={image}
                          />
                        ))}
                      </Row>
                    )) || (
                    <Card.Img
                      variant="top"
                      src={getPropertyFirstImage(selectedProperty)}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>
                      {selectedProperty.id && isAdmin && (
                        <Button
                          variant="primary"
                          className="mr-2 add-property-btn"
                          onClick={() => {
                            addOwnerEditor(selectedProperty);
                          }}
                        >
                          Add Owner/Editor
                        </Button>
                      )}
                      {selectedProperty.id && (
                        <Button
                          variant="primary"
                          className="mr-2 add-property-btn"
                          onClick={handleShow}
                        >
                          Edit Property
                        </Button>
                      )}
                      {selectedProperty.id && selectedProperty.published && (
                        <Button
                          variant="primary"
                          className="mr-2 add-property-btn"
                          onClick={() => {
                            addEditProperty(
                              null,
                              {
                                ...selectedProperty,
                                published: !selectedProperty.published,
                              },
                              () => {
                                setSelectedProperty({
                                  ...selectedProperty,
                                  published: !selectedProperty.published,
                                });
                              },
                              true
                            );
                          }}
                        >
                          Unpublish
                        </Button>
                      )}
                      {selectedProperty.id &&
                        !selectedProperty.published &&
                        isAdmin && (
                          <Button
                            variant="primary"
                            className="publish-hov-btn"
                            onClick={() => {
                              addEditProperty(
                                null,
                                {
                                  ...selectedProperty,
                                  published: !selectedProperty.published,
                                },
                                () => {
                                  setSelectedProperty({
                                    ...selectedProperty,
                                    published: !selectedProperty.published,
                                  });
                                },
                                true
                              );
                            }}
                          >
                            Publish Live
                          </Button>
                        )}
                    </Card.Title>
                    <Card.Title>
                      {selectedProperty.title || "None selected"}
                    </Card.Title>
                    {selectedProperty.description ? (
                      <TextExpand text={selectedProperty.description} />
                    ) : (
                      <p>Select or add a property to continue...</p>
                    )}

                    {/*<DayPickerRangeController*/}
                    {/*    onFocusChange={({focused}) => console.log(focused)} // PropTypes.func.isRequired*/}
                    {/*    isDayBlocked={day => {*/}
                    {/*      return isDayBlocked(calendar, day);*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {selectedProperty.description ? (
                      <div>
                        <div className="wifilist my-4">
                          <h3 className="mb-3">Amenities</h3>
                          <ul className="optonslist">
                            {amenitiesList.map((amenity, index) => {
                              if (
                                selectedProperty.amenities.includes(amenity)
                              ) {
                                return (
                                  <li key={"displayAmenities-" + index}>
                                    <i className={amenitiesIcon[index]}></i>{" "}
                                    {amenity}
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                        <div className="butns-view">
                          <a
                            href={selectedProperty.airbnbListingURL}
                            target="_blank"
                          >
                            View on AirBnB
                          </a>
                          {selectedProperty.vrboListingURL && (
                            <a
                              href={selectedProperty.vrboListingURL}
                              target="_blank"
                            >
                              View on VRBO
                            </a>
                          )}
                        </div>
                        <div className="marklist mt-3">
                          <p>
                            <b> {selectedProperty.owner.name} </b>
                            <br /> {selectedProperty.owner.description}
                          </p>
                          <p>
                            <a
                              href={"tel:" + selectedProperty.owner.phone}
                              className="clink"
                            >
                              <i className="fas fa-phone"></i>{" "}
                              {selectedProperty.owner.phone}
                            </a>
                            <a
                              href={"mailto:" + selectedProperty.owner.email}
                              className="clink"
                            >
                              <i className="fal fa-envelope"></i>{" "}
                              {selectedProperty.owner.email}
                            </a>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
        <Modal
          show={show}
          onHide={() => {
            handleClose();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {(selectedProperty.id && "Edit") || "Add"} Property
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (duplicate) {
                  alert("Your Link Name Has Already Taken");
                  return;
                }
                addEditProperty(e, selectedProperty, (e) => {
                  setSelectedProperty(e);
                  handleClose();
                  updateCalendars();
                });
              }}
            >
              <Form.Group controlId="propertyTitle">
                <Form.Label>Property Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  key-data="title"
                />
              </Form.Group>
              <Form.Group controlId="propertyLink">
                <Form.Label>Property Link</Form.Label>
                <Form.Control
                  onChange={(e) => handleDuplicate(e.target.value)}
                  type="text"
                  placeholder="Link"
                  key-data="link"
                />
                <Form.Text className="text-muted pl-1">
                  {duplicate ? (
                    <span style={{ color: "red" }}>
                      This link is already taken
                    </span>
                  ) : duplicate === false ? (
                    <span style={{ color: "green" }}>Nice Link</span>
                  ) : (
                    ""
                  )}
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
                  {selectedProperty.address
                    ? "(Currently set to " +
                      selectedProperty.address.stringFormat +
                      ")"
                    : ""}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="propertyDescription">
                <Form.Label>Property Description</Form.Label>
                <Form.Control as="textarea" rows="3" key-data="description" />
              </Form.Group>
              <Form.Group controlId="propertyRules">
                <Form.Label>Property Rules</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  key-data="rules"
                  placeholder="Rules such as 'No smoking indoors' etc."
                />
              </Form.Group>
              <Form.Group controlId="propertyImages" className="mb-1">
                <span>Property Images</span>
                <Form.Text className="text-muted pl-1 mb-2 mt-0">
                  Drag and drop to reorder
                </Form.Text>
                <Form.Label className="btn btn-primary" style={{backgroundColor: '#fecb56', border: "none"}}>Add images</Form.Label>
                <Form.Control
                  as="input"
                  type="file"
                  onChange={handleFileImages}
                  style={{ display: "none" }}
                  multiple
                ></Form.Control>
              </Form.Group>
              <Row id="propertyImagesPreview" className="mb-2 mx-auto"></Row>
              <Form.Label>
                Property Amenities (Ctrl + Click to select multiple)
              </Form.Label>
              {amenitiesList.map((amenity, index) => (
                <Form.Group
                  className="mb-1 pl-2"
                  controlId={"propertyAmenities" + index}
                  key={"amenities-" + index}
                >
                  <Form.Check
                  className='checkbox-property'
                    type="checkbox"
                    label={
                      <p>
                        <i className={amenitiesIcon[index]}></i> {amenity}{" "}
                      </p>
                    }
                    checked={selectedProperty.amenities.includes(amenity)}
                    onChange={() => {
                      setSelectedProperty({
                        ...selectedProperty,
                        amenities: getAmenitiesList(
                          selectedProperty.amenities,
                          amenity
                        ),
                      });
                    }}
                  />
                </Form.Group>
              ))}
              <hr />
              <Form.Group controlId="propertyAirbnbListingURL">
                <Form.Label className="mb-0">AirBnB Listing URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Airbnb Listing URL"
                  key-data="airbnbListingURL"
                />
              </Form.Group>
              <Form.Group controlId="propertyAirbnbCalendarURL">
                <Form.Label className="mb-0">AirBnB Calendar URL</Form.Label>
                <Form.Text className="text-muted pl-1 mb-2 mt-0">
                  i.e.
                  https://www.airbnb.com/calendar/ical/43828383.ics?s=4009e007ea7adc5328cbb57591acc665
                </Form.Text>
                <Form.Control
                  type="text"
                  placeholder="Airbnb Calendar URL Link"
                  key-data="airbnbCalendarURL"
                />
              </Form.Group>
              <Form.Group controlId="propertyVrboListingURL">
                <Form.Label className="mb-0">Vrbo Listing URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vrbo Listing URL Link"
                  optional-key-data="vrboListingURL"
                />
              </Form.Group>
              <Form.Group controlId="propertyVrboCalendarURL">
                <Form.Label className="mb-0">Vrbo Calendar URL</Form.Label>
                <Form.Text className="text-muted pl-1 mb-2 mt-0">
                  i.e.
                  http://www.vrbo.com/icalendar/8d585ea0aed689aa0ce45dac8d14440b.ics?nonTentative
                </Form.Text>
                <Form.Control
                  type="text"
                  placeholder="Vrbo Calendar URL Link"
                  optional-key-data="vrboCalendarURL"
                />
              </Form.Group>
              <hr />
              <Row>
                <Col>
                  <Form.Group controlId="propertyRooms">
                    <Form.Label className="mb-0">Room Count</Form.Label>
                    <input
                      type="number"
                      title="Rate"
                      id="rate"
                      className="form-control"
                      placeholder="Rooms"
                      key-data="bedroomCount"
                      min="0"
                      step="1"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="propertyBathrooms">
                    <Form.Label className="mb-0">Bathroom Count</Form.Label>
                    <input
                      type="number"
                      title="Rate"
                      id="rate"
                      className="form-control"
                      placeholder="Bathrooms"
                      key-data="bathroomCount"
                      min="0.0"
                      step="0.5"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="propertyOccupancy">
                    <Form.Label className="mb-0">Max Occupancy</Form.Label>
                    <input
                      type="number"
                      title="Rate"
                      id="rate"
                      className="form-control"
                      placeholder="Occupancy"
                      key-data="maxOccupancy"
                      min="0"
                      step="1"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Form.Group controlId="ownerName">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  as="input"
                  rows="3"
                  sub-key-data="owner.name"
                  placeholder="John Doe"
                />
              </Form.Group>
              <Form.Group controlId="ownerPhone">
                <Form.Label>Owner Phone</Form.Label>
                <Form.Control
                  as="input"
                  rows="3"
                  sub-key-data="owner.phone"
                  placeholder="123-456-1111"
                />
              </Form.Group>
              <Form.Group controlId="ownerEmail">
                <Form.Label>Owner Email</Form.Label>
                <Form.Control
                  as="input"
                  rows="3"
                  sub-key-data="owner.email"
                  placeholder="Owner.email@gmail.com"
                />
              </Form.Group>
              <Form.Group controlId="ownerDescription">
                <Form.Label>Owner Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  sub-key-data="owner.description"
                  placeholder="Description"
                />
              </Form.Group>
              <Button className="col-12" variant="primary" type="submit">
                {(selectedProperty.id && "Save") || "Add Property"}
              </Button>

              <IncompleteFieldsError showError={!fieldsCompleted} />
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
}

async function loadDashboardData(self, user) {
  const isAdmin = await isUserAdmin(user);
  const propertiesResponse = await getAllProperties();
  const properties = [];
  propertiesResponse.forEach((doc) => {
    properties.push(doc.data());
  });

  const filteredProperty = properties.filter((el) => el.createdBy == user.uid);
  const managedProperty = isAdmin ? properties : filteredProperty;
  self.setState({
    ...self.state,
    managedProperties: managedProperty,
    allProperties: properties,
    isAdmin: isAdmin,
  });
}

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    addEditProperty = addEditProperty.bind(this);
    this.state = {
      status: "LOADING",
      user: null,
      allProperties: [],
      managedProperties: [],
      fieldsCompleted: true,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({
          ...this.state,
          status: "SIGNED_IN",
          user: authUser,
        });
        loadDashboardData(this, authUser);
      } else {
        Router.push("/login");
      }
    });
  }

  render() {
    const { status, user } = this.state;
    if (status == "LOADING") {
      return <h1>Loading ......</h1>;
    } else if (status == "SIGNED_IN") {
      return <Dashboard {...this.state} />;
    }
  }
}

export default DashboardPage;
