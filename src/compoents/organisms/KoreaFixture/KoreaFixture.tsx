import styled from "styled-components";
import KoreaFixtureList from "../../molecules/KoreaFixtureList";

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

const ContentsTitle = styled.p`
  font-size: 1.2rem;
  color: #16213e;
  margin-top: 10px;
`;

const FixtureInfo = styled.div`
  display: flex;
  height: auto;
`;

const warmupMatchSubtitle = "평가전";
const nationalCompetitionSubtitle = "국제 대회";

const warmupMatchCategory = ["일시", "대진", "장소"];
const nationalCompetitionCategory = ["대회 기간", "대회명", "장소", "D-DAY"];

const warmupMatchList = [
  {
    date: "2023.06.16",
    time: "20:00",
    match: "대한민국 vs 페루",
    place: "부산 아시아드주경기장",
  },
  {
    date: "2023.06.20",
    time: "20:00",
    match: "대한민국 vs 엘살바도르",
    place: "대전 월드컵 경기장",
  },
  {
    date: "2023.09.07",
    time: "시간 미정",
    match: "대한민국 vs 웨일즈",
    place: "웨일즈 카디프시티 경기장",
  },
];

const competitionDday = (competitionDate: string) => {
  let date = new Date(competitionDate);

  let gap = date.getTime() - new Date().getTime();
  let dDay = Math.ceil(gap / (1000 * 60 * 60 * 24));

  return dDay;
};

const nationalCompetition = [
  {
    date: "2023.05.21~06.12",
    match: "FIFA U-20 월드컵",
    place: "아르헨티나",
    status: competitionDday(`2023-05-21 00:00:00`),
  },
  {
    date: "2023.09.23~10.08",
    match: "2023 항저우 아시안게임",
    place: "중국",
    status: competitionDday(`2023-09-23 00:00:00`),
  },
  {
    date: "2024.01.12~02.10",
    match: "2023 AFC 카타르 아시안컵",
    place: "카타르",
    status: competitionDday(`2024-01-12 00:00:00`),
  },
  {
    date: "2024.07.26~08.11",
    match: "2024 파리 올림픽",
    place: "프랑스",
    status: competitionDday(`2024-07-26 00:00:00`),
  },
];

const KoreaFixture = () => {
  return (
    <KoreaFixtureWrapper>
      <ContentsTitle>남자축구 국가대표 경기 일정</ContentsTitle>
      <FixtureInfo>
        <KoreaFixtureList
          matchCategory={warmupMatchList}
          category={warmupMatchCategory}
          subtitle={warmupMatchSubtitle}
        />
        <KoreaFixtureList
          matchCategory={nationalCompetition}
          category={nationalCompetitionCategory}
          subtitle={nationalCompetitionSubtitle}
        />
      </FixtureInfo>
    </KoreaFixtureWrapper>
  );
};
export default KoreaFixture;
