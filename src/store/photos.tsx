import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CollectionReference,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "../firebase/config";

export interface PhotoContents {
  creatorId: string;
  userNickname: string;
  createdAt: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  dateTime: number;
  fileURL: string;
}

export interface PhotoListItems {
  id: string;
  photo: PhotoContents;
}

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
  const collectData = collection(
    dbService,
    "photos"
  ) as CollectionReference<PhotoContents>;

  const orderData = query(collectData, orderBy("dateTime", "desc"));

  const querySnapshot = await getDocs(orderData);

  const photoItems = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    photo: doc.data(),
  }));

  return photoItems;
});

const initialStatState: PhotoListItems[] = [];

const photosSlice = createSlice({
  name: "photos",
  initialState: {
    photoArray: initialStatState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.photoArray = action.payload;
    });
  },
});

export const boardActions = photosSlice.actions;

export default photosSlice.reducer;
