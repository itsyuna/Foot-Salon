import styled from "styled-components";
import React from "react";
import { media } from "../MediaQuery/mediaQuery";

export const LeagueWrapper = styled.article`
  width: 30vw;
  height: 100%;
  background-color: white;
  overflow: auto;

  ${media.small`
    width: 100%;
  `}
`;

const LeagueTab = styled.ul`
  height: 3vh;
  margin: 0;

  display: grid;
  grid-template-columns: 25% 10% 15% 20% 15% 15%;
`;

const TabList = styled.li<{ isActive: boolean }>`
  width: 100%;
  height: 3vh;
  line-height: 3vh;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1rem;
  border: 2px solid #a2cdcd;

  background-color: ${({ isActive }) => (isActive ? "#feff86" : "white")};
  color: ${({ isActive }) => (isActive ? "#4942e4" : "#27374d")};
  font-weight: ${({ isActive }) => (isActive ? "900" : "")};

  ${media.small`
    font-size: 2.7vw;
  `}

  ${media.medium`
    font-size: 1.2vw;
  `}
`;

interface LeagueListItems {
  name: string;
  leagueNo: number;
  contents: JSX.Element[];
}

interface LeagueProps {
  children: React.ReactNode;
  leagueList: LeagueListItems[];
  selectTabHandler: (idx: number, leagueNo: number) => void;
  currentTab: number;
}

const LeagueCard = ({
  children,
  leagueList,
  selectTabHandler,
  currentTab,
}: LeagueProps) => {
  const LeagueTabHandler = (idx: number, leagueNo: number) => {
    selectTabHandler(idx, leagueNo);
  };

  return (
    <LeagueWrapper>
      <LeagueTab>
        {leagueList.map((item, idx) => (
          <TabList
            key={idx}
            onClick={() => LeagueTabHandler(idx, item.leagueNo)}
            isActive={currentTab === idx ? true : false}
          >
            {item.name}
          </TabList>
        ))}
      </LeagueTab>
      {children}
    </LeagueWrapper>
  );
};

export default LeagueCard;
