import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store";

import Card from "../../../ui/Card/Card";
import { StatItemName } from "../../organisms/StatEditor/StatEditor";
import NoPostMessage from "../../molecules/NoPostMessage";
import ReadPostButton from "../../organisms/ReadPostButton";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const ReadStatWrapper = styled.article`
  font-family: "Do Hyeon", sans-serif;
  width: 60%;
  height: 55vh;
  margin: 4rem auto;

  section,
  div {
    font-size: 0.9rem;
  }

  ${media.small`
    width: 80%;
    margin: 3rem auto;

    section,div {
      font-size: 0.7rem;
    }
  `}

  ${media.medium`
    width: 90%;
    margin: 3.5rem auto;

    section,div {
      font-size: 0.8rem;
    }
  `}
`;

const TopSection = styled.section`
  margin-top: 1rem;
  height: 3vh;
  display: flex;
  justify-content: space-between;

  ${media.small`
    width: 100%;
    height: 2.5vh;
    margin: 1rem auto;
  `}
`;

const SelectWrapper = styled.section`
  display: flex;
  align-items: center;
`;

const SelectBox = styled.div`
  width: 6vw;
  height: 3vh;
  line-height: 3vh;

  border-radius: 3rem;
  text-align: center;

  &:nth-child(1) {
    margin-right: 1rem;
    background-color: #ffe3e1;
    color: #ff5151;
    border: 1px solid #f675a8;

    ${media.small`
      width: 11vw;
      height: 100%;
      line-height: 2.5vh;
      margin: 0;
    `}
  }
  &:nth-child(2) {
    background-color: #daeaf1;
    border: 1px solid #b2c8df;

    ${media.small`
      width: 11vw;
      height: 100%;
      line-height: 2.5vh;
    `}
  }
`;

const CreatedDateBox = styled.section`
  width: auto;
  height: auto;
  line-height: 3.5vh;
  background-color: #c3edc0;
  border: 3px solid #aac8a7;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0 0.2rem;
  }
  p:nth-child(2) {
    color: #fc2947;
  }
`;

const StatSection = styled.section`
  width: 100%;
  height: 100%;

  &:nth-child(1) {
    padding-right: 0.5rem;
  }
`;

const MatchScoreDate = styled.section`
  width: 100%;
  height: 12vh;
  margin: 3.5rem 0 1.5rem;
  display: flex;

  ${media.small`
    section:nth-child(1) {
      margin: 0;
      height: 100%;
    }
    
    justify-content: center;
    align-items: center;

    section:nth-child(2) {
      margin: 0;
      height: 100%;
    }
  `}
`;

export const MatchScore = styled.div`
  font-size: 1.2rem;
  width: 100%;
  height: 3rem;
  line-height: 2rem;
  margin: 0 auto;
  background-color: #a0d8b3;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin: 0.2rem;
  }
`;

const MatchDate = styled.div`
  font-size: 1.2rem;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  margin: 0 auto;
  text-align: center;
  background-color: #eeeeee;
  border-radius: 5px;
`;

const StyledEmotion = styled.img`
  margin-bottom: 0.2rem;
  height: 50%;
  margin-left: 0.5rem;

  ${media.small`
    height: 40%;
    margin-left: 0;
  `}
`;

const StatDiary = styled.section`
  width: 100%;
  margin-bottom: 2rem;
`;

const StatContent = styled.div`
  font-family: "IBM Plex Sans KR", sans-serif;
  width: auto;
  padding: 0.3rem;
  height: 13vh;
  overflow: auto;
  white-space: pre-wrap;
  border: 2px solid #7a9d54;
`;

const ReadStat = () => {
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
          <CreatedDateBox>
            <p>{`${targetPost?.stat.createdAt} 작성`}</p>
            {targetPost?.stat.isStatEdit && <p>(수정됨)</p>}
          </CreatedDateBox>
        </TopSection>
        <MatchScoreDate>
          <StatSection>
            <StatItemName>경기 날짜</StatItemName>
            <MatchDate>{targetPost?.stat.matchDate}</MatchDate>
          </StatSection>
          <StatSection>
            <StatItemName>경기 결과</StatItemName>
            <MatchScore>
              <div>{targetPost.stat.homeTeam}</div>
              <div>{targetPost.stat.homeTeamResult}</div>:
              <div>{targetPost.stat.awayTeamResult}</div>
              <div>{targetPost.stat.awayTeam}</div>
              <StyledEmotion
                src={`${process.env.PUBLIC_URL}/assets/icons/emotion-${targetPost?.stat.matchResult}.svg`}
                alt="Emotion icon"
              />
            </MatchScore>
          </StatSection>
        </MatchScoreDate>
        <StatDiary>
          <StatItemName>오늘의 경기 기록</StatItemName>
          <StatContent>{targetPost?.stat.contents}</StatContent>
        </StatDiary>
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

export default ReadStat;
