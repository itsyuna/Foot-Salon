import styled, { css } from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store";
import { CommentListItems, fetchComments } from "../../../store/comments";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../../firebase/config";

import { CommentFormData } from "../Comments/Comments";
import { getDate } from "../../../utils/date";
import Button from "../../atoms/Button";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const CommentBox = styled.section`
  width: 100%;
  height: 100%;
  display: block;
  margin: 1.6rem 0 1.7rem; 0;

  ${media.small`
    margin-bottom: 1.3rem;
  `}
`;

const NicknameDate = styled.header<{ editComment: boolean }>`
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
  }

  h4 {
    background-color: #f3e9dd;
  }

  ${media.small`
    h3,h4 {
      height: 1.5vh;
      line-height: 1.5vh;
    }
    
    h3 {
      font-size: 0.7rem;
      margin-right: 0.3rem;
    }

    h4,span {
      font-size: 0.6rem;
    } 
  `}
`;

const FirstComment = styled.span`
  margin: 0;
  margin-left: 0.5rem;
  color: #fc2947;
`;

const EditText = styled.span`
  margin: 0;
  margin-left: 0.5rem;
  color: #30aadd;
`;

const CommentButton = styled.section`
  width: 55vw;
  display: flex;
  justify-content: space-between;
`;

const ContentBox = styled.section`
  width: 90%;
  height: auto;

  display: flex;
  justify-content: left;
  align-items: center;
`;

const ButtonBox = styled.section`
  width: 10%;
  text-align: center;

  ${media.small`
    button {
      margin-right: 0.1rem;
    }
  `}

  ${media.medium`
    button:first-child {
      margin-left: 0.5rem;
    }
  `}
`;

const Textarea = styled.textarea`
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 1rem;
  padding: 0.2rem;
  width: 50vw;
  height: auto;

  ${media.small`
    font-size: 0.6rem;
  `}

  ${media.medium`
    font-size: 0.8rem;
  `}
`;

const Comment = styled.section`
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 1rem;
  padding: 0.3rem;
  background-color: #dbdfea;
  width: 100%;
  height: auto;
  overflow: auto;
  white-space: pre-wrap;

  ${media.small`
    font-size: 0.6rem;
  `}

  ${media.medium`
    font-size: 0.8rem;
  `}
`;

interface ItemProps {
  list: CommentListItems;
  idx: number;
  boardId: string;
  category: string;
}

const CommentItem = ({ list, idx, boardId, category }: ItemProps) => {
  const [editComment, setEditComment] = useState(false);

  const userId = useAppSelector((state) => state.user.uid);
  const userNickname = useAppSelector((state) => state.user.nickname);

  const { register, handleSubmit } = useForm<CommentFormData>();

  const dispatch = useAppDispatch();

  const editCommentSubmitHandler = async (data: CommentFormData) => {
    const editCommentItems = {
      creatorId: userId,
      userNickname,
      contents: data.comment,
      createdAt: getDate(),
      dateTime: list.comment.dateTime,
      isEdit: true,
    };

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
      setEditComment(false);
      dispatch(fetchComments({ category, boardId }));
    } catch (error) {
      toast.error("오류가 발생했습니다 :(");
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
        dispatch(fetchComments({ category, boardId }));
      } catch (error) {
        toast.error("오류가 발생했습니다 :(");
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
          <form onSubmit={handleSubmit(editCommentSubmitHandler)}>
            <CommentButton>
              <ContentBox>
                <Textarea
                  {...register("comment", {
                    value: `${list.comment.contents}`,
                  })}
                />
              </ContentBox>
              <ButtonBox>
                <Button
                  type="submit"
                  backgroundColor="#B5DEFF"
                  border="#B5DEFF"
                  margin="0 0.2rem 0 0.7rem"
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
              </ButtonBox>
            </CommentButton>
          </form>
        ) : (
          <CommentButton>
            <ContentBox>
              <Comment>{list.comment.contents}</Comment>
            </ContentBox>
            {userId === list.comment.creatorId && (
              <ButtonBox>
                <Button
                  type="submit"
                  onClick={() => setEditComment(true)}
                  backgroundColor="#B5DEFF"
                  border="#B5DEFF"
                  margin="0 0.2rem 0"
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
              </ButtonBox>
            )}
          </CommentButton>
        )}
      </CommentBox>
    </>
  );
};

export default CommentItem;
