import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StatListItems } from "../../../store/stats";

import { MatchScore } from "../../pages/ReadStat/ReadStat";

const StatItemWrapper = styled.article<{ isStatItems: boolean }>`
  border: 1px solid lightGray;
  border-radius: 10px;
  height: 48vh;
  margin-top: 1.2rem;
  overflow: ${({ isStatItems }) => isStatItems && "auto"};
`;

const StatsList = styled.section`
  border-bottom: 2px solid lightGray;
  width: 100%;
  height: 8vh;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: #ffd966;
  }
  margin: 0;
`;

const ListBox = styled.section`
  height: 90%;
  padding: 0.5rem;
  display: flex;
  &:nth-child(2) {
    width: 70%;
  }
  &:nth-child(3) {
    width: 10%;
    height: 80%;
  }
`;

const LeagueList = styled.div`
  border-radius: 10px;
  width: 5rem;
  height: 3vh;
  line-height: 3vh;
  background-color: lightBlue;
  &:nth-child(1) {
    background-color: #ffe3e1;
    color: #ff5151;
    border: #f675a8;
  }
  &:nth-child(2) {
    background-color: #daeaf1;
    border: #b2c8df;
  }
`;

const ContentList = styled.div`
  &:nth-child(1) {
    height: 3vh;
    line-height: 3vh;
    margin-right: 1rem;
    background-color: #dbdfea;
    border: 2px solid #b7b7b7;
    width: 8rem;
  }
  &:nth-child(2) {
    width: 40rem;
    height: 7vh;
    line-height: 7vh;
    border: 1px solid #5c8984;
    border-radius: 10px;
  }
`;

const NoStatMessage = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;

  p {
    width: 100%;
    margin-top: 15rem;
  }
`;

const MatchScoreList = styled(MatchScore)`
  width: 17rem;
  margin: 1.3rem auto;

  div {
    width: auto;
  }
`;

const StyledEmotion = styled.img`
  margin: 0 auto;
  height: 6vh;
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
            <ListBox>
              <LeagueList>{item.stat.league}</LeagueList>
              <LeagueList>{item.stat.watchOption}</LeagueList>
            </ListBox>
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
            <ListBox>
              <StyledEmotion
                src={`${process.env.PUBLIC_URL}/assets/icons/emotion-${item.stat.matchResult}.svg`}
                alt="Emotion icon"
              />
            </ListBox>
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
