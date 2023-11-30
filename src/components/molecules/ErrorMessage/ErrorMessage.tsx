import styled from "styled-components";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const MessageWrapper = styled.section<{ category?: string }>`
  font-family: "Gowun Dodum", sans-serif;
  width: 100%;
  height: ${({ category }) => (category === "VIDEO" ? "70%" : "90%")};
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryMessage = styled.p`
  font-size: 1rem;
  font-weight: 900;
  color: #1b9c85;
  margin: 0;

  ${media.large`
    font-size: 1.2rem;
  `}
`;

const Message = styled.p`
  font-weight: 800;
  font-size: 0.8rem;

  ${media.large`
    font-size: 0.9rem;
  `}
`;

interface ErrorProps {
  category: string;
  error: null;
}

const ErrorMessage = ({ category, error }: ErrorProps) => {
  return (
    <MessageWrapper category={category}>
      <>
        {category === "STANDINGS" ? (
          <CategoryMessage>리그별 팀 순위</CategoryMessage>
        ) : category === "TOPSCORERS" ? (
          <CategoryMessage>리그별 득점자 순위</CategoryMessage>
        ) : (
          ""
        )}
        <Message>
          {error === null
            ? "새 시즌을 준비 중입니다 :) 다른 리그를 확인해 보세요!"
            : "예상치 못한 오류가 발생했어요 :( 다시 시도해 주세요."}
        </Message>
      </>
    </MessageWrapper>
  );
};

export default ErrorMessage;
