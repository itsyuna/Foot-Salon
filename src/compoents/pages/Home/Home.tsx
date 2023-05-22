import styled from "styled-components";
import Carousel from "../../molecules/Carousel";

const HomeWrapper = styled.div`
  width: 100%;
  height: 70%;
  border: 2px solid yellow;
`;

const images = [
  "sonny",
  "kangin",
  "liverpool",
  "korea",
  "napoli",
  "incheon-utd",
  "jeonbuk",
];

const Home = () => {
  return (
    <HomeWrapper>
      <Carousel images={images} />
    </HomeWrapper>
  );
};

export default Home;
