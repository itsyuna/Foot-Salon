import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store";
import { StatListItems } from "../../../store/stats";

import StatList from "../../organisms/StatList";
import Statistics from "../../organisms/Statistics";

const StatWrapper = styled.section`
  width: 100%;
  height: 65vh;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  background-color: white;
  border-radius: 10px;
`;

export const StatSectionBox = styled.section`
  width: 100%;
  font-family: "Do Hyeon", sans-serif;
  font-size: 1.2rem;
  color: #354259;
  text-align: center;

  h4 {
    width: 70%;
    margin: 15rem 0 1rem 3rem;
  }
  p {
    color: #fc2947;
    font-size: 0.9rem;
  }
`;

const Stats = () => {
  const [dataByMonth, setDataByMonth] = useState<StatListItems[]>([]);

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const decreaseMonthHandler = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const increaseMonthHandler = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const statsData = useAppSelector((state) => state.stats.statsArray);

  useEffect(() => {
    if (statsData.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setDataByMonth(
        statsData.filter(
          (item) =>
            firstDay <= new Date(item.stat.matchDate).getTime() &&
            new Date(item.stat.matchDate).getTime() <= lastDay
        )
      );
    }
  }, [statsData, curDate]);

  const user = useAppSelector((state) => state.user.uid);
  const myStat = dataByMonth.filter((item) => item.stat.creatorId === user);

  return (
    <StatWrapper>
      <StatSectionBox>
        <h4>응원 경기를 기록하고, 나의 축덕 Stat을 쌓아보세요 :) ⚽️⚽️</h4>
        <p>*나의 Stat은 다른 사람이 볼 수 없습니다.</p>
      </StatSectionBox>
      <StatList
        headText={headText}
        leftButton={decreaseMonthHandler}
        rightButton={increaseMonthHandler}
        myStat={myStat}
      />
      <StatSectionBox>
        <Statistics myStat={myStat} />
      </StatSectionBox>
    </StatWrapper>
  );
};

export default Stats;
