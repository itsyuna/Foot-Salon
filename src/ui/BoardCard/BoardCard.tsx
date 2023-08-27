import styled from "styled-components";

const BoardWrapper = styled.section`
  font-family: "Do Hyeon", sans-serif;
  width: 100%;
  height: 65vh;
  background-color: #f8f6f4;
  overflow: auto;
  border-collapse: collapse;
  white-space: nowrap;
  border-radius: 10px;
`;

interface BoardCardProps {
  children: React.ReactNode;
}

const BoardCard = ({ children }: BoardCardProps) => {
  return <BoardWrapper>{children}</BoardWrapper>;
};

export default BoardCard;
