import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store";
import Button from "../../atoms/Button/Button";
import Select from "../../atoms/Select/Select";

const Wrapper = styled.div`
  width: 90%;
  height: 15vh;
  margin: 0 auto;
`;

const LeagueCategory = styled.div`
  text-align: center;
`;

const BoardListUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: right;
`;

interface BoardHeaderProps {
  leagueCategory: string[];
  league: React.Dispatch<React.SetStateAction<string>>;
  sortList: React.Dispatch<React.SetStateAction<string>>;
}

const optionList = [
  {
    value: "latest",
    name: "latest",
  },
  { value: "oldest", name: "oldest" },
];

const BoardHeader = ({
  leagueCategory,
  league,
  sortList,
}: BoardHeaderProps) => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const location = useLocation();
  const boardCategory = location.pathname;

  const newBoardHandler = () => {
    if (isLoggedIn && boardCategory === "/play") navigate("/play/new");
    else if (isLoggedIn && boardCategory === "/half-time")
      navigate("/half-time/new");
    else {
      alert("로그인 후 작성 가능합니다.");
      navigate("/login");
    }
  };

  const leagueFilterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    league((e.target as HTMLButtonElement).value);
  };

  return (
    <Wrapper>
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
            onChange={(e) => sortList(e.target.value)}
            option={optionList}
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
    </Wrapper>
  );
};

export default BoardHeader;
