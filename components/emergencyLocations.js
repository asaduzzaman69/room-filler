import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { getSearchLink } from "../services/properties";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import { Carousel } from "react-responsive-carousel";
import { emergencyLocations } from "../public/constants/config";

const EmergencyLocations = ({}) => {
  const [currentSlide, setCurrentSlide]  = useState(1);
  const next = () => {
    setCurrentSlide(currentSlide + 1)
};

const prev = () => {
  setCurrentSlide(currentSlide - 1)
};

  return (
    <Row
    style={{ backgroundColor: "#fff", padding: "0px 14%" }}
    className="align-items-center my-5 py-5"
  >
    <Col className="left-sec pr-5">
      <h5>Emergency Locations</h5>
      {emergencyLocations.length > 0 &&
        emergencyLocations.map((item, index) => {
          return (
            <p key={`emergency_locations_${index}`}>
              {item.name}
              <br/>
              {item.location}
              <br />
              {item.open}
            </p>
          )
        })
      }
    </Col>
    <Col>
      <Image
        src="/images/map.png"
        width="100%"
      />
    </Col>
  </Row>
  );
};

export default EmergencyLocations;
