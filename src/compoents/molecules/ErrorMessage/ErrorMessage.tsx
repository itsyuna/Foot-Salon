import styled from "styled-components";

const MessageWrapper = styled.section<{ category?: string }>`
  font-family: "Gowun Dodum", sans-serif;
  width: 100%;
  height: ${({ category }) => (category === "VIDEO" ? "70%" : "90%")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryMessage = styled.h2`
  color: #1b9c85;
  margin: 0;
`;

const Message = styled.p`
  font-weight: 800;
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
