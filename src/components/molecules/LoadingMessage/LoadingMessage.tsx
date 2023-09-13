import styled from "styled-components";
import { CirclesWithBar } from "react-loader-spinner";

const LoadingWrapper = styled.section<{ size: string }>`
  font-family: "Gowun Dodum", sans-serif;
  margin: ${({ size }) => (size === "medium" ? "20% 40%" : "5% 40%")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LoadingText = styled.h2`
  width: 15vw;
  color: #f45050;
  margin: 10px 0;
`;

const Message = styled.p`
  width: 13vw;
  font-size: 1.2rem;
  font-weight: 900;
  margin: 10px 0;
`;

interface LoadingContents {
  contents: string;
  size: string;
}

const LoadingMessage = ({ contents, size }: LoadingContents) => {
  return (
    <LoadingWrapper size={size}>
      <LoadingText>⚽️{contents} 로딩중⚽️</LoadingText>
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
      <Message>잠시만 기다려주세요 :)</Message>
    </LoadingWrapper>
  );
};

export default LoadingMessage;
