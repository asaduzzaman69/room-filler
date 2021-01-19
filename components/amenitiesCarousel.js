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
  const [currentSlide, setCurrentSlide] = useState(1);
  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prev = () => {
    setCurrentSlide(currentSlide - 1);
  };

  return (
    <Carousel
      className="mt-5 pt-5"
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      selectedItem={currentSlide}
      swipeable={true}
    >
      {amenities.length > 0 &&
        amenities.map((item, index) => {
          return (
            <Row
              style={{ backgroundColor: "#fff", padding: "0px 14%" }}
              className="align-items-center"
              key={`amenities_${index}`}
            >
              <Col className="left-sec pr-5">
                <h6>Amenities</h6>
                <h5>{item.name}</h5>

                <p>{item.desc}</p>
                <Button
                  onClick={() => prev()}
                  variant="outlined"
                  disabled={currentSlide === 1}
                >
                  <Image
                    src={
                      currentSlide === 1
                        ? "/images/left-arrow-disabled.png"
                        : "/images/left-arrow.png"
                    }
                    className="arrow"
                  />
                </Button>
                <Button
                  onClick={() => next()}
                  variant="outlined"
                  disabled={currentSlide === amenities.length - 1}
                >
                  <Image
                    src={
                      currentSlide === amenities.length - 1
                        ? "/images/right-arrow-disabled.png"
                        : "/images/right-arrow.png"
                    }
                    className="arrow"
                  />
                </Button>
              </Col>
              <Col>
                <Image
                  src="/images/luxury-spa.png"
                  className="carousel-image"
                />
              </Col>
            </Row>
          );
        })}
    </Carousel>
  );
};

export default AmenitiesCarousel;
