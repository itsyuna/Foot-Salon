import styled from "styled-components";

import { Link, useLocation } from "react-router-dom";
import { BoardListItems } from "../../../store/playBoard";

const BoardListWrapper = styled.article`
  background-color: #e4e3e3;
  border: 1px solid #848181;
  height: 40vh;
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  font-family: "Do Hyeon", sans-serif;
`;

const StyledBoardList = styled.ul<StyledListItems>`
  margin: 0;
  padding: 1rem;
  border-bottom: 1px solid gray;
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

const LinkPost = styled(Link)`
  color: black;
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
  const location = useLocation();
  const boardCategory = location.pathname;

  return (
    <BoardListWrapper>
      <StyledBoardList bgColor="#aec2b6">
        {category.map((list, idx) => (
          <li key={idx}>{list}</li>
        ))}
      </StyledBoardList>
      {boardByleague.length > 0 ? (
        boardByleague.map((list, idx) => (
          <LinkPost
            to={`${boardCategory === "/play" ? "/play" : "/half-time"}/${
              boardByleague.length - idx
            }`}
            state={{ item: list }}
            key={idx}
          >
            <StyledBoardList hoverEffect="#dbe4c6">
              <li>{boardByleague.length - idx}</li>
              <li>{list.board.league}</li>
              <li>{list.board.title}</li>
              <li>{list.board.userNickname}</li>
              <li>{list.board.createdAt}</li>
            </StyledBoardList>
          </LinkPost>
        ))
      ) : (
        <BoardMessage>게시글이 없습니다.</BoardMessage>
      )}
    </BoardListWrapper>
  );
};

export default BoardList;
