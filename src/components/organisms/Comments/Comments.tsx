import styled from "styled-components";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchComments } from "../../../store/comments";
import { dbService } from "../../../firebase/config";
import { doc, setDoc, Timestamp, collection } from "firebase/firestore";

import Button from "../../atoms/Button";
import { getDate } from "../../../utils/date";
import CommentItem from "../CommentItem";

const CommentsWrapper = styled.article`
  width: 70%;
  margin: 0px auto;
`;

const CommentHeader = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;

  h3 {
    margin-right: 0.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 1rem;

  button {
    margin-left: 1rem;
  }
`;

export const Textarea = styled.textarea`
  font-family: "Gowun Dodum", sans-serif;
  font-size: 1.1rem;
  width: 50vw;
  height: 6vh;
`;

export interface CommentsProps {
  category: string;
  boardId: string;
}

export interface CommentFormData {
  comment: string;
}

const Comments = ({ category, boardId }: CommentsProps) => {
  const userNickname = useAppSelector((state) => state.user.nickname);
  const userId = useAppSelector((state) => state.user.uid);

  const { register, handleSubmit, setFocus, reset } =
    useForm<CommentFormData>();

  const dispatch = useAppDispatch();

  const commentsData = useAppSelector((state) => state.comments.commentsArray);

  const commentSubmitHandler = async (data: CommentFormData) => {
    if (data.comment.length === 0) {
      toast.warn("댓글을 입력해 주세요!");
      setFocus("comment");
      return;
    }

    const commentItems = {
      creatorId: userId,
      userNickname,
      contents: data.comment,
      createdAt: getDate(),
      dateTime: Timestamp.now().seconds,
      isEdit: false,
    };

    try {
      const commentRef = doc(
        collection(
          dbService,
          category.includes("play") ? "play" : "half-time",
          boardId,
          "comments"
        )
      );

      await setDoc(commentRef, commentItems);

      toast.success("댓글 작성 완료!");
      reset();
      dispatch(fetchComments({ category, boardId }));
    } catch (error) {
      toast.error("오류가 발생했습니다 :(");
    }
  };

  useEffect(() => {
    dispatch(fetchComments({ category, boardId }));
  }, [dispatch, category, boardId]);

  return (
    <CommentsWrapper>
      <CommentHeader>
        <h3>🔻Comments</h3>
        <h3>({commentsData.length})</h3>
      </CommentHeader>
      <Form onSubmit={handleSubmit(commentSubmitHandler)}>
        <Textarea {...register("comment")} />
        <Button
          type="submit"
          margin="0"
          backgroundColor="#D9D7F1"
          border="#D9D7F1"
        >
          Write
        </Button>
      </Form>
      <section>
        {commentsData.map((list, idx) => (
          <CommentItem
            key={list.commentId}
            idx={idx}
            list={list}
            boardId={boardId}
            category={category}
          />
        ))}
      </section>
    </CommentsWrapper>
  );
};

export default Comments;
