import styled from "styled-components";
import React, { useState } from "react";
import { useAppSelector } from "../../../store";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase/config";

import { CommentListItems } from "../Comments/Comments";
import { getDate } from "../../../utils/date";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { toast } from "react-toastify";

const CommentBox = styled.ul`
  width: 100%;
  height: 8vh;
  display: block;
`;

const NicknameDate = styled.section`
  width: 100%;
  display: flex;
  jutify-content: left;
  align-items: center;
  height: 40%;

  li {
    width: auto;
    height: 2vh;
    line-height: 2vh;
    padding: 0.3rem;
    border-radius: 10px;
  }

  li:nth-child(1) {
    background-color: #ffd4b2;
    margin-right: 1rem;
    font-size: 1.2rem;
  }
  li:nth-child(2) {
    background-color: #f3e9dd;
  }
`;

const FirstComment = styled.li`
  margin-left: 0.2rem;
  color: #fc2947;
`;

const EditText = styled.li`
  margin-left: 0.2rem;
  color: #30aadd;
`;

const ContentBox = styled.section`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Comment = styled.li`
  background-color: #dbdfea;
  width: 90%;
  height: 4.5vh;
  line-height: 4.5vh;
  overflow: auto;
  white-space: normal;
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
  const [isEdit, setIsEdit] = useState(false);

  const userId = useAppSelector((state) => state.user.uid);
  const userNickname = useAppSelector((state) => state.user.nickname);

  const editCommentItems = {
    creatorId: userId,
    userNickname,
    contents: commentInput,
    createdAt: getDate(),
    dateTime: list.comment.dateTime,
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
        list.id
      );

      await updateDoc(editCommentRef, editCommentItems);

      setIsEdit(true);
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
        <NicknameDate>
          <li>{list.comment.userNickname}</li>
          <li>{list.comment.createdAt}</li>
          {idx === 0 && <FirstComment>첫 댓글</FirstComment>}
          {isEdit && <EditText>수정됨</EditText>}
        </NicknameDate>
        <ContentBox>
          {editComment ? (
            <form onSubmit={editCommentSubmitHandler}>
              <Input
                type="text"
                width="50vw"
                height="4vh"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <>
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
              </>
            </form>
          ) : (
            <>
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
                    onClick={() => deleteCommentHandler(list.id)}
                    backgroundColor="#FFC7C7"
                    border="#FFC7C7"
                    margin="0"
                  >
                    삭제
                  </Button>
                </>
              )}
            </>
          )}
        </ContentBox>
      </CommentBox>
    </>
  );
};

export default React.memo(CommentItem);
