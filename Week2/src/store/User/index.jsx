import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
