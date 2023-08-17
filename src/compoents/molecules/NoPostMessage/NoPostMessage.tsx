import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Card from "../../../ui/Card";
import Button from "../../atoms/Button";

const ErrorMessage = styled.section`
  font-family: "Do Hyeon", sans-serif;
  width: 20%;
  height: 20vh;
  margin: 15rem auto;
  text-align: center;
`;

const NoPostMessage = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <ErrorMessage>
        <span>해당하는 게시글이 없습니다 :( </span>
        <Button
          type="button"
          backgroundColor="#75C2F6"
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </Button>
      </ErrorMessage>
    </Card>
  );
};

export default NoPostMessage;
