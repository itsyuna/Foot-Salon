import axios, { AxiosError } from "axios";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import LeagueCard from "../../../ui/LeagueCard";
import TableList from "../LeagueTableList";
import TransferList from "../TransferTableList";
import LoadingMessage from "../Message/LoadingMessage";
import ErrorMessage from "../Message/ErrorMessage";

export const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const Caption = styled.caption`
  padding: 10px;
  font-weight: 900;
`;

export const Th = styled.th`
  border: 1px solid lightgray;
  padding: 5px;
`;

const Tr = styled.tr`
  background-color: #dbdfea;
`;

export interface TableContent {
  category: string;
  tableMenu: string[];
  kLeagueCaption?: string;
  europeLeagueCaption?: string;
}

export interface TableProps {
  Position?: string;
  SquadLogo?: string;
  Name?: string;
  Played?: string;
  Points?: string;
  Winned?: string;
  Tie?: string;
  Loosed?: string;
  "Goal Difference"?: string;
  playerName?: string;
  playerRole?: string;
  oldClub?: string;
  newClub?: string;
  transferType?: string;
  renewal?: string;
  price?: string;
  transferDate?: string;
}

const TableTemplate = ({
  category,
  tableMenu,
  kLeagueCaption,
  europeLeagueCaption,
}: TableContent) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [table, setTable] = useState<TableProps[]>([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [error, setError] = useState(null);

  const showTableHandler = table.map((list, idx) =>
    category === "TABLE" ? (
      <TableList key={idx} {...list} />
    ) : (
      <TransferList key={idx} {...list} />
    )
  );

  const leagueList = [
    {
      name: "K League 1",
      league: "KLEAGUE",
      content: showTableHandler,
    },
    {
      name: "EPL",
      league: "EPL",
      content: showTableHandler,
    },
    {
      name: "LaLiga",
      league: "LALIGA",
      content: showTableHandler,
    },
    {
      name: "Serie A",
      league: "SERIEA",
      content: showTableHandler,
    },
  ];

  const selectTabHandler = (idx: number, league: string) => {
    setCurrentTab(idx);
    getAPI(league);
  };

  const getAPI = useCallback(
    async (league?: string) => {
      let url;

      if (league) {
        url = `${process.env[`REACT_APP_${category}_${league}_URL`]}`;
      } else url = `${process.env[`REACT_APP_${category}_KLEAGUE_URL`]}`;

      const options = {
        method: "GET",
        url: url,
        headers: {
          "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
          "X-RapidAPI-Host": `${process.env.REACT_APP_HOST}`,
        },
      };

      setLoading(true);

      try {
        const response = await axios.request(options);

        setTable(response.data);
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
          content={category === "TABLE" ? "리그별 팀 순위" : "리그별 이적 현황"}
          size={category === "TABLE" ? "medium" : "small"}
        />
      ) : error !== null ? (
        <ErrorMessage category={category} error={error} />
      ) : error === null && table.length ? (
        <TableWrapper>
          {kLeagueCaption && (
            <Caption>
              {currentTab === 0 ? kLeagueCaption : europeLeagueCaption}
            </Caption>
          )}
          <thead>
            <Tr>
              {tableMenu.map((menu, idx) => (
                <Th scope="col" key={idx}>
                  {menu}
                </Th>
              ))}
            </Tr>
          </thead>
          {leagueList[currentTab].content}
        </TableWrapper>
      ) : (
        <ErrorMessage error={error} />
      )}
    </LeagueCard>
  );
};

export default TableTemplate;
