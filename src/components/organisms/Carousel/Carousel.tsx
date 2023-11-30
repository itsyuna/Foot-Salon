import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const CarouselWrapper = styled.article`
  width: 50vw;
  height: 40vh;
  margin-right: 15px;

  ${media.small`
    width: 100%;
    margin-left: 3%;
  `}
`;

const CustomCarousel = styled(Slider)`
  .slick-list {
    width: 50vw;
    height: 40vh;
  }

  .slick-prev {
    z-index: 998;
    left: 0.5%;
  }

  .slick-next {
    right: 1%;
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

  ${media.small`
    .slick-list {
      width: 100%;
    }
    .slick-prev {
      left: 1%;
    }
    .slick-dots {
      bottom: -2.5rem;
    }
  `}
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
    <CarouselWrapper
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <CustomCarousel {...settings}>
        {images.map((image, idx) => (
          <CarouselItems
            key={idx}
            src={`${process.env.PUBLIC_URL}/assets/images/${image}.jpg`}
            alt={`Carousel - ${image}`}
          />
        ))}
      </CustomCarousel>
    </CarouselWrapper>
  );
};

export default Carousel;
