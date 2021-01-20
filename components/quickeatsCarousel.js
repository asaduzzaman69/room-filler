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
  const [currentSlide, setCurrentSlide] = useState(0);
  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prev = () => {
    setCurrentSlide(currentSlide - 1);
  };

  return (
    <Carousel
      className="mt-5 mt-sm-5 mt-md-5 mt-lg-5 pt-lg-5"
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      selectedItem={currentSlide}
      swipeable={true}
    >
      {quickEats.length > 0 &&
        quickEats.map((item, index) => {
          console.log({item})
          return (
            <Row
              className="align-items-center custom-row"
              key={`quick_eats_${index}`}
            >
              <Col xs={12} sm={6} md={6} className="order-2 order-md-1">
                <Image src={`/images${item.image}`} className="carousel-image" />
              </Col>
              <Col className="left-sec pl-lg-5 pl-md-4 order-1 order-md-2" xs={12} sm={6} md={6}>
                <h6>Quick Eats</h6>
                <h5>{item.name}</h5>
                <p className="sub">
                  {item.address1}
                  <br />
                  {item.address2}
                </p>
                <p>{item.desc}</p>
                <Button
                  onClick={() => prev()}
                  variant="outlined"
                  disabled={currentSlide === 0}
                >
                  <Image
                    src={
                      currentSlide === 0
                        ? "/images/left-arrow-disabled.png"
                        : "/images/left-arrow.png"
                    }
                    className="arrow"
                  />
                </Button>
                <Button
                  onClick={() => next()}
                  variant="outlined"
                  disabled={currentSlide === quickEats.length - 1}
                >
                  <Image
                    src={
                      currentSlide === quickEats.length - 1
                        ? "/images/right-arrow-disabled.png"
                        : "/images/right-arrow.png"
                    }
                    className="arrow"
                  />
                </Button>
              </Col>
            </Row>
          );
        })}
    </Carousel>
  );
};

export default QuickEatsCarousel;
