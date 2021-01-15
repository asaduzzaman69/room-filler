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
import { quickEats } from "../public/constants/config";

const QuickEatsCarousel = ({}) => {
  const [currentSlide, setCurrentSlide]  = useState(1);
  const next = () => {
    setCurrentSlide(currentSlide + 1)
};

const prev = () => {
  setCurrentSlide(currentSlide - 1)
};

  return (
    <Carousel className="mt-5 pt-5"
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        selectedItem={currentSlide}
        swipeable={true}
    >
      {
        quickEats.length>0 && 
        quickEats.map((item, index)=>{
          return(
            <Row
            style={{ backgroundColor: "#fff", padding: "0px 14%" }}
            className="align-items-center"
            key={`quick_eats_${index}`}
          >
            <Col >
              <Image src="/images/wendys.png" className="carousel-image"/>
            </Col>
            <Col className="left-sec pl-5">
              <h6>Quick Eats</h6>
              <h5>{item.name}</h5>
              <p className="sub">
                {item.address1}
                <br/>
                {item.address2}
              </p>
              <p>
                {item.desc}
              </p>
              <Button onClick={()=>prev()} variant="outlined" disabled={currentSlide===1}>
              <Image src={currentSlide === 1?"/images/left-arrow-disabled.png":"/images/left-arrow.png"} className="arrow"/>
              </Button>
              <Button onClick={()=>next()}variant="outlined" disabled={currentSlide===quickEats.length-1}>
              <Image src={currentSlide===quickEats.length-1?"/images/right-arrow-disabled.png":"/images/right-arrow.png"} className="arrow"/>
              </Button>
            </Col>
          </Row>
          )
        })
      }
     
  
    </Carousel>
  );
};

export default QuickEatsCarousel;
