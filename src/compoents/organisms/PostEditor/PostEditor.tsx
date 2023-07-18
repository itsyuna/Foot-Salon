import styled from "styled-components";
import BoardCard from "../../../ui/BoardCard/BoardCard";
import Select from "../../atoms/Select/Select";
import { useAppDispatch, useAppSelector } from "../../../store";
import Input from "../../atoms/Input/Input";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { getDate } from "../../../utils/date";
import { ErrorText } from "../../pages/SignUp/SignUp";
import React, { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "../../../firebase/config";
import { BoardList, fetchPlayBoard } from "../../../store/playBoard";
import PostFooter from "../../molecules/PostFooter/PostFooter";

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
  margin: 0 auto;
  border: 1px solid red;
`;
const UploadImage = styled.img`
  width: 20%;
  height: 50%;
`;

export interface BoardFormData {
  league: string;
  title: string;
  contents: string;
}

type UploadFile = string | ArrayBuffer | null | undefined;

const optionList = [
  "리그를 선택해 주세요.",
  "K LEAGUE",
  "EPL",
  "LALIGA",
  "SERIE A",
  "LIGUE 1",
  "BUNDESRIGA",
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

        // setAttachment("");
        alert("작성 완료!");
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const {
      target: { files },
    } = e;
    if (files !== null) {
      const theFile = files[0];
      const reader = new FileReader();
      console.log(reader);

      reader.onloadend = (finishedEvent) => {
        console.log(finishedEvent);

        const uploadFile: UploadFile = finishedEvent.target?.result;

        if (uploadFile) {
          setAttachment(uploadFile.toString());
        }
      };
      reader.readAsDataURL(theFile);
    }
  };

  console.log(attachment);

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
  // console.log(no);

  let data = useAppSelector((state) =>
    boardCategory === `/updatePlay/${no}`
      ? state.playBoard.boardArray
      : state.halfTimeBoard.boardArray
  );
  // console.log(data);

  let targetPost: BoardList | undefined;
  if (isEdit) {
    if (data.length >= 1) {
      targetPost = data.find((item, idx) => +data.length - idx === +no);

      if (!targetPost) {
        alert("없는 게시글입니다.");
        navigate(boardCategory === `/play/${no}` ? "/play" : "/half-time", {
          replace: true,
        });
      }
    }
  }

  console.log(isEdit);
  console.log(targetPost);

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
                defaultValue=""
                name="league"
                rules={{
                  required: "필수 입력사항입니다.",
                }}
                render={({ field }) => (
                  <Select
                    option={optionList}
                    backgroundColor="#f6edd9"
                    color="#379237"
                    border="#7a9972"
                    onChange={field.onChange}
                    defaultValue={targetPost?.board.league}
                    key={targetPost?.board.league}
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
                defaultValue=""
                name="title"
                rules={{
                  required: "필수 입력사항입니다.",
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="글의 제목을 입력해주세요."
                    width="100%"
                    height="3.5vh"
                    onChange={field.onChange}
                    defaultValue={targetPost?.board.title}
                    key={targetPost?.board.title}
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
              defaultValue=""
              name="contents"
              rules={{
                required: "필수 입력사항입니다.",
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
              <UploadImage src={attachment} alt="attachment"></UploadImage>
              <button onClick={clearAttachmentHandler}>Clear</button>
            </UploadImageBox>
          )}
        </section>
        <PostFooter />
      </form>
    </BoardCard>
  );
};

export default PostEditor;
