import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store";
import Button from "../../atoms/Button/Button";
import Select from "../../atoms/Select/Select";
import { toast } from "react-toastify";
import React from "react";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const Header = styled.header`
  width: 90%;
  height: 15vh;
  margin: 0 auto;

  ${media.small`
    button, select {
      font-size: 0.6rem;
    }
  `}

  ${media.medium`
    button, select { 
      font-size: 0.8rem;
    }
  `}
`;

const LeagueCategory = styled.section`
  text-align: center;
`;

const BoardListUp = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: auto;

    button {
      margin: 0 0 0 0.5rem;

      ${media.small`
        margin: 0;
      `}

      ${media.medium`
        margin: 0 0 0 0.3rem;
      `}
    }
  }
`;

interface BoardHeaderProps {
  leagueCategory: string[];
  setLeague: React.Dispatch<React.SetStateAction<string>>;
  setSortList: React.Dispatch<React.SetStateAction<string>>;
}

const optionList = [
  {
    value: "latest",
    name: "Latest",
  },
  { value: "oldest", name: "Oldest" },
];

const BoardHeader = ({
  leagueCategory,
  setLeague,
  setSortList,
}: BoardHeaderProps) => {
  const navigate = useNavigate();

  const userNickname = useAppSelector((state) => state.user.nickname);

  const location = useLocation();
  const boardCategory = location.pathname;

  const newBoardHandler = () => {
    if (userNickname && boardCategory === "/play") navigate("/play/new");
    else if (userNickname && boardCategory === "/half-time")
      navigate("/half-time/new");
    else {
      toast.warn("로그인 후 작성 가능합니다.");
      navigate("/login");
    }
  };

  const leagueFilterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLeague((e.target as HTMLButtonElement).value);
  };

  return (
    <Header>
      <LeagueCategory>
        {leagueCategory.map((item, idx) => (
          <Button
            key={idx}
            value={item}
            type="button"
            onClick={leagueFilterHandler}
            backgroundColor="#fefae0"
            color="#374259"
            border="#fca66e"
            hoverEffect="#ffdeb4"
          >
            {item}
          </Button>
        ))}
      </LeagueCategory>
      <BoardListUp>
        <h4>
          {boardCategory === "/play"
            ? "⚽️ 경기에 관한 이야기를 나눠 보세요 :)"
            : "🗣 잠시 쉬면서 자유로운 이야기를 나눠 보세요 :)"}
        </h4>
        <div>
          <Select
            onChange={(e) => setSortList(e.target.value)}
            option={optionList}
            height="3.5vh"
            backgroundColor="#f6edd9"
            color="#379237"
            border="#7a9972"
          ></Select>
          <Button
            type="button"
            backgroundColor="#f95d8a"
            color="white"
            border="#f00f96"
            onClick={newBoardHandler}
          >
            Write
          </Button>
        </div>
      </BoardListUp>
    </Header>
  );
};

export default React.memo(BoardHeader);
