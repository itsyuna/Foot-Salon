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

import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { getDate } from "../../../utils/date";
import CommentItem from "../CommentItem";
import { toast } from "react-toastify";

const CommentsWrapper = styled.article`
  width: 60vw;
  margin: 2rem 17rem;
`;

const CommentHeader = styled.header`
  display: flex;
  justify-content: left;
  align-items: center;

  h3 {
    margin-right: 0.5rem;
  }
`;

const WriteCommentBox = styled.section`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 1rem;

  button {
    margin-left: 1rem;
  }
`;

export interface CommentsProps {
  category: string;
  boardId: string;
}

export interface CommentItemProps {
  commentId: string;
  contents: string;
  createdAt: string;
  creatorId: string;
  dateTime: number;
  userNickname: string;
}

export interface CommentListItems {
  id: string;
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
    } catch (error) {
      toast.error("오류가 발생했습니다 :(");
    } finally {
      setCommentInput("");
      fetchComments();
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
      id: list.id,
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
      <form onSubmit={commentSubmitHandler}>
        <WriteCommentBox>
          <Input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            width="90%"
            height="4vh"
          />
          <Button
            type="submit"
            margin="0"
            backgroundColor="#D9D7F1"
            border="#D9D7F1"
          >
            Write
          </Button>
        </WriteCommentBox>
      </form>
      <section>
        {showComments.map((list, idx) => (
          <CommentItem
            key={list.id}
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
