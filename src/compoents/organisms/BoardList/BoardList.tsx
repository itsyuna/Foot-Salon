import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { BoardListItems } from "../../../store/playBoard";
import { useAppSelector } from "../../../store";

const BoardListWrapper = styled.article`
  background-color: #e4e3e3;
  border: 1px solid #848181;
  height: 45vh;
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: auto;
  font-family: "Do Hyeon", sans-serif;
`;

const StyledBoardList = styled.ul<StyledListItems>`
  margin: 0;
  padding: 1rem;
  border-bottom: 1px solid gray;
  cursor: pointer;

  li:nth-child(1),
  li:nth-child(2) {
    width: 10%;
  }
  li:nth-child(3) {
    width: 50%;
  }
  li:nth-child(4),
  li:nth-child(5) {
    width: 15%;
  }

  background-color: ${({ bgColor }) => bgColor};
  &:hover {
    background-color: ${({ hoverEffect }) => hoverEffect};
  }
`;

const BoardMessage = styled.div`
  text-align: center;
  padding: 5rem;
`;

interface StyledListItems {
  bgColor?: string;
  hoverEffect?: string;
}

const category = ["No.", "League", "Title", "Writer", "Date"];

const BoardList = ({ boardByleague }: { boardByleague: BoardListItems[] }) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const location = useLocation();
  const boardCategory = location.pathname;

  const navigate = useNavigate();

  return (
    <BoardListWrapper>
      <StyledBoardList bgColor="#aec2b6">
        {category.map((list, idx) => (
          <li key={idx}>{list}</li>
        ))}
      </StyledBoardList>
      {boardByleague.length > 0 ? (
        boardByleague.map((list, idx) => (
          <StyledBoardList
            hoverEffect="#dbe4c6"
            onClick={() =>
              isLoggedIn
                ? navigate(
                    `${boardCategory === "/play" ? "/play" : "/half-time"}/${
                      boardByleague.length - idx
                    }`,
                    { state: list }
                  )
                : navigate("/login")
            }
            key={idx}
          >
            <li>{boardByleague.length - idx}</li>
            <li>{list.board.league}</li>
            <li>{list.board.title}</li>
            <li>{list.board.userNickname}</li>
            <li>{list.board.createdAt}</li>
          </StyledBoardList>
        ))
      ) : (
        <BoardMessage>게시글이 없습니다.</BoardMessage>
      )}
    </BoardListWrapper>
  );
};

export default BoardList;
