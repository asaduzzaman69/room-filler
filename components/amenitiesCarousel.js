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
import { amenities } from "../public/constants/config";

const AmenitiesCarousel = ({}) => {
  return (
    <Carousel className="mt-5">
      {
        amenities.length>0 && 
        amenities.map((item, index)=>{
          return(
            <Row
            style={{ backgroundColor: "#fff", padding: "0px 16%" }}
            className="align-items-center"
          >
            <Col className="left-sec">
              <h6>AMENITIES</h6>
              <h5>{item.name}</h5>
              <p>
                {item.desc}
              </p>
            </Col>
            <Col className="">
              <Image src="/images/luxury-spa.png" />
            </Col>
          </Row>
          )
        })
      }
     
  
    </Carousel>
  );
};

export default AmenitiesCarousel;
