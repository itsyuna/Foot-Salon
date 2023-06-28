import styled from "styled-components";

import Carousel from "../../molecules/Carousel";
import LeagueTable from "../../organisms/LeagueTable";
import KoreaFixture from "../../organisms/KoreaFixture";
import Transfer from "../../organisms/TransferTable";
import { MainWrapper } from "../../../App";

const HomeTopSection = styled.section`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: space-around;
`;

const HomeBottomSection = styled(HomeTopSection)`
  height: 20vh;
  margin-top: 30px;
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
    <MainWrapper>
      <HomeTopSection>
        <Carousel images={images} />
        <LeagueTable />
      </HomeTopSection>
      <HomeBottomSection>
        <KoreaFixture />
        <Transfer />
      </HomeBottomSection>
    </MainWrapper>
  );
};

export default Home;
