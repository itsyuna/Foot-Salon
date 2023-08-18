import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CollectionReference,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "../firebase/config";

export interface BoardContents {
  creatorId: string;
  userNickname: string;
  league: string;
  title: string;
  contents: string;
  createdAt: string;
  dateTime: number;
  fileURL: string;
}

export interface BoardListItems {
  id: string;
  board: BoardContents;
}

export const fetchPlayBoard = createAsyncThunk(
  "board/fetchPlayBoard",
  async () => {
    const collectData = collection(
      dbService,
      "play"
    ) as CollectionReference<BoardContents>;

    const orderData = query(collectData, orderBy("dateTime", "desc"));

    const querySnapshot = await getDocs(orderData);

    const playBoard = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      board: doc.data(),
    }));

    return playBoard;
  }
);

const initialBoardState: BoardListItems[] = [];

const boardSlice = createSlice({
  name: "playBoard",
  initialState: {
    boardArray: initialBoardState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayBoard.fulfilled, (state, action) => {
      state.boardArray = action.payload;
    });
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
