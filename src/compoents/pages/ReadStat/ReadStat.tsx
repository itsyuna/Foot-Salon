import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store";

import Card from "../../../ui/Card/Card";
import { StatItemName } from "../../organisms/StatEditor/StatEditor";
import NoPostMessage from "../../molecules/NoPostMessage";
import ReadPostButton from "../../organisms/ReadPostButton";

const ReadStatWrapper = styled.article`
  font-family: "Do Hyeon", sans-serif;
  width: 60%;
  height: 55vh;
  margin: 4rem auto;
`;

const TopSection = styled.section`
  margin-top: 1rem;
  height: 4vh;
  display: flex;
  justify-content: space-between;
`;

const SelectWrapper = styled.section`
  display: flex;
  font-size: 1.2rem;
`;

const SelectBox = styled.div`
  width: 5vw;
  height: 4vh;
  line-height: 4vh;
  border-radius: 3rem;
  text-align: center;

  &:nth-child(1) {
    margin-right: 1rem;
    background-color: #ffe3e1;
    color: #ff5151;
    border: 1px solid #f675a8;
  }
  &:nth-child(2) {
    background-color: #daeaf1;
    border: 1px solid #b2c8df;
  }
`;

const CreatedDateBox = styled.section`
  width: 10vw;
  height: 3.5vh;
  line-height: 3.5vh;
  background-color: #c3edc0;
  border: 3px solid #aac8a7;
  text-align: center;
`;

const StatSection = styled.section`
  margin-top: 2rem;
`;

const MatchScoreDate = styled.section`
  display: flex;

  section:nth-child(1) {
    margin-right: 2rem;
  }
`;

export const MatchScore = styled.div`
  font-size: 1.2rem;
  margin: 0 auto;
  width: 9rem;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  justify-content: space-around;
  background-color: pink;
  border-radius: 5px;
`;

const MatchDate = styled.div`
  font-size: 1.2rem;
  width: 9rem;
  height: 2rem;
  line-height: 2rem;
  margin: 0 auto;
  text-align: center;
  background-color: #eeeeee;
  border-radius: 5px;
`;

const MatchResultBox = styled.div`
  width: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    color: #0a2647;
  }
`;

const StyledEmotion = styled.img`
  height: 6vh;
`;

const StatContent = styled.div`
  font-family: "IBM Plex Sans KR", sans-serif;
  width: 99%;
  padding: 0.3rem;
  height: 13vh;
  overflow: auto;
  white-space: pre-wrap;
  border: 2px solid #7a9d54;
`;

let matchResultText = ["lost", "draw", "win"];

const StatDiary = () => {
  const user = useAppSelector((state) => state.user.uid);

  let location = useLocation();

  const targetPost = location.state;

  const category = location.pathname;

  let isOwner = targetPost?.stat.creatorId === user;

  return targetPost ? (
    <Card>
      <ReadStatWrapper>
        <TopSection>
          <SelectWrapper>
            <SelectBox>{targetPost?.stat.league}</SelectBox>
            <SelectBox>{targetPost?.stat.watchOption}</SelectBox>
          </SelectWrapper>
          <CreatedDateBox>{`${targetPost?.stat.createdAt} 작성`}</CreatedDateBox>
        </TopSection>
        <MatchScoreDate>
          <StatSection>
            <StatItemName>경기 결과</StatItemName>
            <MatchScore>
              <div>{targetPost.stat.homeTeam}</div>
              <div>{targetPost.stat.homeTeamResult}</div>:
              <div>{targetPost.stat.awayTeamResult}</div>
              <div>{targetPost.stat.awayTeam}</div>
            </MatchScore>
          </StatSection>
          <StatSection>
            <StatItemName>경기 날짜</StatItemName>
            <MatchDate>{targetPost?.stat.matchDate}</MatchDate>
          </StatSection>
        </MatchScoreDate>
        <StatSection>
          <StatItemName>승부 결과</StatItemName>
          <MatchResultBox>
            <StyledEmotion
              src={`${process.env.PUBLIC_URL}/assets/img/emotion-${targetPost?.stat.matchResult}.svg`}
              alt="emotion"
            />
            <div>
              {targetPost && matchResultText[targetPost?.stat.matchResult - 1]}
            </div>
          </MatchResultBox>
        </StatSection>
        <StatSection>
          <StatItemName>오늘의 경기 기록</StatItemName>
          <StatContent>{targetPost?.stat.contents}</StatContent>
        </StatSection>
        <ReadPostButton
          isOwner={isOwner}
          category={category}
          targetStat={targetPost}
        />
      </ReadStatWrapper>
    </Card>
  ) : (
    <NoPostMessage />
  );
};

export default StatDiary;
