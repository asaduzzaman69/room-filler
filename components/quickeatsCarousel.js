import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Image,
} from "react-bootstrap";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import { quickEats } from "../public/constants/config";

const QuickEatsCarousel = ({}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const next = () => {
    if(currentSlide === quickEats.length - 1){
    setCurrentSlide(0);
    }else{
    setCurrentSlide(currentSlide + 1);
    }
  };

  const prev = () => {
    if(currentSlide === 0){
      setCurrentSlide(quickEats.length - 1);
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
      {quickEats.length > 0 &&
        quickEats.map((item, index) => {
          return (
            <Row
              className="align-items-center custom-row px-0"
              key={`quick_eats_${index}`}
            >
              <Col xs={12} sm={6} md={6} className="order-1 order-sm-2">
                <Image
                  src={`/images${item.image}`}
                  className="carousel-image shadow rounded"
                />
              </Col>
              <Col
                className="left-sec pl-lg-5 pl-md-4 mb-3 order-2 order-sm-1"
                xs={12}
                sm={6}
                md={6}
              >
                <Link href="/places/quick-eats">
                  <div style={{ cursor: "pointer" }}>
                    <h6 className="mt-2">Quick Eats</h6>
                    <h5>{item.name}</h5>
                    <p className="sub">
                      {item.address1}
                      <br />
                      {item.address2}
                    </p>
                    <p>{item.desc}</p>
                  </div>
                </Link>
                <Button
                  onClick={() => prev()}
                  variant="outlined"
              
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
                    src={"/images/right-arrow.png" }
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
