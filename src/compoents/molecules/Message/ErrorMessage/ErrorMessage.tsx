import styled from "styled-components";

const MessageWrapper = styled.div<{ category?: string }>`
  font-family: "Gowun Dodum", sans-serif;
  width: 100%;
  height: ${({ category }) => (category === "VIDEO" ? "70%" : "90%")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageBox = styled.div`
  text-align: center;
`;

const CategoryMessage = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
  color: #1b9c85;
  margin: 0;
`;

const Message = styled.p`
  font-weight: 800;
`;

interface Error {
  category?: string;
  error: null;
}

const ErrorMessage = ({ category, error }: Error) => {
  return (
    <MessageWrapper category={category}>
      {error !== null ? (
        <MessageBox>
          {category === "TABLE" ? (
            <CategoryMessage>리그별 팀 순위</CategoryMessage>
          ) : category === "TRANSFER" ? (
            <CategoryMessage>리그별 이적 현황</CategoryMessage>
          ) : (
            ""
          )}
          <Message>
            예상치 못한 오류가 발생했어요 :( 다시 시도해 주세요.
          </Message>
        </MessageBox>
      ) : (
        <MessageWrapper>
          <MessageBox>
            <CategoryMessage>리그별 이적 현황</CategoryMessage>
            <Message>
              이적 시장 기간이 아니거나, 이적이 아직 이루어지지 않았습니다.
            </Message>
            <Message>다른 리그를 확인해 보세요!</Message>
          </MessageBox>
        </MessageWrapper>
      )}
    </MessageWrapper>
  );
};

export default ErrorMessage;
