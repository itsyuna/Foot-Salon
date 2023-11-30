import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../store";
import { dbService } from "../../../firebase/config";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

import Card from "../../../ui/Card";
import StatEditorHeader from "../../molecules/StatEditorHeader";
import Select from "../../atoms/Select";
import { getDate } from "../../../utils/date";
import PostFooter from "../PostFooter/PostFooter";
import { emotionList } from "../../../utils/emotion";
import EmotionItem from "../../molecules/EmotionItem";
import Input from "../../atoms/Input";
import { ErrorText } from "../../pages/SignUp/SignUp";
import NoPostMessage from "../../molecules/NoPostMessage";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const StatEditorBox = styled.section`
  font-family: "Do Hyeon", sans-serif;
  font-size: 0.9rem;
  width: 60%;
  height: 75%;
  margin: 1rem auto;

  p {
    font-size: 0.7rem;
  }

  form section select:nth-child(1) {
    margin-right: 0.2rem;
  }

  form section select:nth-child(2) {
    margin-right: 0.5rem;
  }

  select,
  input,
  button,
  textarea {
    font-size: 0.9rem;
  }

  input {
    height: 2.2vh;
  }

  ${media.small`
    width: 85%;
    font-size: 0.7rem;

    p {
      font-size: 0.5rem;
    }

    select,input,button,textarea {
      font-size: 0.7rem;
    }

    form section select {
      height: 2.5vh;
      margin-right: 0;
    }

    input {
      height: 2vh;
    }

    button {
      height: 2.5vh;
    }

    textarea {
      height: 7vh;
    }
  `}

  ${media.medium`
    font-size: 0.8rem;

    p {
      font-size: 0.6rem;
    }

    select,input,button,textarea {
      font-size: 0.8rem;
    }

    form section select {
      height: 3vh;
    }

    form section select:nth-child(1) {
      margin-right: 0;
    }

    input {
      height: 2vh;
    }

    button {
      height: 3vh;
    }

    textarea {
      height: 8vh;
    }
  `}
`;

export const StatItemName = styled.div`
  width: 100%;
  height: 1.5rem;
  line-height: 1.6rem;
  text-align: center;
  background-color: #faf4b7;
  margin-bottom: 0.5rem;

  h4 {
    margin: 0.7rem 0;
  }
`;

export const SelectWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  select {
    height: 3.5vh;
  }

  p {
    margin: 0;
  }

  ${media.small`
    display: block;
    margin-bottom: 0.5rem;

    p {
      padding-top: 0.2rem;
      text-align: center;
    }
  `}
`;

const TeamMatchDate = styled.section`
  margin-bottom: 2rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const EmotionItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 2%;
`;

const ContentsBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  p {
    margin: 0;
    margin-left: 0.5rem;
    padding-top: 0.1rem;
  }
`;

const TextArea = styled.textarea`
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 1rem;
  padding: 0.3rem;
  width: 99%;
  height: 9vh;
`;

interface StatEditorProps {
  headText: string;
  isEdit: boolean;
}

export interface StatFormData {
  homeTeam: string;
  awayTeam: string;
  homeTeamResult: number;
  awayTeamResult: number;
  league: string;
  watchOption: string;
  matchDate: string;
  matchResult: string;
  contents: string;
}

const leagueOption = [
  {
    value: "choose-league",
    name: "리그를 선택해 주세요.",
  },
  { value: "K리그", name: "K리그" },
  { value: "해외 축구", name: "해외 축구" },
];

const watchOption = [
  {
    value: "choose-watchOption",
    name: "응원 장소를 선택해 주세요.",
  },
  { value: "집관 🏡", name: "집관 🏡" },
  { value: "직관 🏟", name: "직관 🏟" },
];

const StatEditor = ({ headText, isEdit }: StatEditorProps) => {
  const [emotion, setEmotion] = useState(2);

  const userNickname = useAppSelector((state) => state.user.nickname);
  const userId = useAppSelector((state) => state.user.uid);

  const today = getDate().slice(0, 10);
  const navigate = useNavigate();

  const location = useLocation();

  const targetPost = location.state;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StatFormData>();

  const onSubmit = async (data: StatFormData) => {
    if (data.league === "choose-league") {
      toast.warn("리그를 선택해 주세요 :)");
      return;
    } else if (data.watchOption === "choose-watchOption") {
      toast.warn("응원 장소를 선택해 주세요 :)");
      return;
    }

    if (window.confirm("제출하시겠습니까?")) {
      const statsItems = {
        creatorId: userId,
        userNickname,
        homeTeam: data.homeTeam,
        awayTeam: data.awayTeam,
        homeTeamResult: data.homeTeamResult,
        awayTeamResult: data.awayTeamResult,
        league: data.league,
        watchOption: data.watchOption,
        matchDate: data.matchDate,
        matchResult: emotion,
        contents: data.contents,
        createdAt: getDate(),
        dateTime: Timestamp.now().seconds,
        isStatEdit: isEdit ? true : false,
      };

      try {
        if (isEdit && targetPost) {
          await updateDoc(
            doc(dbService, "stats", `${targetPost.id}`),
            statsItems
          );
        } else {
          await addDoc(collection(dbService, "stats"), statsItems);
        }

        !isEdit
          ? toast.success("스탯이 추가되었습니다 😀")
          : toast.success("스탯이 수정되었습니다 🖍");
        navigate("/stats");
      } catch (error) {
        toast.error("오류가 발생했습니다 :(");
      }
    }
  };

  const emotionClickHandler = (emotion: number) => {
    setEmotion(emotion);
  };

  useEffect(() => {
    if (isEdit) setEmotion(targetPost?.stat.matchResult);
  }, [isEdit, targetPost?.stat.matchResult]);

  return isEdit && !targetPost ? (
    <NoPostMessage />
  ) : (
    <Card>
      <StatEditorHeader headText={headText} />
      <StatEditorBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectWrapper>
            <Controller
              control={control}
              defaultValue={targetPost?.stat.league}
              name="league"
              rules={{
                ...(!isEdit && {
                  required: "필수 입력사항입니다.",
                }),
              }}
              render={({ field }) => (
                <Select
                  option={leagueOption}
                  onChange={field.onChange}
                  defaultValue={targetPost?.stat.league}
                  backgroundColor="#ffe3e1"
                  color="#ff5151"
                  border="#f675a8"
                />
              )}
            />
            <Controller
              control={control}
              defaultValue={targetPost?.stat.watchOption}
              name="watchOption"
              rules={{
                ...(!isEdit && {
                  required: "필수 입력사항입니다.",
                }),
              }}
              render={({ field }) => (
                <Select
                  option={watchOption}
                  onChange={field.onChange}
                  defaultValue={targetPost?.stat.watchOption}
                  backgroundColor="#daeaf1"
                  border="#b2c8df"
                />
              )}
            />
            {errors.league || errors.watchOption ? (
              errors.league ? (
                <ErrorText>{errors.league && errors.league.message}</ErrorText>
              ) : (
                <ErrorText>
                  {errors.watchOption && errors.watchOption.message}
                </ErrorText>
              )
            ) : (
              ""
            )}
          </SelectWrapper>
          <TeamMatchDate>
            <section>
              <StatItemName>
                <h4>경기 날짜를 선택해 주세요.</h4>
              </StatItemName>
              <Controller
                control={control}
                defaultValue={isEdit ? targetPost?.stat.matchDate : today}
                name="matchDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    onChange={field.onChange}
                    defaultValue={isEdit ? targetPost?.stat.matchDate : today}
                  />
                )}
              />
            </section>
            <section>
              <StatItemName>
                <h4>경기팀을 적어주세요 ⚽️</h4>
              </StatItemName>
              <Controller
                control={control}
                defaultValue={targetPost?.stat.homeTeam}
                name="homeTeam"
                rules={{
                  ...(!isEdit && {
                    required: "필수 입력사항입니다.",
                  }),
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="홈 팀"
                    onChange={field.onChange}
                    defaultValue={targetPost?.stat.homeTeam}
                  />
                )}
              />
              vs
              <Controller
                control={control}
                defaultValue={targetPost?.stat.awayTeam}
                name="awayTeam"
                rules={{
                  ...(!isEdit && {
                    required: "필수 입력사항입니다.",
                  }),
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="원정 팀"
                    onChange={field.onChange}
                    defaultValue={targetPost?.stat.awayTeam}
                  />
                )}
              />
              {errors.homeTeam || errors.awayTeam ? (
                errors.homeTeam ? (
                  <ErrorText>
                    {errors.homeTeam && errors.homeTeam.message}
                  </ErrorText>
                ) : (
                  <ErrorText>
                    {errors.awayTeam && errors.awayTeam.message}
                  </ErrorText>
                )
              ) : (
                ""
              )}
            </section>
            <section>
              <StatItemName>
                <h4>경기 결과를 적어주세요.</h4>
              </StatItemName>
              <Controller
                control={control}
                defaultValue={targetPost?.stat.homeTeamResult}
                name="homeTeamResult"
                rules={{
                  ...(!isEdit && {
                    required: "필수 입력사항입니다.",
                  }),
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="홈 팀 결과"
                    onChange={field.onChange}
                    defaultValue={targetPost?.stat.homeTeamResult}
                  />
                )}
              />
              vs
              <Controller
                control={control}
                defaultValue={targetPost?.stat.awayTeamResult}
                name="awayTeamResult"
                rules={{
                  ...(!isEdit && {
                    required: "필수 입력사항입니다.",
                  }),
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="원정 팀 결과"
                    onChange={field.onChange}
                    defaultValue={targetPost?.stat.awayTeamResult}
                  />
                )}
              />
              {errors.homeTeamResult || errors.awayTeamResult ? (
                errors.homeTeamResult ? (
                  <ErrorText>
                    {errors.homeTeamResult && errors.homeTeamResult.message}
                  </ErrorText>
                ) : (
                  <ErrorText>
                    {errors.awayTeamResult && errors.awayTeamResult.message}
                  </ErrorText>
                )
              ) : (
                ""
              )}
            </section>
          </TeamMatchDate>
          <section>
            <StatItemName>
              <h4>승부 결과를 체크해 주세요!</h4>
            </StatItemName>
            <EmotionItemWrapper>
              {emotionList.map((item) => (
                <EmotionItem
                  key={item.emotionId}
                  onClick={emotionClickHandler}
                  isSelected={item.emotionId === emotion}
                  {...item}
                />
              ))}
            </EmotionItemWrapper>
          </section>
          <section>
            <ContentsBox>
              <div>
                <StatItemName>
                  <h4>오늘의 경기 기록</h4>
                </StatItemName>
              </div>
              <ErrorText>
                {errors.contents && errors.contents.message}
              </ErrorText>
            </ContentsBox>
            <Controller
              control={control}
              defaultValue={targetPost?.stat.contents}
              name="contents"
              rules={{
                ...(!isEdit && {
                  required: "필수 입력사항입니다.",
                }),
              }}
              render={({ field }) => (
                <TextArea
                  placeholder="경기 내용을 간단하게 적어주세요!"
                  onChange={field.onChange}
                  defaultValue={targetPost?.stat.contents}
                />
              )}
            />
          </section>
          <PostFooter />
        </form>
      </StatEditorBox>
    </Card>
  );
};

export default StatEditor;
