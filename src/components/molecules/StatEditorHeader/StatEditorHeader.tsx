import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../../atoms/Button/Button";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const HeaderWrapper = styled.header`
  font-family: "Bebas Neue", sans-serif;
  width: 60%;
  height: 10%;
  margin: 1rem auto;
  border-bottom: 1px solid lightgray;

  button {
    font-size: 0.9rem;
    margin: 0;
  }

  ${media.small`
    width: 85%;
    font-size: 0.7rem;
  
    h3 {
      font-size: 0.8rem;
    }

    button {
      font-size: 0.7rem;
      width: 3.2rem;
      height: 2.5vh;
    }  
  `}

  ${media.medium`
    font-size: 0.8rem;
    
    h3 {
      font-size: 0.9rem;
    }

    button {
      font-size: 0.8rem;
      width: 3.5rem;
      height: 2.8vh;
    }  
  `}
`;

const HeadtextBox = styled.h3`
  width: 100%;
  margin: 0;
  text-align: center;
`;

const StatEditorHeader = ({ headText }: { headText: string }) => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Button
        type="button"
        backgroundColor="#FFD36E"
        border="#FEB139"
        width="4rem"
        onClick={() => navigate(-1)}
      >
        뒤로 가기
      </Button>
      <HeadtextBox>{headText}</HeadtextBox>
    </HeaderWrapper>
  );
};

export default StatEditorHeader;
