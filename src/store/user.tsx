import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  nickname: "",
  email: "",
  uid: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      state.nickname = action.payload.userNickname;
      state.email = action.payload.userEmail;
      state.uid = action.payload.userUid;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.nickname = "";
      state.email = "";
      state.uid = "";
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
