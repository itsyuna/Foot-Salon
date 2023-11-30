import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StatListItems } from "../../../store/stats";

import { MatchScore } from "../../pages/ReadStat/ReadStat";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const StatItemWrapper = styled.article<{ isStatItems: boolean }>`
  border: 1px solid lightGray;
  border-radius: 10px;
  width: 100%;
  height: 45vh;
  margin-top: 1.2rem;
  overflow: ${({ isStatItems }) => isStatItems && "auto"};

  ${media.small`
    width: 90%;
    height: 35vh;
    margin: 0 auto;
    font-size: 0.6rem;
  `}

  ${media.medium`
    font-size: 0.8rem;
  `}
`;

const StatsList = styled.section`
  border-bottom: 2px solid lightGray;
  width: 100%;
  height: 8vh;
  margin: 0;
  display: flex;
  cursor: pointer;

  &:hover {
    background-color: #ffd966;
  }
`;

const ListBox = styled.section`
  width: 70%;
  height: 100%;
  display: flex;

  ${media.small`
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;

const SortList = styled.section`
  width: 10vw;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  ${media.small`
    width: auto;  
    flex-direction: column;
    align-items: center;
  `}
`;

const LeagueList = styled.div`
  border-radius: 10px;
  width: 4rem;
  height: 3vh;
  line-height: 3vh;
  background-color: lightBlue;

  &:nth-child(1) {
    background-color: #ffe3e1;
    color: #ff5151;
    border: 1px solid #fea1a1;
  }
  &:nth-child(2) {
    background-color: #daeaf1;
    border: 1px solid #b2c8df;
  }

  ${media.small`
    width: 3rem;  
    height: 2vh;
    line-height: 2vh;
`}
`;

const ContentList = styled.div`
  &:nth-child(1) {
    width: 12vw;
    height: 3vh;
    line-height: 3vh;
    margin-right: 1rem;
    background-color: #dbdfea;
    border: 2px solid #b7b7b7;
  }
  &:nth-child(2) {
    width: 30vw;
    height: 7vh;
    line-height: 7vh;
    border: 1px solid #5c8984;
    border-radius: 10px;
  }

  ${media.small`
    &:nth-child(1) {
      font-size: 0.6rem;
      width: 40%;
      height: 25%;
      line-height: 2vh;
      margin: 0 0 0.2rem 0;
    }

    &:nth-child(2) {
      width: 80%;
      height: 40%;
    }
  `}

  ${media.medium`
    &:nth-child(1) {
      width: 11vw;
      margin-right: 0.5rem;
    }

    &:nth-child(2) {
      width: 28vw;
    }
  `}
`;

const NoStatMessage = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;

  display: flex;
  align-items: center;
  p {
    width: 100%;
    font-size: 0.8rem;
    color: #fc2947;

    ${media.small`
      font-size: 0.5rem;
    `}

    ${media.medium`
      font-size: 0.6rem;
    `}
  }
`;

const MatchScoreList = styled(MatchScore)`
  width: 17vw;
  margin: 1rem auto;
  justify-content: center;
  font-size: 1rem;
  background-color: #ffd1da;

  div {
    margin: 0.2rem;
  }

  ${media.small`
    width: 100%;
    height: 100%;
    font-size: 0.6rem;
    margin: 0;
    background-color: #FBFFDC;
  `}

  ${media.medium`
    width: 100%;
    height: 100%;
    font-size: 0.8rem;
    margin: 0;
    background-color: #EBF3E8;
  `}
`;

const EmotionBox = styled.section`
  width: 10%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small`
    justify-content: left;
  `}
`;

const StyledEmotion = styled.img`
  width: 40%;

  ${media.small`
    width: 70%;
  `}

  ${media.medium`
    width: 60%;
  `}
`;

const StatItem = ({ statItems }: { statItems: StatListItems[] }) => {
  let navigate = useNavigate();

  return (
    <StatItemWrapper isStatItems={statItems.length > 0}>
      {statItems.length !== 0 ? (
        statItems.map((item, idx) => (
          <StatsList
            key={item.id}
            onClick={() => navigate(`/stats/${idx}`, { state: item })}
          >
            <SortList>
              <LeagueList>{item.stat.league}</LeagueList>
              <LeagueList>{item.stat.watchOption}</LeagueList>
            </SortList>
            <ListBox>
              <ContentList>{item.stat.matchDate}</ContentList>
              <ContentList>
                <MatchScoreList>
                  <div>{item.stat.homeTeam}</div>
                  <div>{item.stat.homeTeamResult}</div>:
                  <div>{item.stat.awayTeamResult}</div>
                  <div>{item.stat.awayTeam}</div>
                </MatchScoreList>
              </ContentList>
            </ListBox>
            <EmotionBox>
              <StyledEmotion
                src={`${process.env.PUBLIC_URL}/assets/icons/emotion-${item.stat.matchResult}.svg`}
                alt="Emotion icon"
              />
            </EmotionBox>
          </StatsList>
        ))
      ) : (
        <NoStatMessage>
          <p>아직 쌓은 Stat이 없습니다 :(</p>
        </NoStatMessage>
      )}
    </StatItemWrapper>
  );
};

StatItem.defaultProps = {
  statItems: [],
};

export default StatItem;
