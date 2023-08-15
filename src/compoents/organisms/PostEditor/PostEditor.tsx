import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
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
import PostFooter from "../PostFooter";
import { getDate } from "../../../utils/date";

export const CategoryBox = styled.div`
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-top: 1.5rem;
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
`;

export const BoardContents = styled.div`
  width: 70%;
  height: 30vh;
  margin: 0 auto;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

export const ContentBox = styled.div`
  text-align: center;
`;

export const CategoryContent = styled.p`
  text-align: center;
  width: 100%;
  height: 4vh;
  line-height: 4vh;
  background-color: #d9d9d9;
  margin: 0;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 100%;
  margin-left: 2rem;
`;

const FileWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 1rem;
`;

const UploadImageBox = styled.div`
  width: 70%;
  margin: 0.5rem auto 0;
  display: flex;
  justify-content: left;
  align-items: center;
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
      alert("리그를 선택해 주세요 :)");
      return;
    }

    if (window.confirm("제출하시겠습니까?")) {
      let fileURL = "";
      if (attachment !== "") {
        const fileRef = ref(
          storageService,
          boardCategory === "/play/new"
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
        createdAt: getDate(),
        dateTime: Timestamp.now().seconds,
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

        alert("작성 완료!");
        boardCategory.includes("play" || "updatePlay")
          ? navigate("/play")
          : navigate("/half-time");
      } catch (error) {
        console.log(error);
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

  console.log(attachment);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlayBoard());
  }, [dispatch]);

  let { no } = useParams() as { no: string };

  let targetPost = location.state;
  if (isEdit && !targetPost) {
    alert("없는 게시글입니다.");
    navigate(boardCategory === `/play/${no}` ? "/play" : "/half-time", {
      replace: true,
    });
  }

  return (
    <BoardCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <CategoryBox>
            <CategoryName>작성자</CategoryName>
            <CategoryData>{userNickname}</CategoryData>
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
              <img src={attachment} alt="attachment" width="20%" />
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
      </form>
    </BoardCard>
  );
};

export default PostEditor;
