import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CollectionReference,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "../firebase/config";
import { BoardContents, BoardListItems } from "./playBoard";

export const fetchHalfTimeBoard = createAsyncThunk(
  "board/fetchHalfTimeBoard",
  async () => {
    const collectData = collection(
      dbService,
      "half-time"
    ) as CollectionReference<BoardContents>;

    const orderData = query(collectData, orderBy("dateTime", "desc"));

    const querySnapshot = await getDocs(orderData);

    const halfTimeBoard = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      board: doc.data(),
    }));

    return halfTimeBoard;
  }
);

const initialBoardState: BoardListItems[] = [];

const boardSlice = createSlice({
  name: "halfTimeBoard",
  initialState: {
    boardArray: initialBoardState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHalfTimeBoard.fulfilled, (state, action) => {
      state.boardArray = action.payload;
    });
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
