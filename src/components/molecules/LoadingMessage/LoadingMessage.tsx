import styled, { css } from "styled-components";
import { CirclesWithBar } from "react-loader-spinner";
import { media } from "../../../ui/MediaQuery/mediaQuery";

type LoadingSize = "small" | "medium" | "large";

const getLoadingSize = (size: LoadingSize) => {
  let loadingSize;

  switch (size) {
    case "small":
      loadingSize = "5% 40%";
      break;

    case "medium":
      loadingSize = "20% 40%";
      break;

    case "large":
      loadingSize = "10% 50%";
      break;

    default:
      return null;
  }

  return css`
    margin: ${loadingSize};
  `;
};

const LoadingWrapper = styled.section<{ size: LoadingSize }>`
  font-family: "Gowun Dodum", sans-serif;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ size }) => getLoadingSize(size)};
`;

const LoadingText = styled.p`
  width: 50vw;
  font-size: 0.9rem;
  font-weight: 900;
  color: #f45050;
  margin: 10px 0;

  ${media.large`
    font-size: 1.2rem;
  `}
`;

const Message = styled.p`
  width: 50vw;
  font-size: 0.7rem;
  font-weight: 900;
  margin: 10px 0;

  ${media.large`
    font-size: 0.9rem;
 `}
`;

interface LoadingContents {
  contents: string;
  size: LoadingSize;
}

const LoadingMessage = ({ contents, size }: LoadingContents) => {
  return (
    <LoadingWrapper size={size}>
      <LoadingText>⚽️{contents} 로딩 중⚽️</LoadingText>
      <CirclesWithBar
        height="50"
        width="40"
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
