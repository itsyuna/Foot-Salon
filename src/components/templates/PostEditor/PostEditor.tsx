import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageService } from "../../../firebase/config";
import { fetchPlayBoard } from "../../../store/playBoard";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

import BoardCard from "../../../ui/BoardCard";
import Select from "../../atoms/Select";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { ErrorText } from "../../pages/SignUp/SignUp";
import PostFooter from "../../organisms/PostFooter";
import { getDate } from "../../../utils/date";
import NoPostMessage from "../../molecules/NoPostMessage";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const Form = styled.form`
  margin-top: 1rem;
  padding-right: 2rem;

  ${media.small`
    padding: 0;

    span {
      height: 3vh;
      line-height: 3vh;
    }
    
    input {
      width: 90%;
      height: 2.8vh;
    }

    textarea {
      width: 85%;
    }

    button,input {
      font-size: 0.7rem;
    }
  `}

  ${media.medium`
    input {
      height: 3vh;
    }

    button {
      font-size: 0.9rem;
    } 
  `}
`;

export const CategoryBox = styled.section`
  width: 70%;
  margin: 0 auto 1.5rem;

  display: grid;
  grid-template-columns: 1fr 5fr;
  font-size: 0.9rem;

  input {
    text-align: left;
    padding-left: 0.5rem;
  }

  p {
    font-size: 70%;

    ${media.small`
      font-size: 50%;
    `}

    ${media.medium`
      font-size: 60%;
    `}
  }

  select,
  input {
    font-size: 0.9rem;
  }

  ${media.small`
    font-size: 0.7rem;

    select,input {
      font-size: 0.7rem;
    }

    select {
      height: 3vh;
    }

    span {
      height: 3vh;
      line-height: 3vh;
    }

    width: 80%;
  `}

  ${media.medium`
    font-size: 0.8rem;

    select,input {
      font-size: 0.8rem;
    }

    span {
      height: 3.5vh;
      line-height: 3.5vh;
    }

    select {
      height: 3.5vh;
    }
  `}
`;

export const CategoryName = styled.span`
  text-align: center;
  width: 100%;
  height: 4vh;
  line-height: 4vh;
  background-color: #d9d9d9;
`;

export const CategoryData = styled.span`
  margin-left: 2rem;
  width: 95%;
  height: 4vh;
  line-height: 4vh;

  ${media.small`
    margin-left: 1rem;
  `}
`;

const UserNickname = styled(CategoryData)`
  color: #5800ff;
`;

export const BoardContents = styled.section`
  width: 70%;
  height: 30vh;
  margin: 0 auto 2rem;
  font-size: 0.9rem;

  display: grid;
  grid-template-columns: 1fr 5fr;

  p {
    font-size: 70%;
  }

  ${media.small`
    width: 80%;

    span:first-child {
      height: 3vh;
      line-height: 3vh;
    }

    p {
      font-size: 39%;
    }
  `}

  ${media.medium`
    span:first-child {
      height: 3.5vh;
      line-height: 3.5vh;
    }

    p {
      font-size: 53%;
    }
  `}
`;

export const ContentBox = styled.div`
  text-align: center;
`;

export const CategoryContent = styled.span`
  display: block;
  width: 100%;
  height: 4vh;
  line-height: 4vh;
  background-color: #d9d9d9;
  margin: 0;

  ${media.small`
    font-size: 0.7rem;
  `}

  ${media.medium`
    font-size: 0.8rem;
  `}
`;

const TextArea = styled.textarea`
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 0.9rem;
  width: 95%;
  height: 100%;
  padding: 0.5rem;
  margin-left: 2rem;

  ${media.small`
    font-size: 0.7rem;

    margin-left: 1rem;
  `}

  ${media.medium`
    font-size: 0.8rem;
  `}
`;

const FileWrapper = styled.section`
  width: 70%;
  margin: 0 auto;
  margin-top: 1rem;

  ${media.small`
    width: 80%;
  `}
`;

const UploadImageBox = styled.div`
  width: 70%;
  margin: 0.5rem auto 0;

  display: flex;
  justify-content: left;
  align-items: center;

  ${media.small`
    width: 80%;
  `}
`;

export interface BoardFormData {
  league: string;
  title: string;
  contents: string;
}

type UploadFile = string | ArrayBuffer | null | undefined;

const optionList = [
  { value: "choose-league", name: "리그를 선택해 주세요." },
  { value: "K LEAGUE", name: "K LEAGUE" },
  { value: "EPL", name: "EPL" },
  { value: "LA LIGA", name: "LA LIGA" },
  { value: "SERIE A", name: "SERIE A" },
  { value: "LIGUE 1", name: "LIGUE 1" },
  { value: "BUNDESRIGA", name: "BUNDESRIGA" },
];

const PostEditor = ({ isEdit }: { isEdit: boolean }) => {
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const userNickname = useAppSelector((state) => state.user.nickname);

  const userId = useAppSelector((state) => state.user.uid);

  const navigate = useNavigate();

  const location = useLocation();
  const boardCategory = location.pathname;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BoardFormData>();

  const onSubmit = async (data: BoardFormData) => {
    if (data.league === "choose-league") {
      toast.warn("리그를 선택해 주세요 :)");
      return;
    }

    if (window.confirm("제출하시겠습니까?")) {
      let fileURL = "";

      if (attachment !== "") {
        const fileRef = ref(
          storageService,
          boardCategory === "/play/new" || boardCategory === `/updatePlay/${no}`
            ? `play/${uuidv4()}`
            : `half-time/${uuidv4()}`
        );
        const response = await uploadString(fileRef, attachment, "data_url");
        fileURL = await getDownloadURL(response.ref);
      }

      const postItems = {
        creatorId: userId,
        userNickname,
        league: data.league,
        title: data.title,
        contents: data.contents,
        createdAt: isEdit ? targetPost?.board.createdAt : getDate(),
        lastEditTime: isEdit ? getDate() : "",
        dateTime: isEdit ? targetPost?.board.dateTime : Timestamp.now().seconds,
        fileURL,
      };

      try {
        if (isEdit && targetPost) {
          await updateDoc(
            doc(
              dbService,
              boardCategory === `/updatePlay/${no}` ? "play" : "half-time",
              `${targetPost.id}`
            ),
            postItems
          );
        } else {
          await addDoc(
            collection(
              dbService,
              boardCategory === "/play/new" ? "play" : "half-time"
            ),
            postItems
          );
        }

        isEdit ? toast.success("수정 완료!") : toast.success("작성 완료!");
        boardCategory === "/play/new" || boardCategory === `/updatePlay/${no}`
          ? navigate("/play")
          : navigate("/half-time");
      } catch (error) {
        isEdit ? toast.error("수정 오류 :(") : toast.error("작성 오류 :(");
      }
    }
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files !== null) {
      const theFile = files[0];
      const reader = new FileReader();

      reader.onloadend = (finishedEvent) => {
        const uploadFile: UploadFile = finishedEvent.target?.result;

        if (uploadFile) {
          setAttachment(uploadFile.toString());
        }
      };
      reader.readAsDataURL(theFile);
    }
  };

  const clearAttachmentHandler = () => {
    setAttachment("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlayBoard());
  }, [dispatch]);

  let { no } = useParams() as { no: string };

  let targetPost = location.state;

  return isEdit && !targetPost ? (
    <NoPostMessage />
  ) : (
    <BoardCard>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <CategoryBox>
            <CategoryName>작성자</CategoryName>
            <UserNickname>{userNickname}</UserNickname>
          </CategoryBox>
          <CategoryBox>
            <CategoryName>리그</CategoryName>
            <CategoryData>
              <Controller
                control={control}
                defaultValue={targetPost?.board.league}
                name="league"
                rules={{
                  ...(!isEdit && {
                    required: "필수 입력사항입니다.",
                  }),
                }}
                render={({ field }) => (
                  <Select
                    option={optionList}
                    onChange={field.onChange}
                    defaultValue={targetPost?.board.league}
                    backgroundColor="#f6edd9"
                    color="#379237"
                    border="#7a9972"
                  ></Select>
                )}
              />
            </CategoryData>
            <ErrorText>{errors.league && errors.league.message}</ErrorText>
          </CategoryBox>
          <CategoryBox>
            <CategoryName>제목</CategoryName>
            <CategoryData>
              <Controller
                control={control}
                defaultValue={targetPost?.board.title}
                name="title"
                rules={{
                  ...(!isEdit && {
                    required: "필수 입력사항입니다.",
                  }),
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="글의 제목을 입력해주세요."
                    onChange={field.onChange}
                    defaultValue={targetPost?.board.title}
                    width="100%"
                    height="3.5vh"
                  />
                )}
              />
            </CategoryData>
            <ErrorText>{errors.title && errors.title.message}</ErrorText>
          </CategoryBox>
          <BoardContents>
            <ContentBox>
              <CategoryContent>내용</CategoryContent>
              <ErrorText>
                {errors.contents && errors.contents.message}
              </ErrorText>
            </ContentBox>
            <Controller
              control={control}
              defaultValue={targetPost?.board.contents}
              name="contents"
              rules={{
                ...(!isEdit && {
                  required: "필수 입력사항입니다.",
                }),
              }}
              render={({ field }) => (
                <TextArea
                  defaultValue={targetPost?.board.contents}
                  onChange={field.onChange}
                  placeholder="내용을 입력해 주세요."
                />
              )}
            />
          </BoardContents>
          <FileWrapper>
            <input
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              ref={fileInput}
            />
          </FileWrapper>
          {attachment && (
            <UploadImageBox>
              <img src={attachment} alt="Upload preview" width="20%" />
              <Button
                type="button"
                onClick={clearAttachmentHandler}
                border="#76BA99"
              >
                Clear
              </Button>
            </UploadImageBox>
          )}
        </section>
        <PostFooter />
      </Form>
    </BoardCard>
  );
};

export default PostEditor;
