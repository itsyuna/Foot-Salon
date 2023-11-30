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
import { media } from "../../../ui/MediaQuery/mediaQuery";

const StatDateBox = styled.section`
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.1rem;
  width: 40%;
  height: 10%;
  margin: 1rem auto;

  display: flex;
  justify-content: space-around;

  button {
    margin-left: 0;
    margin-right: 0;
  }

  ${media.small`
    width: 50%;
    font-size: 0.7rem;
    margin: 0 auto;

    div {
      margin-top: 1.2rem;
    }

    button {
      width: 1.8rem;
      height: 1.2rem;
    }

    svg {
      width: 1rem;
      height: 0.9rem;
    }
  `}

  ${media.medium`
    width: 45%;
    font-size: 0.9rem;

    div {
      margin-top: 1.2rem;
    }

    button {
      width: 2.3rem;
      height: 1.5rem;
    }

    svg {
      width: 1.5rem;
      height: 1.2rem;
    }
  `}
`;

const HeadTextBox = styled.div`
  width: auto;
  height: 100%;
  margin-top: 1.3rem;
`;

const StatOptionBox = styled.section`
  height: 10%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  select,
  button {
    height: 3vh;
  }

  ${media.small`
    width: 90%;
    margin: 0.3rem auto 1rem;
  `}
`;

const SortBox = styled.div`
  text-align: center;
  padding: 0.7rem;

  ${media.small`
    padding: 0.2rem;

    &:nth-child(-n + 2) {
      width: 35%;
    }
    &:nth-child(3) {
      width: 30%;
    }

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, auto));

    select,button {
      font-size: 0.6rem;
    }
  `}

  ${media.medium`
    padding: 0.2rem;

    select,button {
      font-size: 0.8rem;
    }
  `}
`;

interface StatListProps {
  headText: string;
  leftButton: () => void;
  rightButton: () => void;
  myStat: StatListItems[];
}

const sortOptionList = [
  { value: "latest", name: "Latest" },
  { value: "oldest", name: "Oldest" },
];

const filterOptionList = [
  { value: "all", name: "All" },
  { value: "lost", name: "Lost" },
  { value: "draw", name: "Draw" },
  { value: "win", name: "Win" },
];

const leagueOptionList = [
  { value: "all", name: "All" },
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
            height="2rem"
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
            height="2rem"
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
              backgroundColor="#f6edd9"
              color="#379237"
              border="#7a9972"
            />
            <Select
              value={emotionFilter}
              onChange={(e) => setEmotionFilter(e.target.value)}
              option={filterOptionList}
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
