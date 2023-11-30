import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import LeagueCard from "../../../ui/LeagueCard";
import StandingsList from "../StandingsList";
import TopscorersList from "../TopscorersList";
import LoadingMessage from "../../molecules/LoadingMessage";
import ErrorMessage from "../../molecules/ErrorMessage";
import { media } from "../../../ui/MediaQuery/mediaQuery";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 0.6rem;
  overflow: auto;

  ${media.large`
    font-size: 0.9rem;
  `}
`;

const Caption = styled.caption`
  padding: 10px;
  font-weight: 900;
`;

const Tr = styled.tr`
  background-color: #dbdfea;
  width: 100%;
  height: 2vh;
`;

export const Th = styled.th`
  border: 1px solid lightgray;
  padding: 5px;
`;

interface TableByLeague {
  category: string;
  tableMenu: string[];
}

interface All {
  draw: number;
  goals: object;
  lose: number;
  played: number;
  win: number;
}

interface Team {
  id: number;
  logo: string;
  name: string;
}

interface Player {
  id: number;
  name: string;
  nationality: string;
}

interface Games {
  appearences: number;
  position: string;
}

interface Goals {
  assists: number;
  total: number;
}

interface Penalty {
  scored: number;
}

interface Team {
  name: string;
}

interface Statistics {
  games: Games;
  goals: Goals;
  penalty: Penalty;
  team: Team;
}

export interface TableProps {
  all: All;
  team: Team;
  rank: string;
  logo: string;
  points: string;
  goalsDiff: string;
  idx: number;
  player: Player;
  statistics: Statistics[];
}

const kLeagueCaption = "2023 K리그 1";
const europeLeagueCaption = "2023-2024";

const TableTemplate = ({ category, tableMenu }: TableByLeague) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [table, setTable] = useState<TableProps[]>([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [error, setError] = useState(null);

  const showTableHandler = table.map((list, idx) =>
    category === "STANDINGS" ? (
      <StandingsList key={list.team.id} {...list} />
    ) : (
      <TopscorersList key={list.player.id} {...list} idx={idx} />
    )
  );

  const leagueList = [
    {
      name: "K League 1",
      leagueNo: 292,
      contents: showTableHandler,
    },
    {
      name: "EPL",
      leagueNo: 39,
      contents: showTableHandler,
    },
    {
      name: "Ligue 1",
      leagueNo: 61,
      contents: showTableHandler,
    },
    {
      name: "Bundesliga",
      leagueNo: 78,
      contents: showTableHandler,
    },
    {
      name: "La Liga",
      leagueNo: 140,
      contents: showTableHandler,
    },
    {
      name: "Serie A",
      leagueNo: 135,
      contents: showTableHandler,
    },
  ];

  const selectTabHandler = (idx: number, leagueNo: number) => {
    setCurrentTab(idx);
    getAPI(leagueNo);
  };

  const getAPI = useCallback(
    async (leagueNo?: number) => {
      let url = `${process.env[`REACT_APP_${category}_URL`]}`;

      const options = {
        method: "GET",
        url: url,
        params: {
          season: "2023",
          league: leagueNo ? leagueNo : 292,
        },
        headers: {
          "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
          "X-RapidAPI-Host": `${process.env.REACT_APP_TABLE_HOST}`,
        },
      };

      setLoading(true);

      try {
        const response = await axios.request(options);

        setTable(
          category === "STANDINGS"
            ? response.data.response[0].league.standings[0]
            : response.data.response
        );

        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);

        if (error instanceof AxiosError) {
          let errorStatus = error.response?.data.details;
          setError(errorStatus);
        }
      }
    },
    [category]
  );

  useEffect(() => {
    getAPI();
  }, [getAPI]);

  return (
    <LeagueCard
      leagueList={leagueList}
      selectTabHandler={selectTabHandler}
      currentTab={currentTab}
    >
      {loading ? (
        <LoadingMessage
          contents={
            category === "STANDINGS" ? "리그별 팀 순위" : "리그별 득점자 순위"
          }
          size={category === "STANDINGS" ? "medium" : "small"}
        />
      ) : table.length ? (
        <Table>
          <Caption>
            {currentTab === 0 ? kLeagueCaption : europeLeagueCaption}
          </Caption>
          <thead>
            <Tr>
              {tableMenu.map((menu, idx) => (
                <Th scope="col" key={idx}>
                  {menu}
                </Th>
              ))}
            </Tr>
          </thead>
          <tbody>{leagueList[currentTab].contents}</tbody>
        </Table>
      ) : (
        <ErrorMessage category={category} error={error} />
      )}
    </LeagueCard>
  );
};

export default TableTemplate;
