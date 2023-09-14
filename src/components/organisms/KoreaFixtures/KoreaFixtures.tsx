import styled from "styled-components";
import KoreaFixtureList from "../KoreaFixtureList";

const KoreaFixtureWrapper = styled.article`
  font-family: "Do Hyeon", sans-serif;
  border-radius: 10px;
  background-color: #f9fbe7;
  width: 51vw;
  height: 20vh;
  overflow: auto;
  text-align: center;
  margin-right: 15px;
`;

const ContentsTitle = styled.h3`
  color: #16213e;
  margin-top: 10px;
`;

const FixtureInfo = styled.section`
  display: flex;
  height: auto;
`;

const warmupMatchSubtitle = "평가전";
const nationalCompetitionSubtitle = "국제 대회";

const warmupMatchCategory = ["일시", "대진", "장소"];
const nationalCompetitionCategory = ["대회 기간", "대회명", "장소", "D-DAY"];

const competitionDday = (competitionDate: string) => {
  let date = new Date(competitionDate);

  let gap = date.getTime() - new Date().getTime();
  let dDay = Math.ceil(gap / (1000 * 60 * 60 * 24));

  return dDay;
};

const checkMatchFinish = (finishDate: string) => {
  let date = new Date(finishDate);

  return new Date().getTime() > date.getTime();
};

const warmupMatchList = [
  {
    date: "2023.06.16",
    time: "20:00",
    match: "대한민국 vs 페루",
    place: "부산 아시아드 주경기장",
    isFinish: checkMatchFinish("2023-06-16 22:00:00"),
  },
  {
    date: "2023.06.20",
    time: "20:00",
    match: "대한민국 vs 엘살바도르",
    place: "대전 월드컵 경기장",
    isFinish: checkMatchFinish("2023-06-20 22:00:00"),
  },
  {
    date: "2023.09.08",
    time: "03:45",
    match: "대한민국 vs 웨일즈",
    place: "웨일즈 카디프 시티 스타디움",
    isFinish: checkMatchFinish("2023-09-08 06:00:00"),
  },
  {
    date: "2023.09.13",
    time: "01:30",
    match: "대한민국 vs 사우디아라비아",
    place: "잉글랜드 세인트 제임스 파크",
    isFinish: checkMatchFinish("2023-09-13 03:30:00"),
  },
  {
    date: "2023.10.13",
    time: "20:00",
    match: "대한민국 vs 튀니지",
    place: "서울 월드컵 경기장",
    isFinish: checkMatchFinish("2023-10-13 22:00:00"),
  },
  {
    date: "2023.10.17",
    time: "20:00",
    match: "대한민국 vs 베트남",
    place: "수원 월드컵 경기장",
    isFinish: checkMatchFinish("2023-10-17 22:00:00"),
  },
];

const nationalCompetition = [
  {
    date: "2023.05.21~06.12",
    match: "FIFA U-20 월드컵",
    place: "아르헨티나",
    status: competitionDday(`2023-05-21 00:00:00`),
    isFinish: checkMatchFinish("2023-06-13 00:00:00"),
  },
  {
    date: "2023.09.23~10.08",
    match: "2023 항저우 아시안게임",
    place: "중국",
    status: competitionDday(`2023-09-23 00:00:00`),
    isFinish: checkMatchFinish("2023-10-09 00:00:00"),
  },
  {
    date: "2024.01.12~02.10",
    match: "2023 AFC 카타르 아시안컵",
    place: "카타르",
    status: competitionDday(`2024-01-12 00:00:00`),
    isFinish: checkMatchFinish(`2024-02-11 00:00:00`),
  },
  {
    date: "2024.07.26~08.11",
    match: "2024 파리 올림픽",
    place: "프랑스",
    status: competitionDday(`2024-07-26 00:00:00`),
    isFinish: checkMatchFinish(`2024-08-12 00:00:00`),
  },
];

const KoreaFixtures = () => {
  return (
    <KoreaFixtureWrapper>
      <ContentsTitle>2023-2024 남자축구 국가대표 경기 일정</ContentsTitle>
      <FixtureInfo>
        <KoreaFixtureList
          matchList={warmupMatchList}
          category={warmupMatchCategory}
          subtitle={warmupMatchSubtitle}
        />
        <KoreaFixtureList
          matchList={nationalCompetition}
          category={nationalCompetitionCategory}
          subtitle={nationalCompetitionSubtitle}
        />
      </FixtureInfo>
    </KoreaFixtureWrapper>
  );
};
export default KoreaFixtures;
