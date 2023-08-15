import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BoardCard from "../../../ui/BoardCard";
import Button from "../../atoms/Button";

const ErrorMessage = styled.section`
  width: 20%;
  height: 20vh;
  margin: 15rem auto;
  text-align: center;
`;

const NoPostMessage = ({ category }: { category: string }) => {
  const navigate = useNavigate();

  const errorTargetPostHandler = () => {
    if (category.includes("play")) navigate("/play");
    else navigate("/half-time");
  };

  return (
    <BoardCard>
      <ErrorMessage>
        <span>해당하는 게시글이 없습니다 :( </span>
        <Button
          type="button"
          backgroundColor="#75C2F6"
          onClick={errorTargetPostHandler}
        >
          뒤로가기
        </Button>
      </ErrorMessage>
    </BoardCard>
  );
};

export default NoPostMessage;
