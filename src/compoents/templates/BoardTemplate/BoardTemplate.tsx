import { useEffect, useState } from "react";

import { MainWrapper } from "../../../App";
import BoardCard from "../../../ui/BoardCard/BoardCard";
import BoardHeader from "../../organisms/BoardHeader/BoardHeader";
import BoardList from "../../organisms/BoardList/BoardList";
import { useAppDispatch, useAppSelector } from "../../../store";
import { BoardListItems, fetchPlayBoard } from "../../../store/playBoard";
import { fetchHalfTimeBoard } from "../../../store/halfTimeBoard";

const leagueCategory = ["K리그", "해외 축구"];

const BoardTemplate = ({ boardCategory }: { boardCategory: string }) => {
  const [sortList, setSortList] = useState("latest");

  const [league, setLeague] = useState("");

  const data = useAppSelector((state) => state.playBoard.boardArray);

  const boardByleague =
    league === "해외 축구"
      ? data.filter((item) => item.board.league !== "K LEAGUE")
      : data.filter((item) => item.board.league === "K LEAGUE");

  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (boardCategory) {
      case "play":
        dispatch(fetchPlayBoard());
        break;
      case "half-time":
        dispatch(fetchHalfTimeBoard());
        break;
    }
  }, [dispatch, boardCategory]);

  const getListByOption = () => {
    const compare = (a: BoardListItems, b: BoardListItems) => {
      if (sortList === "latest") {
        return (
          new Date(b.board.createdAt).getTime() -
          new Date(a.board.createdAt).getTime()
        );
      } else
        return (
          new Date(a.board.createdAt).getTime() -
          new Date(b.board.createdAt).getTime()
        );
    };

    const copyList: BoardListItems[] = JSON.parse(
      JSON.stringify(boardByleague.map((item) => item))
    );

    const filterList = copyList.sort(compare);
    return filterList;
  };

  return (
    <MainWrapper>
      <BoardCard>
        <BoardHeader
          leagueCategory={leagueCategory}
          league={setLeague}
          sortList={setSortList}
        />
        <BoardList boardByleague={getListByOption()} />
      </BoardCard>
    </MainWrapper>
  );
};

export default BoardTemplate;
