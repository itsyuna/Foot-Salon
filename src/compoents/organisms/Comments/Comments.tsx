import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../store";
import { dbService } from "../../../firebase/config";
import {
  doc,
  setDoc,
  Timestamp,
  collection,
  CollectionReference,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

import Button from "../../atoms/Button";
import { getDate } from "../../../utils/date";
import CommentItem from "../CommentItem";
import { toast } from "react-toastify";

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

export interface CommentItemProps {
  creatorId: string;
  userNickname: string;
  contents: string;
  createdAt: string;
  dateTime: number;
  isEdit: boolean;
}

export interface CommentListItems {
  commentId: string;
  comment: CommentItemProps;
}

const Comments = ({ category, boardId }: CommentsProps) => {
  const [commentInput, setCommentInput] = useState("");
  const userNickname = useAppSelector((state) => state.user.nickname);

  const userId = useAppSelector((state) => state.user.uid);

  const commentItems = {
    creatorId: userId,
    userNickname,
    contents: commentInput,
    createdAt: getDate(),
    dateTime: Timestamp.now().seconds,
    isEdit: false,
  };

  const commentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      setCommentInput("");
      fetchComments();
    } catch (error) {
      toast.error("오류가 발생했습니다 :(");
    }
  };

  const [showComments, setShowComments] = useState<CommentListItems[]>([]);

  const fetchComments = useCallback(async () => {
    const collectData = query(
      collection(
        dbService,
        category.includes("play") ? "play" : "half-time",
        boardId,
        "comments"
      ) as CollectionReference<CommentItemProps>,
      orderBy("dateTime", "asc")
    );
    const querySnapshot = await getDocs(collectData);

    let commentData = querySnapshot.docs.map((list) => ({
      commentId: list.id,
      comment: list.data(),
    }));

    setShowComments(commentData);
  }, [boardId, category]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <CommentsWrapper>
      <CommentHeader>
        <h3>🔻Comments</h3>
        <h3>({showComments.length})</h3>
      </CommentHeader>
      <Form onSubmit={commentSubmitHandler}>
        <Textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
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
        {showComments.map((list, idx) => (
          <CommentItem
            key={list.commentId}
            idx={idx}
            list={list}
            fetchComments={fetchComments}
            boardId={boardId}
            category={category}
          />
        ))}
      </section>
    </CommentsWrapper>
  );
};

export default Comments;
