import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  border: 3px solid orange;
  width: 50vw;
  height: 40vh;
  margin: 15px 10px;
`;

const CustomCarousel = styled(Slider)`
  .slick-list {
    width: 50vw;
    height: 40vh;
  }

  .slick-prev,
  .slick-next {
  }

  .slick-prev {
    z-index: 999;
    left: 1px;
  }

  .slick-next {
    right: 5px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
  }

  .slick-dots li button:before {
    color: white;
    opacity: 0.7;
  }

  .slick-dots li.slick-active button:before {
    color: orange;
    pacity: 1;
  }
`;

const CarouselItems = styled.img`
  width: 50vw;
  height: 40vh;
  object-fit: cover;
`;

type ImageName = string[];

const Carousel = ({ images }: { images: ImageName }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <CarouselWrapper>
      <CustomCarousel {...settings}>
        {images.map((image, i) => (
          <CarouselItems
            key={i}
            src={`${process.env.PUBLIC_URL}/assets/img/${image}.svg`}
            alt={"Carousel"}
          />
        ))}
      </CustomCarousel>
    </CarouselWrapper>
  );
};

export default Carousel;
