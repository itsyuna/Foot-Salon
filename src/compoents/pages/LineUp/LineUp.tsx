import styled from "styled-components";
import { MainWrapper } from "../../../App";
import Card from "../../../ui/Card/Card";
import FootballVideo from "../../organisms/FootballVideo";
import Input from "../../atoms/Input/Input";
import { useState } from "react";

const Title = styled.h1`
  margin: 20px;
  text-align: center;
`;

const SearchWrapper = styled.div`
  height: 4vh;
  text-align: center;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const GuideText = styled.p`
  font-weight: 500;
  margin-top: 2.3rem;
`;

const LineUp = () => {
  let [userInput, setUserInput] = useState<string>("");

  let searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <MainWrapper>
      <Card>
        <section>
          <Title>All Football matches Line-up</Title>
          <SearchWrapper>
            <Input
              type="text"
              placeholder="대,소문자 구분 없이 팀을 입력해주세요 :)"
              value={userInput}
              onChange={searchHandler}
              autoComplete="off"
              width="15vw"
              height="4vh"
            />
            <GuideText>
              영상 클릭시 해당 링크로 이동합니다!😉 (*경기시간: 현지 시간 기준)
            </GuideText>
          </SearchWrapper>
        </section>
        <FootballVideo userInput={userInput} />
      </Card>
    </MainWrapper>
  );
};

export default LineUp;
