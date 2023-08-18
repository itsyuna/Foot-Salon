import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import userReducer from "./user";
import playBoardReducer from "./playBoard";
import halfTimeBoardReducer from "./halfTimeBoard";
import statsReducer from "./stats";
import photosReducer from "./photos";

const store = configureStore({
  reducer: {
    user: userReducer,
    playBoard: playBoardReducer,
    halfTimeBoard: halfTimeBoardReducer,
    stats: statsReducer,
    photos: photosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
