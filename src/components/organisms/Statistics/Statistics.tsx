import styled from "styled-components";
import { StatListItems } from "../../../store/stats";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const StatisticsWrapper = styled.article`
  width: 70%;
  text-align: center;
  margin: 15rem auto;
  font-size: 0.9rem;

  ul span {
    color: red;
  }

  ul + ul span {
    color: #0e49b5;
  }

  ${media.small`
    width: 100%;
    
    margin: 0 auto;
    
    ul {
      display: flex;
      justify-content: center;
    }

    font-size: 0.6rem;
  `}

  ${media.medium`
    width: 95%;
    font-size: 0.7rem;
  `}
`;

const matchResult = {
  lost: 0,
  draw: 0,
  win: 0,
};

const watchOption = {
  home: 0,
  stadium: 0,
};

let matchResultMap = new Map();
matchResultMap.set("lost", "진");
matchResultMap.set("draw", "비긴");
matchResultMap.set("win", "이긴");

let watchOptionMap = new Map();
watchOptionMap.set("home", "집관");
watchOptionMap.set("stadium", "직관");

let countMatchResult = "";
let countWatchOption = "";

const Statistics = ({ myStat }: { myStat: StatListItems[] }) => {
  myStat.forEach((item) => {
    if (item.stat.matchResult === 1) matchResult.lost++;
    else if (item.stat.matchResult === 2) matchResult.draw++;
    else matchResult.win++;
  });

  const sortMatchResult = Object.entries(matchResult).sort(
    ([, a], [, b]) => b - a
  );

  if (
    matchResult.lost === matchResult.draw &&
    matchResult.draw === matchResult.win
  ) {
    countMatchResult = "승,무,패 골고루 가져왔어요!";
  } else if (sortMatchResult[0][1] === sortMatchResult[1][1]) {
    countMatchResult = `'${matchResultMap.get(
      sortMatchResult[0][0]
    )}+${matchResultMap.get(sortMatchResult[1][0])}' 경기가 많았어요!`;
  } else
    countMatchResult = `'${matchResultMap.get(
      sortMatchResult[0][0]
    )}' 경기가 많았어요!`;

  myStat.forEach((item) => {
    if (item.stat.watchOption === "집관 🏡") watchOption.home++;
    else watchOption.stadium++;
  });

  const sortWatchOption = Object.entries(watchOption).sort(
    ([, a], [, b]) => b - a
  );

  if (sortWatchOption[0][1] === sortWatchOption[1][1]) {
    countWatchOption = `'${watchOptionMap.get(
      sortWatchOption[0][0]
    )}+${watchOptionMap.get(sortWatchOption[1][0])}'을 똑같이 했어요!`;
  } else
    countWatchOption = `'${watchOptionMap.get(
      sortWatchOption[0][0]
    )}'을 더 많이 했어요!`;

  return (
    <StatisticsWrapper>
      <ul>
        <li>
          🥳 이번달은 <span>'{myStat.length}'</span> 경기를 응원했어요!
        </li>
      </ul>
      {myStat.length > 0 && (
        <>
          <ul>
            <li>
              📊 이번달은 <span>{countMatchResult}</span>
            </li>
          </ul>
          <ul>
            <li>
              🔍 이번달은 <span>{countWatchOption}</span>
            </li>
          </ul>
        </>
      )}
    </StatisticsWrapper>
  );
};

export default Statistics;
