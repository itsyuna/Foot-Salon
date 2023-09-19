import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { StatListItems, fetchStats } from "../../../store/stats";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import Button from "../../atoms/Button";
import Select from "../../atoms/Select";
import { StatSectionBox } from "../../pages/Stats/Stats";
import StatItem from "../StatItem";

const StatDateBox = styled.section`
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.2rem;
  width: 50%;
  height: 10%;
  margin: 1rem auto;
  display: flex;
  justify-content: space-around;
`;

const StatOptionBox = styled.section`
  display: flex;
  height: 10%;
`;

const HeadTextBox = styled.div`
  height: 50%;
  margin-top: 1.5rem;
`;

const SortBox = styled.div`
  text-align: center;
  padding: 0.7rem;
  &:nth-child(-n + 2) {
    width: 35%;
  }
  &:nth-child(3) {
    width: 30%;
  }
`;

interface StatListProps {
  headText: string;
  leftButton: () => void;
  rightButton: () => void;
  myStat: StatListItems[];
}

const sortOptionList = [
  { value: "latest", name: "latest" },
  { value: "oldest", name: "oldest" },
];

const filterOptionList = [
  { value: "all", name: "all" },
  { value: "lost", name: "lost" },
  { value: "draw", name: "draw" },
  { value: "win", name: "win" },
];

const leagueOptionList = [
  { value: "all", name: "all" },
  { value: "k-league", name: "K리그" },
  { value: "europe-league", name: "해외 축구" },
];

const StatList = ({
  headText,
  leftButton,
  rightButton,
  myStat,
}: StatListProps) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [sortList, setSortList] = useState("latest");

  const [emotionFilter, setEmotionFilter] = useState("all");

  const [leagueFilter, setLeagueFilter] = useState("all");

  const navigate = useNavigate();

  const newsHandler = () => {
    isLoggedIn ? navigate("/stats/new") : navigate("/login");
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const getListByOption = () => {
    const listByEmotion = (item: StatListItems) => {
      if (emotionFilter === "lost") return item.stat.matchResult === 1;
      else if (emotionFilter === "draw") return item.stat.matchResult === 2;
      else return item.stat.matchResult === 3;
    };

    const listByLeague = (item: StatListItems) => {
      if (leagueFilter === "k-league") return item.stat.league === "K리그";
      else return item.stat.league === "해외 축구";
    };

    const compare = (a: StatListItems, b: StatListItems) => {
      if (sortList === "latest") {
        return (
          new Date(b.stat.matchDate).getTime() -
          new Date(a.stat.matchDate).getTime()
        );
      } else
        return (
          new Date(a.stat.matchDate).getTime() -
          new Date(b.stat.matchDate).getTime()
        );
    };

    const copyList: StatListItems[] = JSON.parse(
      JSON.stringify(myStat.map((item) => item))
    );

    const chooseLeague =
      leagueFilter === "all"
        ? copyList
        : copyList.filter((item) => listByLeague(item));

    const filterList =
      emotionFilter === "all"
        ? chooseLeague
        : chooseLeague.filter((item) => listByEmotion(item));

    const sortedList = filterList.sort(compare);
    return sortedList;
  };

  return (
    <StatSectionBox>
      <header>
        <StatDateBox>
          <Button
            type="button"
            onClick={leftButton}
            backgroundColor="#aac4ff"
            border="#aac4ff"
            width="3rem"
            height="2.5rem"
          >
            <BsFillCaretLeftFill size="25" color="#116a7b" />
          </Button>
          <HeadTextBox>{headText}</HeadTextBox>
          <Button
            type="button"
            onClick={rightButton}
            backgroundColor="#aac4ff"
            border="#aac4ff"
            width="3rem"
            height="2.5rem"
          >
            <BsFillCaretRightFill size="25" color="#116a7b" />
          </Button>
        </StatDateBox>
        <StatOptionBox>
          <SortBox>
            <Select
              value={sortList}
              onChange={(e) => setSortList(e.target.value)}
              option={sortOptionList}
              width="5vw"
              backgroundColor="#f6edd9"
              color="#379237"
              border="#7a9972"
            />
            <Select
              value={emotionFilter}
              onChange={(e) => setEmotionFilter(e.target.value)}
              option={filterOptionList}
              width="4vw"
              backgroundColor="#FFE3E1"
              color="#FF7878"
              border="#F675A8"
            />
          </SortBox>
          <SortBox>
            <Select
              value={leagueFilter}
              onChange={(e) => setLeagueFilter(e.target.value)}
              option={leagueOptionList}
              backgroundColor="#FFD9C0"
              color="#FF4A4A"
              border="#FEB139"
            />
          </SortBox>
          <SortBox>
            <Button
              type="button"
              margin="0"
              backgroundColor="#FFF56D"
              border="#FBCB0A"
              onClick={newsHandler}
            >
              Add Stat 🖍
            </Button>
          </SortBox>
        </StatOptionBox>
      </header>
      <StatItem statItems={getListByOption()} />
    </StatSectionBox>
  );
};
export default StatList;
