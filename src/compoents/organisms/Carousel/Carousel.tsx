import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselWrapper = styled.article`
  width: 50vw;
  height: 40vh;
  margin-right: 15px;
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

  .slick-dots {
    bottom: -20px;
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

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = ({ images }: { images: ImageName }) => {
  return (
    <CarouselWrapper>
      <CustomCarousel {...settings}>
        {images.map((image, idx) => (
          <CarouselItems
            key={idx}
            src={`${process.env.PUBLIC_URL}/assets/img/${image}.svg`}
            alt="Carousel"
          />
        ))}
      </CustomCarousel>
    </CarouselWrapper>
  );
};

export default Carousel;
