import styled from "styled-components";

const ArticleWrapper = styled.section`
  font-family: "Do Hyeon", sans-serif;
  width: 100%;
  height: 65vh;
  background-color: #f8f6f4;
  overflow: auto;
  border-collapse: collapse;
  white-space: nowrap;
  border-radius: 10px;
`;

interface WrapperProps {
  children: React.ReactNode;
}

const BoardCard = ({ children }: WrapperProps) => {
  return <ArticleWrapper>{children}</ArticleWrapper>;
};

export default BoardCard;
