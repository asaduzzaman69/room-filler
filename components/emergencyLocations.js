import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { emergencyLocations } from "../public/constants/config";
import Link from "next/link";

const EmergencyLocations = ({}) => {
  return (
    <Row className="align-items-center my-4 my-sm-5 my-md-5 my-lg-5 py-lg-5 px-0 mx-auto custom-row">
      <Link href="/places/emergency-locations">
        <Col
          className="left-sec pr-5"
          xs={12}
          sm={6}
          md={6}
          style={{ cursor: "pointer" }}
        >
          <h5>Emergency Locations</h5>
          <div className="heading-border" />

          {emergencyLocations.length > 0 &&
            emergencyLocations.map((item, index) => {
              return (
                <p key={`emergency_locations_${index}`}>
                  {item.name}
                  <br />
                  {item.location}
                  <br />
                  {item.open}
                </p>
              );
            })}
        </Col>
      </Link>
      <Col xs={12} sm={6} md={6}>
        <Image src="/images/map.png" width="100%" />
      </Col>
    </Row>
  );
};

export default EmergencyLocations;
