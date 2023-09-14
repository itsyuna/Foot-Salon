import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CollectionReference,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "../firebase/config";
import { CommentsProps } from "../components/organisms/Comments/Comments";

interface CommentItemProps {
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

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ category, boardId }: CommentsProps) => {
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

    return commentData;
  }
);

const initialCommentsState: CommentListItems[] = [];

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    commentsArray: initialCommentsState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.commentsArray = action.payload;
    });
  },
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
