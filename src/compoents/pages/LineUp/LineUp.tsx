import styled from "styled-components";
import { useState } from "react";

import Card from "../../../ui/Card";
import FootballVideo from "../../organisms/FootballVideo";
import Input from "../../atoms/Input";

const Title = styled.h2`
  margin: 20px;
  text-align: center;
  font-family: "Orelega One", cursive;

  span {
    color: #ff1700;
  }
`;

const SearchWrapper = styled.section`
  height: 4vh;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
            width="15vw"
            height="4vh"
          />
          <GuideText>
            영상 클릭시 해당 링크로 이동합니다!😉 (*경기시간: 한국 시간 기준)
          </GuideText>
        </SearchWrapper>
      </header>
      <FootballVideo userInput={userInput} />
    </Card>
  );
};

export default LineUp;
