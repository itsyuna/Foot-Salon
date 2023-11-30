import styled from "styled-components";

import Carousel from "../../organisms/Carousel";
import KoreaFixture from "../../organisms/KoreaFixtures";
import TableTemplate from "../../organisms/TableTemplate";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const MainWrapper = styled.main`
  width: 100%;
  height: 65vh;

  ${media.small`
    width: 100%;
    overflow: auto;
  `}
`;

const HomeTopSection = styled.section`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: space-around;

  ${media.small`
    height: auto;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  `}
`;

const HomeBottomSection = styled(HomeTopSection)`
  height: 20vh;
  margin-top: 30px;

  ${media.small`
    height: auto;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  `}
`;

const images = [
  "captain-sonny",
  "kangin-1",
  "liverpool",
  "tottenham",
  "arsenal",
  "mancity",
  "sonny",
  "guesung",
  "korea",
  "kangin-2",
  "napoli",
  "jeonbuk",
  "incheon-utd",
];

const standingsMenu = [
  "순위",
  "팀명",
  "경기",
  "승점",
  "승",
  "무",
  "패",
  "득실차",
];

const topScorersMenu = [
  "순위",
  "선수명",
  "포지션",
  "총 득점 수 / 페널티 킥",
  "어시스트",
  "출장 수",
  "소속팀",
  "국적",
];

const Home = () => {
  return (
    <MainWrapper>
      <HomeTopSection>
        <Carousel images={images} />
        <TableTemplate category="STANDINGS" tableMenu={standingsMenu} />
      </HomeTopSection>
      <HomeBottomSection>
        <KoreaFixture />
        <TableTemplate category="TOPSCORERS" tableMenu={topScorersMenu} />
      </HomeBottomSection>
    </MainWrapper>
  );
};

export default Home;
