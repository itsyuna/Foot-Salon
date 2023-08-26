import styled from "styled-components";
import { CirclesWithBar } from "react-loader-spinner";

const SpinnerWrapper = styled.div<{ size: string }>`
  font-family: "Gowun Dodum", sans-serif;
  margin: ${({ size }) => (size === "medium" ? "20% 40%" : "5% 40%")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  text-align: center;
  width: 20vw;
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
  color: #f45050;
  font-weight: 900;
  margin: 10px 0 10px 0;
`;

const LoadingMessageWrapper = styled.div`
  text-align: center;
  width: 20vw;
`;

const Message = styled.p`
  font-size: 1.2rem;
  font-weight: 900;
  margin-top: 10px;
`;

interface LoadingContents {
  contents: string;
  size: string;
}

const LoadingMessage = ({ contents, size }: LoadingContents) => {
  return (
    <SpinnerWrapper size={size}>
      <LoadingWrapper>
        <LoadingText>⚽️{contents} 로딩중⚽️</LoadingText>
      </LoadingWrapper>
      <CirclesWithBar
        height="50"
        width="50"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
      <LoadingMessageWrapper>
        <Message>잠시만 기다려주세요 :)</Message>
      </LoadingMessageWrapper>
    </SpinnerWrapper>
  );
};

export default LoadingMessage;
