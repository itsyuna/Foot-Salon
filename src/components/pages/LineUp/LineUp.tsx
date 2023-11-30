import styled from "styled-components";
import { useState } from "react";

import Card from "../../../ui/Card";
import FootballVideo from "../../organisms/FootballVideo";
import Input from "../../atoms/Input";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const Title = styled.h2`
  margin: 20px;
  text-align: center;
  font-family: "Orelega One", cursive;

  span {
    color: #ff1700;
  }

  ${media.small`
    font-size: 1.1rem;
  `}
`;

const SearchWrapper = styled.section`
  margin-top: 2.5rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  input {
    font-size: 0.9rem;
  }

  ${media.small`
    font-size: 0.5rem;
    flex-direction: column;

    input {
      width: 60%;
      height: 2vh;
      font-size: 0.6rem;
    }
  `}

  ${media.medium`
    font-size: 0.6rem;
    margin-top: 2.5rem;

    input {
      width: 35%;
      font-size: 0.7rem;
    }
  `}
`;

const GuideText = styled.p`
  font-weight: 500;
`;

const LineUp = () => {
  let [userInput, setUserInput] = useState<string>("");

  let searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <Card>
      <header>
        <Title>
          All Football matches <span>Line-up</span>
        </Title>
        <SearchWrapper>
          <Input
            type="text"
            placeholder="대,소문자 구분 없이 팀을 입력해주세요 :)"
            value={userInput}
            onChange={searchHandler}
            width="35%"
            height="3vh"
          />
          <GuideText>
            영상 클릭 시 해당 링크로 이동합니다!😉 (*경기 시간: 한국 시간 기준)
          </GuideText>
        </SearchWrapper>
      </header>
      <FootballVideo userInput={userInput} />
    </Card>
  );
};

export default LineUp;
