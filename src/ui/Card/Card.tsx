import styled from "styled-components";

const ArticleWrapper = styled.section`
  width: 100%;
  height: 65vh;
  background-color: white;
  overflow: auto;
  border-collapse: collapse;
  white-space: nowrap;
  border-radius: 10px;
`;

interface WrapperProps {
  children: React.ReactNode;
}

const Card = ({ children }: WrapperProps) => {
  return <ArticleWrapper>{children}</ArticleWrapper>;
};

export default Card;
