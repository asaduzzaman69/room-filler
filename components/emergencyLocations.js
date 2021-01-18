import React, { useState } from "react";
import {
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { emergencyLocations } from "../public/constants/config";

const EmergencyLocations = ({}) => {
  return (
    <Row
    style={{ backgroundColor: "#fff", padding: "0px 14%" }}
    className="align-items-center my-5 py-5 mx-auto"
  >
    <Col className="left-sec pr-5" >
      <h5>Emergency Locations</h5>
      <div className="heading-border"/>
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
