import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CollectionReference,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "../firebase/config";

export interface StatContents {
  creatorId: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamResult: number;
  awayTeamResult: number;
  league: string;
  watchOption: string;
  matchDate: string;
  matchResult: number;
  contents: string;
  createdAt: string;
  dateTime: number;
  isStatEdit: boolean;
}

export interface StatListItems {
  id: string;
  stat: StatContents;
}

export const fetchStats = createAsyncThunk("stats/fetchStats", async () => {
  const collectData = collection(
    dbService,
    "stats"
  ) as CollectionReference<StatContents>;

  const orderData = query(collectData, orderBy("dateTime", "desc"));

  const querySnapshot = await getDocs(orderData);

  const statItems = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    stat: doc.data(),
  }));

  return statItems;
});

const initialStatState: StatListItems[] = [];

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    statsArray: initialStatState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.statsArray = action.payload;
    });
  },
});

export const boardActions = statsSlice.actions;

export default statsSlice.reducer;
