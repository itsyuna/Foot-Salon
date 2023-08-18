import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../../atoms/Button/Button";

const HeaderWrapper = styled.header`
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.2rem;
  display: flex;
  width: 60%;
  height: 11%;
  margin: 0 auto;
  border-bottom: 1px solid lightgray;
`;

const HeadtextBox = styled.div`
  margin: 1rem auto;
  padding: 0.7rem;
`;

const StatEditorHeader = ({ headText }: { headText: string }) => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Button
        type="button"
        backgroundColor="#FFD36E"
        border="#FEB139"
        width="5rem"
        onClick={() => navigate(-1)}
      >
        뒤로가기
      </Button>
      <HeadtextBox>{headText}</HeadtextBox>
    </HeaderWrapper>
  );
};

export default StatEditorHeader;
