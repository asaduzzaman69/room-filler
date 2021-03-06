import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Image,
} from "react-bootstrap";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import { localEateries } from "../public/constants/config";

const LocalEatsCarousel = ({}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const next = () => {
    if(currentSlide === localEateries.length - 1){
    setCurrentSlide(0);
    }else{
    setCurrentSlide(currentSlide + 1);
    }
  };

  const prev = () => {
    if(currentSlide === 0){
      setCurrentSlide(localEateries.length - 1);
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
      {localEateries.length > 0 &&
        localEateries.map((item, index) => {
          return (
            <Row
              className="align-items-center custom-row px-0"
              key={`quick_eats_${index}`}
            >
              <Col xs={12} sm={6} md={6}>
                <Image
                    src={`/images${item.image}`}
                    className="carousel-image shadow rounded"
                />
              </Col>
              <Col
                className="left-sec pr-lg-5 pr-md-3 mb-3"
                xs={12}
                sm={6}
                md={6}
              >
                <Link href="/places/local-eats">
                  <div style={{ cursor: "pointer" }}>
                    <h6 className="mt-2">Local Eateries</h6>
                    <h5>{item.name}</h5>
                    <p className="sub">
                      {item.address1}
                      <br />
                      {item.address2}
                      <br />
                      {item.stars} Stars (
                      {new Intl.NumberFormat("en-IN", {
                        maximumSignificantDigits: 3,
                      }).format(item.likes)}
                      )
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
                    src={"/images/right-arrow.png"}
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

export default LocalEatsCarousel;


/*

return  React.Children.Map(props.children, child => {
  return React.CloneElement()
})

*/