import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Image,
} from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { amenities } from "../public/constants/config";

const AmenitiesCarousel = ({}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const next = () => {
    if(currentSlide === amenities.length - 1){
    setCurrentSlide(0);
    }else{
    setCurrentSlide(currentSlide + 1);
    }
  };

  const prev = () => {
    if(currentSlide === 0){
      setCurrentSlide(amenities.length - 1);
    }else{
    setCurrentSlide(currentSlide - 1);
    }
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
      autoPlay={true}
      infiniteLoop={true}
    >
      {amenities.length > 0 &&
        amenities.map((item, index) => {
          return (
            <Row
              className="align-items-center custom-row px-0 slide-bg"
              key={`amenities_${index}`}
            >
              <Col
                className="left-sec pr-lg-5 pr-md-3 mb-3"
                xs={12}
                sm={6}
                md={6}
              >
                <h6>Amenities</h6>
                <h5>{item.name}</h5>

                <p>{item.desc}</p>
                <Button
                  onClick={() => prev()}
                  variant="outlined"
                  disabled={currentSlide === 1}
                >
                  <Image
                    src={"/images/left-arrow.png"}
                    className="arrow"
                  />
                </Button>
                <Button
                  onClick={() => next()}
                  variant="outlined"
                >
                  <Image
                    src={"/images/right-arrow.png"}
                    className="arrow"
                  />
                </Button>
              </Col>
              <Col xs={12} sm={6} md={6}>
                <Image
                  src="/images/luxury-spa.png"
                  className="carousel-image shadow rounded"
                />
              </Col>
            </Row>
          );
        })}
    </Carousel>
  );
};

export default AmenitiesCarousel;
