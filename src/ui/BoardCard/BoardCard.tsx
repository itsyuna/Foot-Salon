import styled from "styled-components";
import { media } from "../MediaQuery/mediaQuery";

const BoardWrapper = styled.section`
  font-family: "Do Hyeon", sans-serif;
  width: 100%;
  height: 65vh;
  background-color: #f8f6f4;
  overflow: auto;
  border-collapse: collapse;
  white-space: nowrap;
  border-radius: 10px;

  ${media.small`
    font-size: 0.6rem;
  `}

  ${media.medium`
    font-size: 0.8rem;
  `}
`;

interface BoardCardProps {
  children: React.ReactNode;
}

const BoardCard = ({ children }: BoardCardProps) => {
  return <BoardWrapper>{children}</BoardWrapper>;
};

export default BoardCard;
