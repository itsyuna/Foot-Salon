import styled, { css } from "styled-components";
import React, { useState } from "react";
import { useAppSelector } from "../../../store";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase/config";

import { CommentListItems } from "../Comments/Comments";
import { getDate } from "../../../utils/date";
import Button from "../../atoms/Button";
import { toast } from "react-toastify";

const CommentBox = styled.section`
  width: 100%;
  height: 8vh;
  display: block;
  margin-bottom: 1.5rem;
`;

const NicknameDate = styled.section<{ editComment: boolean }>`
  width: 100%;
  height: 40%;
  display: flex;
  jutify-content: left;
  align-items: center;
  margin-bottom: 0.4rem;

  ${({ editComment }) =>
    editComment &&
    css`
      margin-bottom: 0.4rem;
    `}

  h3,
  h4 {
    width: auto;
    height: 2vh;
    line-height: 2vh;
    padding: 0.3rem;
    border-radius: 10px;
    margin: 0;
  }

  h3 {
    background-color: #ffd4b2;
    margin-right: 1rem;
    font-size: 1.2rem;
  }
  h4 {
    background-color: #f3e9dd;
  }
`;

const FirstComment = styled.h5`
  margin: 0;
  margin-left: 0.5rem;
  color: #fc2947;
`;

const EditText = styled.h5`
  margin: 0;
  margin-left: 0.5rem;
  color: #30aadd;
`;

const ContentBox = styled.section`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Textarea = styled.textarea`
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 1.1rem;
  padding: 0.2rem;
  width: 50vw;
  height: 5vh;
`;

const Comment = styled.section`
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 1.1rem;
  padding: 0.3rem;
  background-color: #dbdfea;
  width: 90%;
  height: 5vh;
  overflow: auto;
  white-space: pre-wrap;
`;

interface ItemProps {
  list: CommentListItems;
  idx: number;
  fetchComments: () => Promise<void>;
  boardId: string;
  category: string;
}

const CommentItem = ({
  list,
  idx,
  boardId,
  category,
  fetchComments,
}: ItemProps) => {
  const [commentInput, setCommentInput] = useState(list.comment.contents);
  const [editComment, setEditComment] = useState(false);

  const userId = useAppSelector((state) => state.user.uid);
  const userNickname = useAppSelector((state) => state.user.nickname);

  const editCommentItems = {
    creatorId: userId,
    userNickname,
    contents: commentInput,
    createdAt: getDate(),
    dateTime: list.comment.dateTime,
    isEdit: true,
  };

  const editCommentSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const editCommentRef = doc(
        dbService,
        category.includes("play") ? "play" : "half-time",
        boardId,
        "comments",
        list.commentId
      );

      await updateDoc(editCommentRef, editCommentItems);

      toast.success("수정 완료!");
    } catch (error) {
      console.log(error);
    } finally {
      setEditComment(false);
      fetchComments();
    }
  };

  const deleteCommentHandler = async (commentId: string) => {
    let confirm = window.confirm("댓글을 삭제하시겠습니까?");

    if (confirm) {
      const deleteRef = doc(
        dbService,
        category.includes("play") ? "play" : "half-time",
        boardId,
        "comments",
        commentId
      );

      try {
        await deleteDoc(deleteRef);
        toast.success("삭제 완료!");
      } catch (error) {
        toast.error("오류가 발생했습니다 :(");
      } finally {
        fetchComments();
      }
    }
  };

  return (
    <>
      <CommentBox>
        <NicknameDate editComment={editComment}>
          <h3>{list.comment.userNickname}</h3>
          <h4>{list.comment.createdAt}</h4>
          {idx === 0 && <FirstComment>첫 댓글</FirstComment>}
          {list.comment.isEdit && <EditText>수정됨</EditText>}
        </NicknameDate>

        {editComment ? (
          <form onSubmit={editCommentSubmitHandler}>
            <ContentBox>
              <Textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <Button
                type="submit"
                backgroundColor="#B5DEFF"
                border="#B5DEFF"
                margin="0 0.5rem 0"
              >
                수정 완료
              </Button>
              <Button
                type="button"
                onClick={() => setEditComment(false)}
                backgroundColor="#FFC7C7"
                border="#FFC7C7"
                margin="0"
              >
                취소
              </Button>
            </ContentBox>
          </form>
        ) : (
          <ContentBox>
            <Comment>{list.comment.contents}</Comment>
            {userId === list.comment.creatorId && (
              <>
                <Button
                  type="submit"
                  onClick={() => setEditComment(true)}
                  backgroundColor="#B5DEFF"
                  border="#B5DEFF"
                  margin="0 0.5rem 0"
                >
                  수정
                </Button>
                <Button
                  type="button"
                  onClick={() => deleteCommentHandler(list.commentId)}
                  backgroundColor="#FFC7C7"
                  border="#FFC7C7"
                  margin="0"
                >
                  삭제
                </Button>
              </>
            )}
          </ContentBox>
        )}
      </CommentBox>
    </>
  );
};

export default React.memo(CommentItem);
